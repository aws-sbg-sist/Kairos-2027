import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { teamCode, loomVideoUrl, githubUrl, architectureSummary, defenseSlotRequested } = body;

    if (!teamCode || !loomVideoUrl || !githubUrl) {
      return NextResponse.json({
        success: false,
        error: 'Team code, Loom demo video URL, and GitHub repository URL are required.'
      }, { status: 400 });
    }

    if (!githubUrl.includes('github.com')) {
      return NextResponse.json({
        success: false,
        error: 'Please provide a valid GitHub repository URL.'
      }, { status: 400 });
    }

    const updated = db.submitRound1Qualifier(teamCode.trim().toUpperCase(), {
      loomVideoUrl: loomVideoUrl.trim(),
      githubUrl: githubUrl.trim()
    });

    if (!updated) {
      return NextResponse.json({
        success: false,
        error: `Team ${teamCode.toUpperCase()} not found. Please verify your team code.`
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Round 1 Qualifier artifacts successfully submitted!',
      submission: {
        teamCode: teamCode.toUpperCase(),
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
