import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentStudentSession } from '@/lib/student_auth';
import { verifyTeamLeader } from '@/lib/rbac';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';

/**
 * POST /api/v1/team/transfer-leadership
 * Transfers team leadership from the current verified Team Leader to another confirmed squad member.
 */
export async function POST(req: NextRequest) {
  const rateLimitResult = checkRateLimit(req, { limit: 10, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  try {
    const studentSession = await getCurrentStudentSession();
    if (!studentSession) {
      return NextResponse.json({
        success: false,
        error: 'Authentication required. Please sign in to transfer team leadership.',
        code: 'UNAUTHORIZED'
      }, { status: 401 });
    }

    const body = await req.json();
    const { teamCode, newLeaderEmail } = body;

    if (!teamCode || !newLeaderEmail) {
      return NextResponse.json({
        success: false,
        error: 'Both teamCode and newLeaderEmail are required.'
      }, { status: 400 });
    }

    const cleanCode = teamCode.trim().toUpperCase();
    const cleanNewLeader = newLeaderEmail.trim().toLowerCase();
    const callerEmail = studentSession.email.trim().toLowerCase();

    // Verify caller is the current Team Leader
    const leaderCheck = verifyTeamLeader(callerEmail, cleanCode);
    if (!leaderCheck.authorized) {
      return NextResponse.json({
        success: false,
        error: leaderCheck.error || 'Only the current Team Leader can transfer team leadership.',
        code: leaderCheck.statusCode === 404 ? 'TEAM_NOT_FOUND' : 'FORBIDDEN_LEADER_ONLY'
      }, { status: leaderCheck.statusCode });
    }

    const result = db.transferTeamLeadership(cleanCode, callerEmail, cleanNewLeader);
    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error || 'Failed to transfer leadership.'
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Leadership successfully transferred to ${cleanNewLeader}.`,
      team: result.team
    });
  } catch (err: any) {
    console.error('[API Transfer Leadership Error]:', err);
    return NextResponse.json({
      success: false,
      error: 'An unexpected server error occurred while transferring leadership.'
    }, { status: 500 });
  }
}
