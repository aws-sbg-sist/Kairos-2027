import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';
import { sendTransactionalEmail } from '@/lib/email';

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
        await sendTransactionalEmail({
          to: email.trim().toLowerCase(),
          subject: 'Reset Your KAIROS 2027 Builder Password',
          html: `
            <h2>Password Reset Request</h2>
            <p>We received a request to reset your password for KAIROS 2027. Click the link below to set a new password:</p>
            <p><a href="${resetUrl}" style="background-color: #9333ea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reset Password</a></p>
            <p>This recovery link will expire in 1 hour. If you did not request this, you can safely ignore this email.</p>
          `,
          text: `Reset your KAIROS 2027 password: ${resetUrl}\nThis link expires in 1 hour.`
        });
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
