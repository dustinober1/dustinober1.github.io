import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

    // Clone the request headers and set the nonce (if needed for CSP in future)
    // For now we just return response with headers
    const response = NextResponse.next();

    // Security Headers
    const headers = response.headers;

    headers.set('X-Frame-Options', 'DENY');
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Strict Transport Security (HSTS)
    if (process.env.NODE_ENV === 'production') {
        headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    }

    // Content Security Policy
    // We start with a basic policy. Adjust 'script-src' and other directives as needed based on your app's requirements (e.g., GA, Analytics).
    // Using 'unsafe-inline' and 'unsafe-eval' might be needed for some Next.js dev features or if strictly needed, but best to avoid.
    // For now a reasonable default:
    const cspHeader = `
        default-src 'self';
        script-src 'self' https://www.google-analytics.com https://www.googletagmanager.com 'nonce-${nonce}'; 
        style-src 'self' 'nonce-${nonce}';
        img-src 'self' blob: data: https://www.google-analytics.com;
        font-src 'self';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        block-all-mixed-content;
        upgrade-insecure-requests;
    `;

    // Remove newlines and extra spaces
    const contentSecurityPolicyHeaderValue = cspHeader
        .replace(/\s{2,}/g, ' ')
        .trim();

    headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);
    // Also set the nonce header so it can be read by the app if needed (though usually passed via ctx)
    headers.set('x-nonce', nonce);

    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/api/:path*'],
};
