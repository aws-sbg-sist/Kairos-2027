import { NextRequest, NextResponse } from 'next/server';
import { verifyPassToken } from '@/lib/pass';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';

export async function GET(req: NextRequest) {
  const rateLimit = checkRateLimit(req, { limit: 60, windowMs: 60_000, identifier: 'pass_verify' });
  if (!rateLimit.allowed) {
    return createRateLimitResponse(rateLimit.resetAt, rateLimit.limit);
  }

  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token') || searchParams.get('code') || '';

  if (!token) {
    return NextResponse.json(
      { success: false, valid: false, error: 'Verification token is required as query parameter (?token=...)' },
      { status: 400 }
    );
  }

  const result = verifyPassToken(token);
  if (!result.valid) {
    return NextResponse.json(
      { success: false, valid: false, error: result.error || 'Invalid or unverified pass token.' },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    ...result
  });
}

export async function POST(req: NextRequest) {
  const rateLimit = checkRateLimit(req, { limit: 60, windowMs: 60_000, identifier: 'pass_verify' });
  if (!rateLimit.allowed) {
    return createRateLimitResponse(rateLimit.resetAt, rateLimit.limit);
  }

  try {
    const body = await req.json();
    const token = body.token || body.code || '';

    if (!token) {
      return NextResponse.json(
        { success: false, valid: false, error: 'Verification token is required in request body.' },
        { status: 400 }
      );
    }

    const result = verifyPassToken(token);
    if (!result.valid) {
      return NextResponse.json(
        { success: false, valid: false, error: result.error || 'Invalid or unverified pass token.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      ...result
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, valid: false, error: 'Failed to process verification request.' },
      { status: 400 }
    );
  }
}
