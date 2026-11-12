import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * PHASE 00 SECURITY CONTAINMENT (VULN-01 IDOR Mitigation):
 * Unauthenticated qualifier submission writes are suspended pending the rollout of
 * authenticated student/team session infrastructure. Team codes cannot be used as credentials.
 * The legacy write handler is preserved below as processQualifierSubmission for Phase 01 integration.
 */
export async function POST(req: NextRequest) {
  // Reject all unauthenticated submission writes with HTTP 503 Service Unavailable
  return NextResponse.json({
    success: false,
    error: 'Round 1 Qualifier submission writes are temporarily locked pending participant authentication infrastructure deployment. Submission writes are suspended to protect team deliverable integrity.',
    code: 'QUALIFIER_SUBMISSIONS_LOCKED',
    retryAfter: 'Phase 01 Auth Rollout',
  }, { 
    status: 503,
    headers: {
      'Retry-After': '86400',
    }
  });
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
