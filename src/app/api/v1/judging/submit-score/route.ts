import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';

export async function POST(req: NextRequest) {
  // Rate limiting to prevent brute force on judge PINs
  const rateLimitResult = checkRateLimit(req, { limit: 15, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  try {
    const body = await req.json();
    const { 
      judgePin, 
      judgeId, 
      teamId, 
      checkpointGate, 
      criterion1Score, 
      criterion2Score, 
      criterion3Score, 
      criterion4Score, 
      qualitativeFeedback,
      recusal 
    } = body;

    if (!judgeId || !judgePin) {
      return NextResponse.json({
        success: false,
        error: 'Missing required credentials: judgeId and judgePin.'
      }, { status: 400 });
    }

    // Per-judge DB credential verification with constant-time PIN comparison
    const judges = db.getJudges();
    const judge = judges.find(j => j.id === judgeId && j.isActive);

    if (!judge) {
      return NextResponse.json({
        success: false,
        error: 'Judge account not found or is currently inactive.'
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

    if (recusal) {
      return NextResponse.json({
        success: true,
        message: 'Conflict of interest recusal logged. Evaluation skipped for this team.',
        recused: true
      });
    }

    if (!teamId || checkpointGate === undefined || checkpointGate === null) {
      return NextResponse.json({
        success: false,
        error: 'Missing required evaluation fields: teamId, checkpointGate.'
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
      message: 'Evaluation and Z-score recorded successfully!',
      evaluation
    }, { status: 201 });
  } catch (err: any) {
    console.error('[API Judging Submit Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to record judge score.' }, { status: 500 });
  }
}
