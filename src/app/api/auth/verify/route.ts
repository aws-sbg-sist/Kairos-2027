import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createStudentToken, getCurrentStudentSession, STUDENT_COOKIE_NAME } from '@/lib/student_auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Verification token is required.' },
        { status: 400 }
      );
    }

    const result = await db.verifyStudentEmail(token);
    if (!result.success || !result.account) {
      const isExpired = result.error === 'TOKEN_EXPIRED';
      return NextResponse.json(
        { 
          success: false, 
          error: isExpired ? 'This verification link has expired. Please request a new verification link.' : 'Invalid or malformed verification token.',
          code: result.error 
        },
        { status: isExpired ? 410 : 400 }
      );
    }

    const account = result.account;
    const response = NextResponse.json({
      success: true,
      message: 'Your builder email has been verified! Your pass is now active.',
      student: {
        id: account.id,
        email: account.email,
        fullName: account.fullName,
        institution: account.institution,
        emailVerified: true
      }
    });

    // If currently logged in, refresh session cookie with verified status
    const currentSession = await getCurrentStudentSession();
    if (currentSession && currentSession.email === account.email) {
      const refreshedToken = createStudentToken({
        studentId: account.id,
        email: account.email,
        fullName: account.fullName,
        institution: account.institution,
        emailVerified: true
      });
      response.cookies.set({
        name: STUDENT_COOKIE_NAME,
        value: refreshedToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60
      });
    }

    return response;
  } catch (err: any) {
    console.error('[API Verify Email Error]:', err);
    return NextResponse.json(
      { success: false, error: 'Email verification service error.' },
      { status: 500 }
    );
  }
}
