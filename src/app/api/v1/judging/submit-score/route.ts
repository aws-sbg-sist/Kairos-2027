import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';
import { verifyJudgeAuthorization } from '@/lib/rbac';
import { getJudgeSessionFromRequest } from '@/lib/judge_auth';

export async function POST(req: NextRequest) {
  // Rate limiting to prevent brute force on judge PINs or spam
  const rateLimitResult = checkRateLimit(req, { limit: 20, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  try {
    const body = await req.json();
    let { 
      judgePin, 
      judgeId, 
      teamId, 
      teamCode,
      checkpointGate, 
      criterion1Score, 
      criterion2Score, 
      criterion3Score, 
      criterion4Score, 
      qualitativeFeedback,
      recusal,
      recusedConflict,
      isEdit,
      editReason
    } = body;

    // Support teamCode as alias for teamId
    const targetTeam = teamId || teamCode;

    // 1. Authenticate Judge: Check session cookie or explicit credentials
    let authenticatedJudge: { id: string; fullName: string; trackSpecialization?: string; organization: string } | null = null;
    const session = getJudgeSessionFromRequest(req);

    if (session) {
      authenticatedJudge = {
        id: session.judgeId,
        fullName: session.fullName,
        trackSpecialization: session.trackSpecialization,
        organization: session.organization
      };
      judgeId = session.judgeId;
    } else if (judgeId && judgePin) {
      const authResult = await verifyJudgeAuthorization(judgeId, judgePin, targetTeam);
      if (!authResult.authorized || !authResult.judge) {
        return NextResponse.json({
          success: false,
          error: authResult.error || 'Invalid judge credentials.',
          code: authResult.statusCode === 400 ? 'BAD_REQUEST' : 'FORBIDDEN_JUDGE'
        }, { status: authResult.statusCode });
      }
      authenticatedJudge = authResult.judge;
    } else if (judgePin && !judgeId) {
      // If only judgePin is provided, verify against all active judges
      const judge = await db.verifyJudgePin(String(judgePin).trim());
      if (!judge) {
        return NextResponse.json({
          success: false,
          error: 'Invalid 6-digit Jury Access PIN.',
          code: 'FORBIDDEN_JUDGE'
        }, { status: 403 });
      }
      authenticatedJudge = judge;
      judgeId = judge.id;
    } else {
      return NextResponse.json({
        success: false,
        error: 'Missing judge credentials (judgeId and access PIN).',
        code: 'BAD_REQUEST'
      }, { status: 400 });
    }

    if (!targetTeam) {
      return NextResponse.json({
        success: false,
        error: 'Missing required evaluation field: teamId/teamCode.'
      }, { status: 400 });
    }

    // Verify track assignment compatibility for this team
    const teams = await db.getTeams();
    const cleanTeam = targetTeam.trim().toLowerCase();
    const foundTeam = teams.find(t => 
      t.id.toLowerCase() === cleanTeam || 
      (t.teamCode && t.teamCode.toLowerCase() === cleanTeam) ||
      (t.inviteCode && t.inviteCode.toLowerCase() === cleanTeam)
    );

    if (!foundTeam) {
      return NextResponse.json({
        success: false,
        error: `Team [${targetTeam}] not found in tournament roster.`
      }, { status: 404 });
    }

    if (authenticatedJudge.trackSpecialization) {
      const spec = authenticatedJudge.trackSpecialization.toLowerCase();
      const teamTrack = (foundTeam.trackId || '').toLowerCase().replace(/^track-/, '');
      const trackMatch = 
        spec.includes('all') ||
        spec.includes('general') ||
        spec.includes(teamTrack) ||
        (teamTrack.includes('cloud') && spec.includes('cloud')) ||
        (teamTrack.includes('ai') && spec.includes('ai')) ||
        ((teamTrack.includes('fintech') || teamTrack.includes('trust')) && (spec.includes('fintech') || spec.includes('trust'))) ||
        (teamTrack.includes('open') && spec.includes('open')) ||
        (teamTrack.includes('edge') && spec.includes('edge')) ||
        (teamTrack.includes('iot') && spec.includes('iot')) ||
        (teamTrack.includes('distributed') && spec.includes('distributed'));

      if (!trackMatch) {
        return NextResponse.json({
          success: false,
          error: `Forbidden: Judge ${authenticatedJudge.fullName} is assigned to [${authenticatedJudge.trackSpecialization}], but team [${foundTeam.teamCode || foundTeam.teamName}] is competing in [${foundTeam.trackId}].`,
          code: 'TRACK_ASSIGNMENT_MISMATCH'
        }, { status: 403 });
      }
    }

    // Handle conflict of interest recusal
    const isRecused = Boolean(recusal || recusedConflict);
    if (isRecused) {
      await db.addAuditLog(
        authenticatedJudge.fullName,
        'RECUSE_EVALUATION',
        `Judge ${authenticatedJudge.fullName} declared conflict of interest and recused from evaluating team [${foundTeam.teamCode || foundTeam.teamName}]${checkpointGate ? ` for Gate ${checkpointGate}` : ''}.`
      );

      return NextResponse.json({
        success: true,
        message: 'Conflict of interest recusal logged in tournament audit trail. Evaluation skipped for this team.',
        recused: true
      });
    }

    if (checkpointGate === undefined || checkpointGate === null) {
      return NextResponse.json({
        success: false,
        error: 'Missing required checkpointGate (1, 2, or 3).'
      }, { status: 400 });
    }

    // Validate feedback length
    if (qualitativeFeedback && qualitativeFeedback.length > 2000) {
      return NextResponse.json({
        success: false,
        error: 'Qualitative feedback exceeds maximum 2000 characters.'
      }, { status: 400 });
    }

    // Validate points bounds
    const c1 = Number(criterion1Score) || 0;
    const c2 = Number(criterion2Score) || 0;
    const c3 = Number(criterion3Score) || 0;
    const c4 = Number(criterion4Score) || 0;

    if (c1 < 0 || c1 > 30 || c2 < 0 || c2 > 25 || c3 < 0 || c3 > 25 || c4 < 0 || c4 > 20) {
      return NextResponse.json({
        success: false,
        error: 'Scores exceed maximum rubric bounds: C1 Architecture (0-30), C2 Originality (0-25), C3 Prototype (0-25), C4 Practical Value (0-20).'
      }, { status: 400 });
    }

    const gateNum = Number(checkpointGate);
    if (![1, 2, 3].includes(gateNum)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid checkpoint gate. Must be Gate 1, Gate 2, or Gate 3.'
      }, { status: 400 });
    }

    const evalResult = await db.saveEvaluation(
      {
        teamId: foundTeam.teamCode || foundTeam.id,
        judgeId,
        checkpointGate: gateNum,
        criterion1Score: c1,
        criterion2Score: c2,
        criterion3Score: c3,
        criterion4Score: c4,
        qualitativeFeedback: qualitativeFeedback?.trim() || ''
      },
      Boolean(isEdit),
      authenticatedJudge.fullName,
      editReason
    );

    if (evalResult.duplicate) {
      return NextResponse.json({
        success: false,
        duplicate: true,
        error: evalResult.error,
        evaluation: evalResult.evaluation
      }, { status: 409 });
    }

    if (!evalResult.success || !evalResult.evaluation) {
      return NextResponse.json({
        success: false,
        error: evalResult.error || 'Failed to save evaluation.'
      }, { status: 500 });
    }

    if (evalResult.updated) {
      return NextResponse.json({
        success: true,
        updated: true,
        message: `Evaluation for Checkpoint Gate ${gateNum} successfully updated and recalibrated.`,
        evaluation: evalResult.evaluation
      }, { status: 200 });
    }

    return NextResponse.json({
      success: true,
      message: 'Evaluation and Z-score recorded successfully!',
      evaluation: evalResult.evaluation
    }, { status: 201 });
  } catch (err: any) {
    console.error('[API Judging Submit Error]:', err);
    return NextResponse.json({ success: false, error: 'Internal server error recording judge score.' }, { status: 500 });
  }
}
