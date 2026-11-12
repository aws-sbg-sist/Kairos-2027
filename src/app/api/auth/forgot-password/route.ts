import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';
import { sendTransactionalEmail, buildPasswordResetEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  // Rate limit: 5 requests per minute per IP
  const rateLimit = checkRateLimit(req, { limit: 5, windowMs: 60_000 });
  if (!rateLimit.allowed) {
    return createRateLimitResponse(rateLimit.resetAt, rateLimit.limit);
  }

  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email address is required.' },
        { status: 400 }
      );
    }

    const result = db.requestPasswordReset(email);

    if (result.resetToken) {
      const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8000'}/auth/reset-password?token=${result.resetToken}`;
      try {
        sendTransactionalEmail(buildPasswordResetEmail({
          to: email.trim().toLowerCase(),
          fullName: 'Student Builder',
          resetUrl
        })).catch(emailErr => console.warn('[Forgot Password Email Warning]:', emailErr));
      } catch (emailErr) {
        console.warn('[Forgot Password Email Warning]:', emailErr);
      }
    }

    // Always return generic success to prevent email enumeration
    return NextResponse.json({
      success: true,
      message: 'If an account exists with that email address, password reset instructions have been sent.',
      resetToken: result.resetToken // Provided for local testing and dev verification
    });
  } catch (err: any) {
    console.error('[API Forgot Password Error]:', err);
    return NextResponse.json(
      { success: false, error: 'Password recovery service encountered an error.' },
      { status: 500 }
    );
  }
}
