import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const trackId = searchParams.get('trackId');

  if (code) {
    const team = db.getTeamByCode(code.trim().toUpperCase());
    if (!team) {
      return NextResponse.json({ success: false, error: 'Team not found with the provided code.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, team });
  }

  let teams = db.getTeams();
  if (trackId && trackId !== 'all') {
    teams = teams.filter(t => t.trackId === trackId);
  }

  return NextResponse.json({ success: true, count: teams.length, teams });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { teamName, trackId, abstractTitle, abstractText, cloudArchitectureBlueprint, lead } = body;

    if (!teamName || !trackId || !abstractTitle || !abstractText || !lead?.fullName || !lead?.email) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: teamName, trackId, abstractTitle, abstractText, lead.fullName, lead.email are mandatory.' 
      }, { status: 400 });
    }

    if (!lead.meetupProfileUrl || !lead.meetupVerified) {
      return NextResponse.json({
        success: false,
        error: 'Team Leader Meetup RSVP verification is mandatory per AWS Student Builder Group regulations.'
      }, { status: 400 });
    }

    const newTeam = db.createTeam({
      teamName: teamName.trim(),
      trackId: trackId.trim(),
      institutionName: lead.college?.trim() || 'SIST',
      city: 'Chennai',
      state: 'Tamil Nadu',
      leaderName: lead.fullName.trim(),
      leaderEmail: lead.email.trim().toLowerCase(),
      leaderPhone: lead.phone?.trim() || '',
      leaderCollegeRegNo: lead.registerNo?.trim() || '',
      leaderMeetupUrl: lead.meetupProfileUrl.trim(),
      leaderAwsBuilderCenterUrl: lead.awsBuilderCenterUrl?.trim() || '',
      problemTitle: abstractTitle.trim(),
      problemAbstract: abstractText.trim(),
      architecturePdfUrl: cloudArchitectureBlueprint?.trim() || '',
      githubUrl: lead.githubUrl?.trim() || '',
    });

    return NextResponse.json({
      success: true,
      message: 'Team successfully registered with 100% Zero Entry Fee!',
      teamCode: newTeam.teamCode,
      team: newTeam
    }, { status: 201 });
  } catch (err: any) {
    console.error('[API Team Create Error]:', err);
    return NextResponse.json({ success: false, error: err.message || 'Failed to create team.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { teamCode, member } = body;

    if (!teamCode || !member?.fullName || !member?.email) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: teamCode, member.fullName, member.email are mandatory.' 
      }, { status: 400 });
    }

    if (!member.meetupProfileUrl || !member.meetupVerified) {
      return NextResponse.json({
        success: false,
        error: 'Meetup RSVP verification is required for all builders joining a team.'
      }, { status: 400 });
    }

    const roleMapping: 'Frontend' | 'Backend' | 'AI / Cloud' | 'UI/UX' = 
      member.role === 'Frontend' || member.role === 'Backend' || member.role === 'AI / Cloud' || member.role === 'UI/UX'
        ? member.role
        : 'Backend';

    const joinResult = db.joinTeam(teamCode.trim().toUpperCase(), {
      name: member.fullName.trim(),
      email: member.email.trim().toLowerCase(),
      phone: member.phone?.trim() || '',
      college: member.college?.trim() || 'SIST',
      collegeRegNo: member.registerNo?.trim() || '',
      role: roleMapping,
      meetupProfileUrl: member.meetupProfileUrl.trim(),
      awsBuilderCenterUrl: member.awsBuilderCenterUrl?.trim() || '',
      tshirtSize: member.tShirtSize || 'L',
    });

    if (!joinResult.success) {
      return NextResponse.json({ success: false, error: joinResult.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully joined ${joinResult.team?.teamName || 'team'}!`,
      team: joinResult.team
    });
  } catch (err: any) {
    console.error('[API Team Join Error]:', err);
    return NextResponse.json({ success: false, error: err.message || 'Failed to join team.' }, { status: 400 });
  }
}
