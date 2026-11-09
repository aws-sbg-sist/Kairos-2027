import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';

export async function POST(req: NextRequest) {
  // Rate limit: 10 qualifier submissions per minute per IP
  const rateLimitResult = checkRateLimit(req, { limit: 10, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  try {
    const body = await req.json();
    const { teamCode, loomVideoUrl, githubUrl, architectureSummary, defenseSlotRequested } = body;

    if (!teamCode || !loomVideoUrl || !githubUrl) {
      return NextResponse.json({
        success: false,
        error: 'Team code, Loom demo video URL, and GitHub repository URL are required.'
      }, { status: 400 });
    }

    const cleanTeamCode = String(teamCode).trim().toUpperCase();
    const cleanLoom = String(loomVideoUrl).trim();
    const cleanGithub = String(githubUrl).trim();

    // Length checks
    if (cleanTeamCode.length > 50 || cleanLoom.length > 300 || cleanGithub.length > 300) {
      return NextResponse.json({
        success: false,
        error: 'One or more fields exceed maximum allowed character length.'
      }, { status: 400 });
    }

    // URL validations
    if (!/^https?:\/\//i.test(cleanLoom)) {
      return NextResponse.json({
        success: false,
        error: 'Demo video URL must begin with https:// or http:// (Loom, YouTube, Drive, etc.).'
      }, { status: 400 });
    }

    if (!/^https?:\/\/(www\.)?github\.com\//i.test(cleanGithub)) {
      return NextResponse.json({
        success: false,
        error: 'Please provide a valid GitHub repository URL (e.g., https://github.com/your-org/your-repo).'
      }, { status: 400 });
    }

    const updated = db.submitRound1Qualifier(cleanTeamCode, {
      loomVideoUrl: cleanLoom,
      githubUrl: cleanGithub
    });

    if (!updated) {
      return NextResponse.json({
        success: false,
        error: `Team ${cleanTeamCode} not found. Please verify your team invitation code.`
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Round 1 Qualifier artifacts successfully submitted!',
      submission: {
        teamCode: cleanTeamCode,
        defenseSlot: defenseSlotRequested || '2027-01-03T11:30:00+05:30',
        meetUrl: 'https://meet.google.com/kairos-qualifier-bay',
        evaluatorTrack: 'AWS Solutions Architecture Panel',
        status: 'SUBMITTED_FOR_REVIEW'
      }
    });
  } catch (err: any) {
    console.error('[API Qualifier Submit Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to process qualifier submission.' }, { status: 500 });
  }
}
