import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';
import { safeParseJson } from '@/lib/http';

export async function POST(req: NextRequest) {
  const rateLimit = checkRateLimit(req, { limit: 10, windowMs: 60_000 });
  if (!rateLimit.allowed) {
    return createRateLimitResponse(rateLimit.resetAt, rateLimit.limit);
  }

  const parsed = await safeParseJson(req);
  if (!parsed.ok) return parsed.response;

  try {
    const { token, newPassword } = parsed.data;

    if (!token || !newPassword || typeof token !== 'string' || typeof newPassword !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Reset token and new password are required.' },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { success: false, error: 'New password must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    const result = await db.resetStudentPassword(token, newPassword);
    if (!result.success) {
      const isExpired = result.error === 'TOKEN_EXPIRED';
      return NextResponse.json(
        { 
          success: false, 
          error: isExpired ? 'This password reset link has expired. Please request a new link.' : 'Invalid or expired password reset token.',
          code: result.error
        },
        { status: isExpired ? 410 : 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your password has been successfully reset! You can now sign in with your new credentials.'
    });
  } catch (err: any) {
    console.error('[API Reset Password Error]:', err);
    return NextResponse.json(
      { success: false, error: 'Password reset service error.' },
      { status: 500 }
    );
  }
}
