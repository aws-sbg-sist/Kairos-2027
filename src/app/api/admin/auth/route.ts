import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPasskey, createAdminToken, isAdminAuthConfigured, COOKIE_NAME } from '@/lib/auth';
import { db } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';
import { cookies } from 'next/headers';
import { ORGANIZING_ROSTER } from '@/lib/config';

export async function POST(req: NextRequest) {
  // Rate limit: 5 attempts per minute per IP to defend against brute force
  const rateLimitResult = checkRateLimit(req, { limit: 5, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  try {
    const { passkey, organizerName } = await req.json();

    if (!passkey || !organizerName) {
      return NextResponse.json(
        { success: false, error: 'Passkey and organizer identity selection are required.' },
        { status: 400 }
      );
    }

    if (!isAdminAuthConfigured()) {
      return NextResponse.json(
        { success: false, error: 'Organizer authentication is not configured on this server (missing ADMIN_MASTER_SECRET).' },
        { status: 503 }
      );
    }

    const isValid = verifyAdminPasskey(passkey);
    if (!isValid) {
      await db.addAuditLog('Failed Login Attempt', 'AUTH_FAILURE', `Invalid passkey attempted for identity [${organizerName}]`);
      return NextResponse.json(
        { success: false, error: 'Invalid organizer authorization passkey.' },
        { status: 401 }
      );
    }

    // RBAC: Server-enforced role resolution from official roster (Never trust client-supplied role)
    const rosterEntry = ORGANIZING_ROSTER.find(
      o => o.name.toLowerCase() === organizerName.trim().toLowerCase()
    );
    const assignedRole = rosterEntry ? rosterEntry.role : (
      organizerName.toLowerCase().includes('thenappan') ? 'President & SBGL' : 'Organizer Lead'
    );

    const token = createAdminToken(organizerName.trim(), assignedRole);
    
    // Record successful audit login
    await db.addAuditLog(organizerName.trim(), 'ADMIN_LOGIN', `Logged in successfully as ${assignedRole}`);

    const response = NextResponse.json({
      success: true,
      message: `Welcome, ${organizerName}. Admin access granted.`,
      organizer: { name: organizerName.trim(), role: assignedRole }
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return response;
  } catch (err: any) {
    console.error('[API Admin Auth Error]:', err);
    return NextResponse.json({ success: false, error: 'Authentication service error' }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  return NextResponse.json({ success: true, message: 'Logged out successfully' });
}
