import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
    // Rate Limit: 5 requests per hour (3600000 ms)
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const isAllowed = await rateLimit(ip, 5, 3600000); // 5 per hour

    if (!isAllowed) {
        return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Basic validation
        // Input Validation
        if (!name || typeof name !== 'string' || name.length < 2 || name.length > 100) {
            return NextResponse.json({ error: 'Invalid name provided.' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
        }

        if (!message || typeof message !== 'string' || message.length < 10 || message.length > 5000) {
            return NextResponse.json({ error: 'Message must be between 10 and 5000 characters.' }, { status: 400 });
        }

        // Subject is optional but validate if present
        if (subject && (typeof subject !== 'string' || subject.length > 200)) {
            return NextResponse.json({ error: 'Subject is too long.' }, { status: 400 });
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
    } catch (error: any) {
        console.error('Contact API Error:', error);

        const message = process.env.NODE_ENV === 'production'
            ? 'Internal Server Error'
            : error.message;

        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}
