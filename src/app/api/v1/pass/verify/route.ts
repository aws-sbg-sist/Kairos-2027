import { NextRequest, NextResponse } from 'next/server';
import { verifyPassToken, VerificationResult } from '@/lib/pass';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';
import { getCurrentAdminSession } from '@/lib/auth';
import { getCurrentStudentSession } from '@/lib/student_auth';
import { safeParseJson } from '@/lib/http';

function redactPublicVerification(result: VerificationResult, isPrivileged: boolean) {
  if (isPrivileged || !result.participant) {
    return result;
  }
  return {
    ...result,
    participant: {
      fullName: result.participant.fullName,
      institution: result.participant.institution,
      emailVerified: result.participant.emailVerified,
      role: result.participant.role,
    },
  };
}

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

  const result = await verifyPassToken(token);
  if (!result.valid) {
    return NextResponse.json(
      { success: false, valid: false, error: result.error || 'Invalid or unverified pass token.' },
      { status: 400 }
    );
  }

  const adminSession = await getCurrentAdminSession();
  const studentSession = await getCurrentStudentSession();
  const isOwner = Boolean(
    studentSession &&
    result.participant?.email &&
    studentSession.email.toLowerCase() === result.participant.email.toLowerCase()
  );

  return NextResponse.json({
    success: true,
    ...redactPublicVerification(result, Boolean(adminSession || isOwner))
  });
}

export async function POST(req: NextRequest) {
  const rateLimit = checkRateLimit(req, { limit: 60, windowMs: 60_000, identifier: 'pass_verify' });
  if (!rateLimit.allowed) {
    return createRateLimitResponse(rateLimit.resetAt, rateLimit.limit);
  }

  const parsed = await safeParseJson(req);
  if (!parsed.ok) return parsed.response;

  try {
    const body = parsed.data;
    const token = body.token || body.code || '';

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { success: false, valid: false, error: 'Verification token is required in request body.' },
        { status: 400 }
      );
    }

    const result = await verifyPassToken(token);
    if (!result.valid) {
      return NextResponse.json(
        { success: false, valid: false, error: result.error || 'Invalid or unverified pass token.' },
        { status: 400 }
      );
    }

    const adminSession = await getCurrentAdminSession();
    const studentSession = await getCurrentStudentSession();
    const isOwner = Boolean(
      studentSession &&
      result.participant?.email &&
      studentSession.email.toLowerCase() === result.participant.email.toLowerCase()
    );

    return NextResponse.json({
      success: true,
      ...redactPublicVerification(result, Boolean(adminSession || isOwner))
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, valid: false, error: 'Failed to process verification request.' },
      { status: 400 }
    );
  }
}
