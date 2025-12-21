import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getGuestSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
    // IDOR FIX: Ignore client-provided userId. Use secure session.
    const session = await getGuestSession();

    if (!session || !session.userId) {
        // No session means empty stats
        return NextResponse.json({
            stats: {
                totalBooksStarted: 0,
                booksCompleted: 0,
                totalTimeRead: 0,
                streakDays: 0
            }
        });
    }

    const userId = session.userId;

    try {
        // Get basic stats
        const statsQuery = `
      SELECT 
        COUNT(*) as total_books_started,
        SUM(CASE WHEN is_completed THEN 1 ELSE 0 END) as books_completed,
        SUM(time_spent) as total_seconds_read
      FROM ebook_progress ep
      JOIN users u ON ep.user_id = u.id
      WHERE u.anonymous_id = $1
    `;

        const userResult = await query('SELECT id FROM users WHERE anonymous_id = $1', [userId]);

        if (userResult.rows.length === 0) {
            return NextResponse.json({
                stats: {
                    totalBooksStarted: 0,
                    booksCompleted: 0,
                    totalTimeRead: 0,
                    streakDays: 0
                }
            });
        }

        const statsResult = await query(statsQuery, [userId]);
        const stats = statsResult.rows[0];

        // Calculate streak (simplified: consecutive days with any activity)
        // In a real app, we'd probably track daily activity in a separate table or aggregate efficiently
        // checking "last_read" isn't enough for valid streak calculation if they skip days.
        // For now, let's just return 0 or placeholder logic or maybe check recent activity.
        // Let's defer complex streak logic to Phase 4.

        return NextResponse.json({
            stats: {
                totalBooksStarted: parseInt(stats.total_books_started) || 0,
                booksCompleted: parseInt(stats.books_completed) || 0,
                totalTimeRead: parseInt(stats.total_seconds_read) || 0,
                streakDays: 0 // To be implemented
            }
        });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
