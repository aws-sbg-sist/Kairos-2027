import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';
import { sendTransactionalEmail, buildEmailVerificationEmail } from '@/lib/email';
import { createStudentToken, STUDENT_COOKIE_NAME } from '@/lib/student_auth';
import { safeParseJson } from '@/lib/http';

export async function POST(req: NextRequest) {
  // Rate limit: 5 registration requests per minute per IP
  const rateLimit = checkRateLimit(req, { limit: 5, windowMs: 60_000 });
  if (!rateLimit.allowed) {
    return createRateLimitResponse(rateLimit.resetAt, rateLimit.limit);
  }

  const parsed = await safeParseJson(req);
  if (!parsed.ok) return parsed.response;

  try {
    const body = parsed.data;
    const { email, password, fullName, institution, phone, department, yearOfStudy, tshirtSize } = body;

    if (!email || !password || !fullName || typeof email !== 'string' || typeof password !== 'string' || typeof fullName !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Full name, email address, and a secure password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const result = await db.registerStudent({
      email,
      password,
      fullName,
      institution: institution || 'Sathyabama Institute of Science and Technology',
      phone,
      department,
      yearOfStudy,
      tshirtSize
    });

    if (!result.success || !result.account) {
      if (result.error === 'EMAIL_ALREADY_REGISTERED') {
        return NextResponse.json(
          { 
            success: false, 
            error: 'An account with this email address already exists. Please sign in or use password recovery.',
            code: 'EMAIL_ALREADY_REGISTERED'
          },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to create student account.' },
        { status: 500 }
      );
    }

    // Attempt to send verification email (truthful local simulation or live AWS SES)
    const appOrigin = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
    const verificationUrl = `${appOrigin}/auth/verify?token=${encodeURIComponent(result.verificationToken || '')}`;
    try {
      sendTransactionalEmail(buildEmailVerificationEmail({
        to: email.trim().toLowerCase(),
        fullName,
        verificationUrl
      })).catch(emailErr => console.warn('[Register Email Warning]:', emailErr));
    } catch (emailErr) {
      console.warn('[Register Email Warning]:', emailErr);
    }

    const exposeDevTokens =
      process.env.NODE_ENV === 'test' ||
      (process.env.NODE_ENV !== 'production' && process.env.KAIROS_EXPOSE_DEV_TOKENS === 'true');

    const account = result.account;
    const sessionToken = createStudentToken({
      studentId: account.id,
      email: account.email,
      fullName: account.fullName,
      institution: account.institution,
      emailVerified: account.emailVerified
    });

    const response = NextResponse.json({
      success: true,
      message: 'Account successfully created! Please check your email to verify your identity.',
      ...(exposeDevTokens ? { verificationToken: result.verificationToken } : {}),
      student: {
        id: account.id,
        email: account.email,
        fullName: account.fullName,
        institution: account.institution,
        emailVerified: account.emailVerified
      }
    }, { status: 201 });

    response.cookies.set({
      name: STUDENT_COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60
    });

    return response;
  } catch (err: any) {
    console.error('[API Register Error]:', err);
    return NextResponse.json(
      { success: false, error: 'Registration service encountered an error. Please try again.' },
      { status: 500 }
    );
  }
}
