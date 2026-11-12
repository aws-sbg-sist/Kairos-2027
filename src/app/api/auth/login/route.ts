import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createStudentToken, STUDENT_COOKIE_NAME } from '@/lib/student_auth';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';

export async function POST(req: NextRequest) {
  // Rate limit: 10 login attempts per minute per IP to prevent brute-forcing
  const rateLimit = checkRateLimit(req, { limit: 10, windowMs: 60_000 });
  if (!rateLimit.allowed) {
    return createRateLimitResponse(rateLimit.resetAt, rateLimit.limit);
  }

  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const authResult = db.authenticateStudent(email, password);
    if (!authResult.success || !authResult.account) {
      db.addAuditLog('Anonymous Caller', 'STUDENT_AUTH_FAILURE', `Failed login attempt for [${email.trim().toLowerCase()}]`);
      return NextResponse.json(
        { success: false, error: 'Invalid email address or password.', code: 'INVALID_CREDENTIALS' },
        { status: 401 }
      );
    }

    const account = authResult.account;
    const sessionToken = createStudentToken({
      studentId: account.id,
      email: account.email,
      fullName: account.fullName,
      institution: account.institution,
      emailVerified: account.emailVerified
    });

    db.addAuditLog(account.fullName, 'STUDENT_LOGIN', `Student logged in successfully [${account.email}]`);

    const response = NextResponse.json({
      success: true,
      message: `Welcome back, ${account.fullName}!`,
      student: {
        id: account.id,
        email: account.email,
        fullName: account.fullName,
        institution: account.institution,
        emailVerified: account.emailVerified
      }
    });

    // Set secure, HttpOnly session cookie (zero localStorage storage)
    response.cookies.set({
      name: STUDENT_COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return response;
  } catch (err: any) {
    console.error('[API Student Login Error]:', err);
    return NextResponse.json(
      { success: false, error: 'Authentication service error. Please try again.' },
      { status: 500 }
    );
  }
}
