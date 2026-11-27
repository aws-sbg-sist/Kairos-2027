import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';
import { sendTransactionalEmail, buildPasswordResetEmail } from '@/lib/email';
import { safeParseJson } from '@/lib/http';

export async function POST(req: NextRequest) {
  // Rate limit: 5 requests per minute per IP
  const rateLimit = checkRateLimit(req, { limit: 5, windowMs: 60_000 });
  if (!rateLimit.allowed) {
    return createRateLimitResponse(rateLimit.resetAt, rateLimit.limit);
  }

  const parsed = await safeParseJson(req);
  if (!parsed.ok) return parsed.response;

  try {
    const { email } = parsed.data;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email address is required.' },
        { status: 400 }
      );
    }

    const result = await db.requestPasswordReset(email);

    if (result.resetToken) {
      const appOrigin = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
      const resetUrl = `${appOrigin}/auth/reset-password?token=${encodeURIComponent(result.resetToken)}`;
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

    const exposeDevTokens =
      process.env.NODE_ENV === 'test' ||
      (process.env.NODE_ENV !== 'production' && process.env.KAIROS_EXPOSE_DEV_TOKENS === 'true');

    // Always return generic success to prevent email enumeration
    return NextResponse.json({
      success: true,
      message: 'If an account exists with that email address, password reset instructions have been sent.',
      ...(exposeDevTokens && result.resetToken ? { resetToken: result.resetToken } : {})
    });
  } catch (err: any) {
    console.error('[API Forgot Password Error]:', err);
    return NextResponse.json(
      { success: false, error: 'Password recovery service encountered an error.' },
      { status: 500 }
    );
  }
}
