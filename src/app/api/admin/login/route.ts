import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
    try {
        const ip = request.headers.get('x-forwarded-for') || 'unknown';

        // 5 attempts per 15 minutes
        if (!rateLimit(ip, 5, 15 * 60 * 1000)) {
            return NextResponse.json({ error: 'Too many login attempts. Please try again later.' }, { status: 429 });
        }

        const body = await request.json();
        const { password } = body;

        if (!password) {
            return NextResponse.json({ error: 'Password required' }, { status: 400 });
        }

        const success = await login(password);

        if (!success) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
