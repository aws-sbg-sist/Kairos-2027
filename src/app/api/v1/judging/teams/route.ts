import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getJudgeSessionFromRequest } from '@/lib/judge_auth';
import { verifyJudgeAuthorization } from '@/lib/rbac';

export async function GET(req: NextRequest) {
  try {
    let judgeId: string | undefined;

    // 1. Try session token
    const session = getJudgeSessionFromRequest(req);
    if (session) {
      judgeId = session.judgeId;
    } else {
      // 2. Try query params fallback
      const { searchParams } = new URL(req.url);
      const paramJudgeId = searchParams.get('judgeId');
      const paramPin = searchParams.get('judgePin');

      if (paramJudgeId && paramPin) {
        const auth = verifyJudgeAuthorization(paramJudgeId, paramPin);
        if (auth.authorized && auth.judge) {
          judgeId = auth.judge.id;
        } else {
          return NextResponse.json({
            success: false,
            error: auth.error || 'Invalid judge credentials.'
          }, { status: auth.statusCode });
        }
      }
    }

    if (!judgeId) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized: Active judge session or valid credentials required.'
      }, { status: 401 });
    }

    const assignedTeams = db.getAssignedTeamsForJudge(judgeId);

    return NextResponse.json({
      success: true,
      judgeId,
      assignedTeamsCount: assignedTeams.length,
      assignedTeams
    });
  } catch (err: any) {
    console.error('[API Judging Teams Error]:', err);
    return NextResponse.json({ success: false, error: 'Internal server error fetching assigned teams.' }, { status: 500 });
  }
}
