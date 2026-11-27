import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'kairos_admin_session';

function getEdgeSecret(): string | null {
  const secret = process.env.ADMIN_MASTER_SECRET?.trim() || process.env.SESSION_SECRET?.trim();
  if (secret) return secret;
  if (process.env.NODE_ENV === 'production') return null;
  return 'kairos-local-dev-admin-secret-do-not-use-in-prod';
}

function timingSafeHexEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

async function verifyAdminEdgeToken(token: string): Promise<boolean> {
  try {
    const secret = getEdgeSecret();
    if (!secret || !token) return false;

    const bytes = Uint8Array.from(atob(token), (c) => c.charCodeAt(0));
    const raw = new TextDecoder().decode(bytes);
    const sep = raw.lastIndexOf('::');
    if (sep <= 0) return false;

    const payload = raw.slice(0, sep);
    const signature = raw.slice(sep + 2);
    if (!payload || !signature || signature.length !== 64) return false;

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const macBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
    const expectedHex = Array.from(new Uint8Array(macBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    if (!timingSafeHexEqual(signature, expectedHex)) {
      return false;
    }

    const data = JSON.parse(payload);
    if (!data.organizerName || !data.authenticatedAt) return false;

    if (Date.now() - data.authenticatedAt > 7 * 24 * 60 * 60 * 1000) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin/login' || pathname === '/api/admin/auth') {
    if (pathname === '/admin/login') {
      const existingToken = request.cookies.get(COOKIE_NAME)?.value;
      if (existingToken && (await verifyAdminEdgeToken(existingToken))) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token || !(await verifyAdminEdgeToken(token))) {
    if (pathname.startsWith('/api/admin')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized: Cadre access required. Please authenticate at /admin/login.'
        },
        { status: 401 }
      );
    }

    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
    '/api/admin/:path*'
  ],
};
