import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentStudentSession } from '@/lib/student_auth';
import { verifyTeamLeader } from '@/lib/rbac';
import { sendTransactionalEmail, buildQualifierSubmissionEmail } from '@/lib/email';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';
import { isValidHttpUrl, safeParseJson } from '@/lib/http';

/**
 * PHASE 03 RBAC ENFORCEMENT (VULN-01 Resolved):
 * Qualifier submission writes require an authenticated student session AND verified
 * Team Leader status for the target team.
 */
export async function POST(req: NextRequest) {
  const rateLimit = checkRateLimit(req, { limit: 15, windowMs: 60_000, identifier: 'qualifier_submit' });
  if (!rateLimit.allowed) {
    return createRateLimitResponse(rateLimit.resetAt, rateLimit.limit);
  }

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

    // 2. Parse submission payload safely
    const parsed = await safeParseJson(req);
    if (!parsed.ok) return parsed.response;
    const body = parsed.data;
    const { teamCode } = body;

    if (!teamCode || typeof teamCode !== 'string') {
      return NextResponse.json({
        success: false,
        error: 'Team code is required.',
        code: 'BAD_REQUEST'
      }, { status: 400 });
    }

    // 3. Verify Team Leader Role Authorization
    const leaderCheck = await verifyTeamLeader(studentSession.email, teamCode);
    if (!leaderCheck.authorized) {
      return NextResponse.json({
        success: false,
        error: leaderCheck.error || 'Only the designated Team Leader can submit official team deliverables.',
        code: leaderCheck.statusCode === 404 ? 'TEAM_NOT_FOUND' : 'FORBIDDEN_LEADER_ONLY'
      }, { status: leaderCheck.statusCode });
    }

    // 4. Process validated submission
    const result = await processQualifierSubmission(body as any);
    const statusCode = result.status || (result.success ? 200 : 400);

    if (result.success) {
      const team = await db.getTeamByCode(teamCode.trim().toUpperCase());
      if (team) {
        sendTransactionalEmail(buildQualifierSubmissionEmail({
          to: team.leaderEmail || studentSession.email,
          leaderName: team.leaderName || studentSession.fullName || 'Team Leader',
          teamName: team.teamName || 'Kairos Squad',
          teamCode: team.teamCode || team.id || 'KAIROS-SQUAD',
          githubUrl: String(body.githubUrl).trim(),
          loomVideoUrl: String(body.loomVideoUrl).trim(),
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

async function processQualifierSubmission(body: {
  teamCode: string;
  loomVideoUrl: string;
  githubUrl: string;
  architecturePdfUrl?: string;
  architectureSummary?: string;
  defenseSlotRequested?: string;
}) {
  const { teamCode, loomVideoUrl, githubUrl, architecturePdfUrl, architectureSummary, defenseSlotRequested } = body;

  if (!teamCode || !loomVideoUrl || !githubUrl || typeof loomVideoUrl !== 'string' || typeof githubUrl !== 'string') {
    return { success: false, error: 'Team code, Loom demo video URL, and GitHub repository URL are required.', status: 400 };
  }

  if (
    loomVideoUrl.length > 500 ||
    githubUrl.length > 300 ||
    (architecturePdfUrl && String(architecturePdfUrl).length > 500) ||
    (architectureSummary && String(architectureSummary).length > 3000) ||
    (defenseSlotRequested && String(defenseSlotRequested).length > 100)
  ) {
    return { success: false, error: 'One or more submission fields exceed maximum allowed length.', status: 400 };
  }

  if (!isValidHttpUrl(loomVideoUrl)) {
    return { success: false, error: 'Demo video URL must begin with https:// or http://.', status: 400 };
  }

  if (!isValidHttpUrl(githubUrl) || !githubUrl.toLowerCase().includes('github.com')) {
    return { success: false, error: 'Please provide a valid GitHub repository URL (https://github.com/...).', status: 400 };
  }

  if (architecturePdfUrl && !isValidHttpUrl(String(architecturePdfUrl))) {
    return { success: false, error: 'Architecture deck URL must be a valid uploaded file or https:// URL.', status: 400 };
  }

  const updated = await db.submitRound1Qualifier(teamCode.trim().toUpperCase(), {
    loomVideoUrl: loomVideoUrl.trim(),
    githubUrl: githubUrl.trim(),
    architecturePdfUrl: architecturePdfUrl ? String(architecturePdfUrl).trim() : undefined,
    architectureSummary: architectureSummary ? String(architectureSummary).trim() : undefined,
    defenseSlotRequested: defenseSlotRequested ? String(defenseSlotRequested).trim() : undefined,
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
