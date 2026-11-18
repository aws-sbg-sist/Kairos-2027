import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentStudentSession } from '@/lib/student_auth';
import { verifyTeamLeader } from '@/lib/rbac';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';

/**
 * DELETE /api/v1/team/members
 * Removes a member from the squad.
 * Authorization:
 * - Either the Team Leader removes a squad member.
 * - Or the member removes themselves (voluntary squad exit).
 * - Under all circumstances, the Leader cannot be removed without prior leadership transfer.
 */
export async function DELETE(req: NextRequest) {
  const rateLimitResult = checkRateLimit(req, { limit: 15, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  try {
    const studentSession = await getCurrentStudentSession();
    if (!studentSession) {
      return NextResponse.json({
        success: false,
        error: 'Authentication required. Please sign in to manage team members.',
        code: 'UNAUTHORIZED'
      }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    let teamCode = searchParams.get('teamCode');
    let memberEmail = searchParams.get('memberEmail');

    // Also support JSON body if provided
    try {
      const body = await req.json();
      if (body) {
        if (body.teamCode) teamCode = body.teamCode;
        if (body.memberEmail) memberEmail = body.memberEmail;
      }
    } catch (e) {
      // Query parameters fallback
    }

    if (!teamCode || !memberEmail) {
      return NextResponse.json({
        success: false,
        error: 'Both teamCode and memberEmail are required to remove a team member.'
      }, { status: 400 });
    }

    const cleanCode = teamCode.trim().toUpperCase();
    const cleanEmail = memberEmail.trim().toLowerCase();
    const callerEmail = studentSession.email.trim().toLowerCase();

    // Verify caller authorization
    const leaderCheck = await verifyTeamLeader(callerEmail, cleanCode);
    const isLeader = leaderCheck.authorized;
    const isSelf = callerEmail === cleanEmail;

    if (!isLeader && !isSelf) {
      return NextResponse.json({
        success: false,
        error: 'Forbidden: You must be the Team Leader or the member themselves to leave or remove someone from the team.',
        code: 'FORBIDDEN'
      }, { status: 403 });
    }

    const result = await db.removeTeamMember(cleanCode, cleanEmail);
    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error || 'Failed to remove member from team.'
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: isSelf ? 'Successfully left the team.' : `Member ${cleanEmail} successfully removed from the team.`,
      team: result.team
    });
  } catch (err: any) {
    console.error('[API Team Member Remove Error]:', err);
    return NextResponse.json({
      success: false,
      error: 'An unexpected server error occurred while removing team member.'
    }, { status: 500 });
  }
}
