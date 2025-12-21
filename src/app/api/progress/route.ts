import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

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
