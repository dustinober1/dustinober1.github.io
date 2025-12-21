import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getGuestSession, createGuestSession } from '@/lib/auth';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ ebookId: string }> }
) {
    const { ebookId } = await params;

    if (ebookId.length > 50 || !/^[a-zA-Z0-9_-]+$/.test(ebookId)) {
        return NextResponse.json({ error: 'Invalid ebook ID' }, { status: 400 });
    }

    // IDOR FIX: Ignore client-provided userId. Use secure session.
    const session = await getGuestSession();

    if (!session || !session.userId) {
        // No session means no progress tracked yet for this user.
        return NextResponse.json({ progress: null });
    }

    const userId = session.userId;

    try {
        // First retrieve internal user ID from anonymous ID
        const userResult = await query('SELECT id FROM users WHERE anonymous_id = $1', [userId]);

        if (userResult.rows.length === 0) {
            return NextResponse.json({ progress: null });
        }

        const internalUserId = userResult.rows[0].id;

        const result = await query(
            'SELECT * FROM ebook_progress WHERE user_id = $1 AND ebook_id = $2',
            [internalUserId, ebookId]
        );

        if (result.rows.length === 0) {
            return NextResponse.json({ progress: null });
        }

        return NextResponse.json({ progress: result.rows[0] });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ ebookId: string }> }
) {
    const { ebookId } = await params;
    const body = await request.json();
    const { chapterId, scrollPosition, timeSpent, isCompleted, bookmarks, notes } = body;

    // IDOR FIX: Manage session.
    let session = await getGuestSession();
    let userId: string;
    let isNewSession = false;

    // Create response object early to set cookie if needed
    let response = new NextResponse();

    if (!session || !session.userId) {
        // Create new guest session
        response = NextResponse.json({ success: true, isNewSession: true }); // Will attach data later
        userId = await createGuestSession(response);
        isNewSession = true;
    } else {
        userId = session.userId;
    }

    // Input Validation
    if (chapterId && (typeof chapterId !== 'string' || chapterId.length > 100)) {
        return NextResponse.json({ error: 'Invalid chapter ID' }, { status: 400 });
    }
    if (typeof scrollPosition !== 'number' || scrollPosition < 0) {
        return NextResponse.json({ error: 'Invalid scroll position' }, { status: 400 });
    }
    if (typeof timeSpent !== 'number' || timeSpent < 0) {
        return NextResponse.json({ error: 'Invalid time spent' }, { status: 400 });
    }
    if (bookmarks && !Array.isArray(bookmarks)) {
        return NextResponse.json({ error: 'Invalid bookmarks format' }, { status: 400 });
    }
    if (notes && !Array.isArray(notes)) {
        return NextResponse.json({ error: 'Invalid notes format' }, { status: 400 });
    }

    try {
        // 1. Ensure user exists
        let internalUserId;
        const userResult = await query('SELECT id FROM users WHERE anonymous_id = $1', [userId]);

        if (userResult.rows.length === 0) {
            const newUser = await query(
                'INSERT INTO users (anonymous_id) VALUES ($1) RETURNING id',
                [userId]
            );
            internalUserId = newUser.rows[0].id;
        } else {
            internalUserId = userResult.rows[0].id;
        }

        // 2. Upsert progress
        const queryText = `
      INSERT INTO ebook_progress 
        (user_id, ebook_id, chapter_id, scroll_position, time_spent, is_completed, bookmarks, notes, updated_at)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
      ON CONFLICT (user_id, ebook_id) 
      DO UPDATE SET
        chapter_id = EXCLUDED.chapter_id,
        scroll_position = EXCLUDED.scroll_position,
        time_spent = ebook_progress.time_spent + EXCLUDED.time_spent,
        is_completed = EXCLUDED.is_completed OR ebook_progress.is_completed,
        bookmarks = EXCLUDED.bookmarks,
        notes = EXCLUDED.notes,
        last_read = NOW(),
        updated_at = NOW()
      RETURNING *;
    `;

        const result = await query(queryText, [
            internalUserId,
            ebookId,
            chapterId,
            scrollPosition,
            timeSpent,
            isCompleted || false,
            JSON.stringify(bookmarks || []),
            JSON.stringify(notes || []),
        ]);

        // If we created a session, we need to return the JSON body AND the set-cookie header
        // response object was created earlier
        const responseBody = { success: true, progress: result.rows[0], userId: isNewSession ? userId : undefined };

        // If it was a new session, response already has the cookie set on it. We just need to write the body.
        // But NextResponse.json creates a NEW response. We need to merge them.

        if (isNewSession) {
            // Re-create response with body and headers from previous response (which has cookie)
            // Actually simplest is just to set cookie on the new JSON response
            const finalResponse = NextResponse.json(responseBody);
            response.cookies.getAll().forEach(cookie => {
                finalResponse.cookies.set(cookie);
            });
            return finalResponse;
        } else {
            return NextResponse.json(responseBody);
        }

    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Handle CORS for preflight requests if called from external ebook sites
export async function OPTIONS(request: NextRequest) {
    const allowedOrigin = process.env.ALLOWED_ORIGIN || '';
    const allowedOrigins = allowedOrigin.split(',').map(o => o.trim());
    const origin = request.headers.get('origin') || '';

    // Check if origin is allowed
    const isAllowed = allowedOrigins.includes(origin);

    if (!isAllowed && origin) {
        return new NextResponse(null, { status: 403 });
    }

    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': isAllowed ? origin : allowedOrigins[0] || '',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true', // Needed for cookies
            'Vary': 'Origin',
        },
    });
}
