import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required.' },
                { status: 400 }
            );
        }

        const queryText = `
      INSERT INTO contact_messages (name, email, subject, message)
      VALUES ($1, $2, $3, $4)
      RETURNING id, created_at
    `;

        const result = await query(queryText, [name, email, subject || null, message]);

        return NextResponse.json({
            success: true,
            message: 'Message sent successfully',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
