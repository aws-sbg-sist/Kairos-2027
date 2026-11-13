import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';
import { getCurrentAdminSession } from '@/lib/auth';
import { Judge } from '@/types';

export async function POST(req: NextRequest) {
  // Rate limiting to prevent brute force on judge PINs
  const rateLimitResult = checkRateLimit(req, { limit: 15, windowMs: 60_000 });
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
      recusedConflict 
    } = body;

    const isRecused = Boolean(recusal || recusedConflict);

    if (!judgePin) {
      return NextResponse.json({
        success: false,
        error: 'Missing required credentials: Jury Access PIN is mandatory.'
      }, { status: 400 });
    }

    const judges = db.getJudges();
    let judge: Judge | undefined = undefined;

    // Resolve judge by ID or by PIN directly
    if (judgeId) {
      judge = judges.find(j => j.id === judgeId && j.isActive);
    } else {
      judge = judges.find(j => j.accessPin === String(judgePin).trim() && j.isActive);
      if (judge) {
        judgeId = judge.id;
      }
    }

    if (!judge) {
      return NextResponse.json({
        success: false,
        error: 'Judge account not found or is currently inactive. Please verify your Jury Access PIN.'
      }, { status: 403 });
    }

    const pinBuffer = Buffer.from(String(judgePin).trim());
    const expectedBuffer = Buffer.from(String(judge.accessPin).trim());

    if (pinBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(pinBuffer, expectedBuffer)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid Jury Access PIN for this judge account.'
      }, { status: 403 });
    }

    // Resolve teamId from teamCode if needed
    if (!teamId && teamCode) {
      const team = db.getTeamByCode(String(teamCode).trim().toUpperCase());
      if (team) {
        teamId = team.id;
      }
    }

    if (isRecused) {
      return NextResponse.json({
        success: true,
        message: 'Conflict of interest recusal logged. Evaluation skipped for this team.',
        recused: true
      });
    }

    if (!teamId || checkpointGate === undefined || checkpointGate === null) {
      return NextResponse.json({
        success: false,
        error: 'Missing required evaluation fields: teamId/teamCode and checkpointGate are mandatory.'
      }, { status: 400 });
    }

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
        error: 'Scores exceed maximum rubric bounds: C1 (0-30), C2 (0-25), C3 (0-25), C4 (0-20).'
      }, { status: 400 });
    }

    const evaluation = db.addEvaluation({
      teamId,
      judgeId,
      checkpointGate: Number(checkpointGate) as 1 | 2 | 3,
      criterion1Score: c1,
      criterion2Score: c2,
      criterion3Score: c3,
      criterion4Score: c4,
      qualitativeFeedback: qualitativeFeedback?.trim() || ''
    });

    return NextResponse.json({
      success: true,
      message: 'Evaluation and Gaussian Z-score recorded successfully!',
      evaluation
    }, { status: 201 });
  } catch (err: any) {
    console.error('[API Judging Submit Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to record judge score.' }, { status: 500 });
  }
}

export async function GET() {
  const evaluations = db.getEvaluations();
  const teams = db.getTeams();
  const session = await getCurrentAdminSession();

  const standings = teams.map(t => {
    const teamEvals = evaluations.filter(e => e.teamId === t.id);
    const avgZScore = teamEvals.length > 0
      ? teamEvals.reduce((sum, e) => sum + (e.normalizedZScore ?? 0), 0) / teamEvals.length
      : 0;
    const rawTotal = teamEvals.length > 0
      ? teamEvals.reduce((sum, e) => sum + e.rawTotalScore, 0) / teamEvals.length
      : 0;

    return {
      teamId: t.id,
      teamCode: t.teamCode,
      teamName: t.teamName,
      trackId: t.trackId,
      institution: t.institutionName || 'SIST',
      evaluationCount: teamEvals.length,
      rawTotal: Math.round(rawTotal * 10) / 10,
      zScore: `${avgZScore >= 0 ? '+' : ''}${avgZScore.toFixed(2)}σ`,
      rawZScore: avgZScore
    };
  }).sort((a, b) => b.rawZScore - a.rawZScore);

  return NextResponse.json({
    success: true,
    totalEvaluations: evaluations.length,
    standings,
    ...(session ? { evaluations } : {})
  });
}
