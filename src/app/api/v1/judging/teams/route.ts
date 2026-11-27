import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getJudgeSessionFromRequest } from '@/lib/judge_auth';

export async function GET(req: NextRequest) {
  try {
    const session = getJudgeSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized: Active judge session required. Please authenticate via POST /api/v1/judging/auth.'
      }, { status: 401 });
    }

    const judges = await db.getJudges();
    const activeJudge = judges.find(j => j.id === session.judgeId && j.isActive);
    if (!activeJudge) {
      return NextResponse.json({
        success: false,
        error: 'Forbidden: Judge account is inactive or no longer exists.'
      }, { status: 403 });
    }

    const assignedTeams = await db.getAssignedTeamsForJudge(activeJudge.id);

    return NextResponse.json({
      success: true,
      judgeId: activeJudge.id,
      assignedTeamsCount: assignedTeams.length,
      assignedTeams
    });
  } catch (err: any) {
    console.error('[API Judging Teams Error]:', err);
    return NextResponse.json({ success: false, error: 'Internal server error fetching assigned teams.' }, { status: 500 });
  }
}
