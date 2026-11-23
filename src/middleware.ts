import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'kairos_admin_session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow public admin endpoints
  if (pathname === '/admin/login' || pathname === '/api/admin/auth') {
    // If user is already authenticated and visits /admin/login, redirect to /admin
    if (pathname === '/admin/login') {
      const existingToken = request.cookies.get(COOKIE_NAME)?.value;
      if (existingToken && isValidSessionFormat(existingToken)) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
    return NextResponse.next();
  }

  // 2. Intercept protected admin web pages and API routes
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token || !isValidSessionFormat(token)) {
    // API routes return 401 JSON
    if (pathname.startsWith('/api/admin')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Unauthorized: Cadre access required. Please authenticate at /admin/login.' 
        },
        { status: 401 }
      );
    }

    // Web routes redirect immediately to /admin/login
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Token is present and structurally valid; allow request to proceed to server handler
  return NextResponse.next();
}

function isValidSessionFormat(token: string): boolean {
  try {
    const raw = atob(token);
    const sep = raw.lastIndexOf('::');
    if (sep <= 0) return false;
    const payload = raw.slice(0, sep);
    const signature = raw.slice(sep + 2);
    if (!payload || !signature || signature.length !== 64) return false;

    const data = JSON.parse(payload);
    if (!data.organizerName || !data.authenticatedAt) return false;

    // Check expiration (7 days)
    if (Date.now() - data.authenticatedAt > 7 * 24 * 60 * 60 * 1000) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
    '/api/admin/:path*'
  ],
};
