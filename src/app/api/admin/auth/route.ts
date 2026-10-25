import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPasskey, createAdminToken, COOKIE_NAME } from '@/lib/auth';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { passkey, organizerName, organizerRole } = await req.json();

    if (!passkey || !organizerName) {
      return NextResponse.json(
        { success: false, error: 'Passkey and organizer identity selection are required.' },
        { status: 400 }
      );
    }

    const isValid = verifyAdminPasskey(passkey);
    if (!isValid) {
      db.addAuditLog('Failed Login Attempt', 'AUTH_FAILURE', `Invalid passkey attempted for identity [${organizerName}]`);
      return NextResponse.json(
        { success: false, error: 'Invalid organizer authorization passkey.' },
        { status: 401 }
      );
    }

    const token = createAdminToken(organizerName, organizerRole || 'Organizer Lead');
    
    // Record successful audit login
    db.addAuditLog(organizerName, 'ADMIN_LOGIN', `Logged in successfully as ${organizerRole || 'Lead'}`);

    const response = NextResponse.json({
      success: true,
      message: `Welcome, ${organizerName}. Admin access granted.`,
      organizer: { name: organizerName, role: organizerRole }
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
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAME);
  return NextResponse.json({ success: true, message: 'Logged out successfully' });
}
