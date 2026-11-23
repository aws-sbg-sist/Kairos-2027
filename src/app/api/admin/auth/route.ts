import { NextRequest, NextResponse } from 'next/server';
import { createAdminToken, COOKIE_NAME } from '@/lib/auth';
import { verifyLeadAuthentication } from '@/lib/rbac';
import { db } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  // Rate limit: 8 attempts per minute per IP to defend against brute force
  const rateLimitResult = checkRateLimit(req, { limit: 8, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  try {
    const body = await req.json();
    const { passkey, organizerName } = body;

    if (!passkey || !organizerName) {
      return NextResponse.json(
        { success: false, error: 'Please select your organizer identity and enter your authorized passkey.' },
        { status: 400 }
      );
    }

    // RBAC Lead Authentication: verifies lead-specific passkey or emergency master key
    const authResult = verifyLeadAuthentication(organizerName, passkey);
    if (!authResult.success || !authResult.lead) {
      // Record failed login attempt for security monitoring
      try {
        await db.addAuditLog('SECURITY_FIREWALL', 'AUTH_FAILURE', `Invalid passkey attempted for cadre identity [${organizerName}]`);
      } catch {
        // Non-blocking
      }

      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid passkey for the selected lead identity. Please enter your designated cadre passkey.' 
        },
        { status: 401 }
      );
    }

    const { lead, isSuperadmin } = authResult;

    // Generate cryptographically signed HMAC token embedding RBAC permissions
    const token = createAdminToken(lead.name, lead.role, {
      leadId: lead.id,
      pipelineName: lead.pipelineName,
      allowedTabs: lead.allowedTabs,
      isSuperadmin
    });

    // Audit log successful authentication (non-blocking)
    try {
      await db.addAuditLog(lead.name, 'ADMIN_LOGIN', `Authenticated into ${lead.pipelineName} (${lead.role})`);
    } catch (auditErr) {
      console.warn('[Admin Auth Audit Log Warning]:', auditErr);
    }

    const response = NextResponse.json({
      success: true,
      message: `Welcome, ${lead.name}. ${lead.pipelineName} unlocked.`,
      organizer: { 
        name: lead.name, 
        role: lead.role,
        leadId: lead.id,
        department: lead.department,
        pipelineName: lead.pipelineName,
        allowedTabs: lead.allowedTabs,
        isSuperadmin
      }
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
    return NextResponse.json(
      { success: false, error: 'Authentication service temporarily unavailable. Please retry.' }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const { verifyAdminToken } = await import('@/lib/auth');
  const session = verifyAdminToken(token);
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    organizer: {
      name: session.organizerName,
      role: session.organizerRole,
      leadId: session.leadId,
      pipelineName: session.pipelineName,
      allowedTabs: session.allowedTabs,
      isSuperadmin: session.isSuperadmin
    }
  });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  return NextResponse.json({ success: true, message: 'Organizer signed out successfully.' });
}
