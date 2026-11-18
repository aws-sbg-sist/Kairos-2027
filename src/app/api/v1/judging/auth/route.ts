import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';
import { createJudgeToken, getJudgeSessionFromRequest, JUDGE_COOKIE_NAME } from '@/lib/judge_auth';

export async function POST(req: NextRequest) {
  // Rate limiting to prevent brute force on judge PINs
  const rateLimitResult = checkRateLimit(req, { limit: 15, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  try {
    const body = await req.json();
    const { accessPin } = body;

    if (!accessPin || typeof accessPin !== 'string' || !/^\d{6}$/.test(accessPin.trim())) {
      return NextResponse.json({
        success: false,
        error: 'Please enter a valid 6-digit jury access PIN.'
      }, { status: 400 });
    }

    const cleanPin = accessPin.trim();
    const judge = await db.verifyJudgePin(cleanPin);

    if (!judge) {
      const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown-client';
      await db.addAuditLog('Anonymous Jury Gateway', 'JUDGE_AUTH_FAILURE', `Failed judge PIN authentication attempt from IP [${clientIp}]`);
      return NextResponse.json({
        success: false,
        error: 'Invalid 6-digit Jury Access PIN. Please verify with Hackathon Operations.'
      }, { status: 401 });
    }

    const token = createJudgeToken(judge);
    const assignedTeams = await db.getAssignedTeamsForJudge(judge.id);

    // Audit log
    await db.addAuditLog(
      judge.fullName,
      'JUDGE_LOGIN',
      `Judge ${judge.fullName} (${judge.organization}) authenticated for track [${judge.trackSpecialization || 'ALL'}]`
    );

    const response = NextResponse.json({
      success: true,
      message: 'Judge authenticated successfully.',
      judge: {
        id: judge.id,
        fullName: judge.fullName,
        organization: judge.organization,
        designation: judge.designation,
        trackSpecialization: judge.trackSpecialization,
        assignedHall: judge.assignedHall,
        isActive: judge.isActive
      },
      token,
      assignedTeams
    });

    response.cookies.set(JUDGE_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return response;
  } catch (err: any) {
    console.error('[API Judge Auth POST Error]:', err);
    return NextResponse.json({ success: false, error: 'Internal server error authenticating judge.' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = getJudgeSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({
        success: false,
        authenticated: false,
        error: 'No active judge session found.'
      }, { status: 401 });
    }

    const assignedTeams = await db.getAssignedTeamsForJudge(session.judgeId);

    return NextResponse.json({
      success: true,
      authenticated: true,
      judge: session,
      assignedTeams
    });
  } catch (err: any) {
    console.error('[API Judge Auth GET Error]:', err);
    return NextResponse.json({ success: false, error: 'Internal server error verifying judge session.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = getJudgeSessionFromRequest(req);
    if (session) {
      await db.addAuditLog(
        session.fullName,
        'JUDGE_LOGOUT',
        `Judge ${session.fullName} locked evaluation terminal.`
      );
    }

    const response = NextResponse.json({
      success: true,
      message: 'Judge terminal locked and session cleared successfully.'
    });

    response.cookies.set(JUDGE_COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0
    });

    return response;
  } catch (err: any) {
    console.error('[API Judge Auth DELETE Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to clear judge session.' }, { status: 500 });
  }
}
