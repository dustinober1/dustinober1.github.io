import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getGuestSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
    // IDOR FIX: Ignore client-provided userId. Use secure session.
    const session = await getGuestSession();

    if (!session || !session.userId) {
        // No session means no data to show
        return NextResponse.json({ progress: [] });
    }

    const userId = session.userId;

    try {
        const queryText = `
      SELECT ep.* 
      FROM ebook_progress ep
      JOIN users u ON ep.user_id = u.id
      WHERE u.anonymous_id = $1
      ORDER BY ep.last_read DESC
    `;

        const result = await query(queryText, [userId]);

        return NextResponse.json({ progress: result.rows });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
