import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ ebookId: string }> }
) {
    const { ebookId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId'); // In a real app, get from session/auth

    if (!userId) {
        return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

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
    const { userId, chapterId, scrollPosition, timeSpent, isCompleted, bookmarks, notes } = body;

    if (!userId) {
        return NextResponse.json({ error: 'User ID required' }, { status: 400 });
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
        // Using ON CONFLICT to handle updates
        const queryText = `
      INSERT INTO ebook_progress 
        (user_id, ebook_id, chapter_id, scroll_position, time_spent, is_completed, bookmarks, notes, updated_at)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
      ON CONFLICT (user_id, ebook_id) 
      DO UPDATE SET
        chapter_id = EXCLUDED.chapter_id,
        scroll_position = EXCLUDED.scroll_position,
        time_spent = ebook_progress.time_spent + EXCLUDED.time_spent, -- Accumulate time
        is_completed = EXCLUDED.is_completed OR ebook_progress.is_completed, -- Once completed, stays completed
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

        return NextResponse.json({ success: true, progress: result.rows[0] });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Handle CORS for preflight requests if called from external ebook sites
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}
