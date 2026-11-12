import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentStudentSession } from '@/lib/student_auth';
import { verifyTeamLeader } from '@/lib/rbac';
import { sendTransactionalEmail, buildQualifierSubmissionEmail } from '@/lib/email';

/**
 * PHASE 03 RBAC ENFORCEMENT (VULN-01 Resolved):
 * Qualifier submission writes require an authenticated student session AND verified
 * Team Leader status for the target team. Unauthenticated requests are rejected with 401,
 * and unauthorized members / non-leaders are rejected with 403 Forbidden.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Verify Student Authentication
    const studentSession = await getCurrentStudentSession();
    if (!studentSession) {
      return NextResponse.json({
        success: false,
        error: 'Authentication required. Please sign in to submit qualifier deliverables.',
        code: 'UNAUTHORIZED'
      }, { status: 401 });
    }

    // 2. Parse submission payload
    const body = await req.json();
    const { teamCode } = body;

    if (!teamCode) {
      return NextResponse.json({
        success: false,
        error: 'Team code is required.',
        code: 'BAD_REQUEST'
      }, { status: 400 });
    }

    // 3. Verify Team Leader Role Authorization
    const leaderCheck = verifyTeamLeader(studentSession.email, teamCode);
    if (!leaderCheck.authorized) {
      return NextResponse.json({
        success: false,
        error: leaderCheck.error || 'Only the designated Team Leader can submit official team deliverables.',
        code: leaderCheck.statusCode === 404 ? 'TEAM_NOT_FOUND' : 'FORBIDDEN_LEADER_ONLY'
      }, { status: leaderCheck.statusCode });
    }

    // 4. Process validated submission
    const result = await processQualifierSubmission(body);
    const statusCode = result.status || (result.success ? 200 : 400);

    if (result.success) {
      const team = db.getTeamByCode(teamCode.trim().toUpperCase());
      if (team) {
        sendTransactionalEmail(buildQualifierSubmissionEmail({
          to: team.leaderEmail || studentSession.email,
          leaderName: team.leaderName || studentSession.fullName || 'Team Leader',
          teamName: team.teamName || 'Kairos Squad',
          teamCode: team.teamCode || team.id || 'KAIROS-SQUAD',
          githubUrl: body.githubUrl.trim(),
          loomVideoUrl: body.loomVideoUrl.trim(),
          defenseSlot: result.submission?.defenseSlot,
        })).catch(err => console.error('[Email Qualifier Submit Error]:', err));
      }
    }

    return NextResponse.json(result, { status: statusCode });
  } catch (err: any) {
    console.error('[API Qualifier Submit Error]:', err);
    return NextResponse.json({
      success: false,
      error: 'An unexpected server error occurred while processing qualifier submission.',
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}

/**
 * PRESERVED SUBMISSION HANDLER:
 * Kept intact for Phase 01 integration with authenticated student sessions.
 */
async function processQualifierSubmission(body: {
  teamCode: string;
  loomVideoUrl: string;
  githubUrl: string;
  architectureSummary?: string;
  defenseSlotRequested?: string;
}) {
  const { teamCode, loomVideoUrl, githubUrl, defenseSlotRequested } = body;

  if (!teamCode || !loomVideoUrl || !githubUrl) {
    return { success: false, error: 'Team code, Loom demo video URL, and GitHub repository URL are required.', status: 400 };
  }

  if (!githubUrl.includes('github.com')) {
    return { success: false, error: 'Please provide a valid GitHub repository URL.', status: 400 };
  }

  const updated = db.submitRound1Qualifier(teamCode.trim().toUpperCase(), {
    loomVideoUrl: loomVideoUrl.trim(),
    githubUrl: githubUrl.trim()
  });

  if (!updated) {
    return { success: false, error: `Team ${teamCode.toUpperCase()} not found. Please verify your team code.`, status: 404 };
  }

  return {
    success: true,
    message: 'Round 1 Qualifier artifacts successfully submitted!',
    submission: {
      teamCode: teamCode.toUpperCase(),
      defenseSlot: defenseSlotRequested || '2027-01-03T11:30:00+05:30',
      meetUrl: 'https://meet.google.com/kairos-qualifier-bay',
      evaluatorTrack: 'AWS Solutions Architecture Panel',
      status: 'SUBMITTED_FOR_REVIEW'
    }
  };
}
