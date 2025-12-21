import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// Lazy load key to prevent build failures when env var is missing
function getSecretKey() {
    const SECRET_KEY = process.env.SESSION_SECRET;
    if (!SECRET_KEY) {
        throw new Error('SESSION_SECRET environment variable is not defined');
    }
    return new TextEncoder().encode(SECRET_KEY);
}

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(getSecretKey());
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, getSecretKey(), {
        algorithms: ['HS256'],
    });
    return payload;
}

export async function login(password: string) {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
        console.error('ADMIN_PASSWORD environment variable is not defined');
        return false;
    }

    // Enforce strong password policy
    const hasUpperCase = /[A-Z]/.test(adminPassword);
    const hasLowerCase = /[a-z]/.test(adminPassword);
    const hasNumbers = /\d/.test(adminPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(adminPassword);

    if (adminPassword.length < 12 || !hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
        throw new Error('FATAL: ADMIN_PASSWORD is too weak. Must be 12+ chars and include uppercase, lowercase, number, and special character.');
    }

    if (password !== adminPassword) {
        return false;
    }

    // Create the session
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    const session = await encrypt({ user: 'admin', expires });

    // Save the session in a cookie
    (await cookies()).set('session', session, { expires, httpOnly: true, secure: true, sameSite: 'strict', path: '/' });

    return true;
}

export async function logout() {
    (await cookies()).set('session', '', { expires: new Date(0), path: '/' });
}

export async function getSession() {
    const session = (await cookies()).get('session')?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get('session')?.value;
    if (!session) return;

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Regenerate session payload to prevent fixation if needed (though encrypt() generates new signature)
    // We keep the same user data but re-sign with new exp
    const newSession = await encrypt({ ...parsed, user: parsed.user, expires: parsed.expires });
    const res = NextResponse.next();
    res.cookies.set({
        name: 'session',
        value: newSession,
        httpOnly: true,
        expires: parsed.expires,
    });
    return res;
}

// Guest Session Logic for IDOR Prevention
// Uses a separate cookie 'guest_session' to track anonymous users securely

export async function getGuestSession() {
    const session = (await cookies()).get('guest_session')?.value;
    if (!session) return null;
    try {
        const payload = await decrypt(session);
        return payload;
    } catch (e) {
        return null;
    }
}

export async function createGuestSession(response: NextResponse) {
    const userId = crypto.randomUUID();
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year for guest tracking

    // We reuse the same encryption key/alg as admin for simplicity, 
    // but store in a different cookie so they don't collision.
    // In a larger app, might want distinct keys.
    const token = await encrypt({ userId, isGuest: true, expires });

    response.cookies.set({
        name: 'guest_session',
        value: token,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        expires
    });

    return userId;
}
