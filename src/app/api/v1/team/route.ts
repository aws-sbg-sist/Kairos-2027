import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';
import { getCurrentAdminSession } from '@/lib/auth';
import type { ParticipantTeam } from '@/types';

function sanitizeTeamPublic(team: ParticipantTeam) {
  const {
    inviteCode: _inviteCode,
    awsCreditVoucher: _awsCreditVoucher,
    commitWebhookSecret: _commitWebhookSecret,
    leaderEmail,
    ...rest
  } = team;

  return {
    ...rest,
    leaderEmail: leaderEmail ? leaderEmail.replace(/(?<=^.{2}).+(?=@)/, '***') : '',
    members: team.members.map((m) => ({
      id: m.id,
      name: m.name,
      role: m.role,
      college: m.college,
      meetupRsvpVerified: m.meetupRsvpVerified,
      confirmed: m.confirmed,
      email: m.email ? m.email.replace(/(?<=^.{2}).+(?=@)/, '***') : '',
    })),
  };
}

export async function GET(req: NextRequest) {
  const rateLimitResult = checkRateLimit(req, { limit: 30, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const trackId = searchParams.get('trackId');
  const session = await getCurrentAdminSession();

  if (code) {
    const team = db.getTeamByCode(code.trim().toUpperCase());
    if (!team) {
      return NextResponse.json({ success: false, error: 'Team not found with the provided code.' }, { status: 404 });
    }
    // If not admin, sanitize sensitive private fields (inviteCode, phone numbers, registration numbers, AWS credits)
    if (!session) {
      return NextResponse.json({ success: true, team: sanitizeTeamPublic(team) });
    }
    return NextResponse.json({ success: true, team });
  }

  let teams = db.getTeams();
  if (trackId && trackId !== 'all') {
    teams = teams.filter(t => t.trackId === trackId);
  }

  // If not admin, sanitize public team list to prevent inviteCode harvesting
  if (!session) {
    const publicTeams = teams.map(t => ({
      id: t.id,
      teamCode: t.teamCode,
      teamName: t.teamName,
      trackId: t.trackId,
      institutionName: t.institutionName,
      city: t.city,
      state: t.state,
      selectionStage: t.selectionStage,
      problemTitle: t.problemTitle,
      problemAbstract: t.problemAbstract,
      memberCount: t.members.length,
      members: t.members.map(m => ({
        id: m.id,
        name: m.name,
        role: m.role,
        college: m.college,
        confirmed: m.confirmed
      })),
      createdAt: t.createdAt
    }));
    return NextResponse.json({ success: true, count: publicTeams.length, teams: publicTeams });
  }

  return NextResponse.json({ success: true, count: teams.length, teams });
}

export async function POST(req: NextRequest) {
  const rateLimitResult = checkRateLimit(req, { limit: 10, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  try {
    const body = await req.json();
    
    // Normalize payload across flat form schema & nested schema
    const teamName = body.teamName;
    const trackId = body.trackId;
    const abstractTitle = body.abstractTitle || body.problemTitle;
    const abstractText = body.abstractText || body.problemAbstract;
    const cloudArchitectureBlueprint = body.cloudArchitectureBlueprint || body.architecturePdfUrl || '';
    
    // Extract leader fields
    const leaderName = body.lead?.fullName || body.leaderName;
    const leaderEmail = body.lead?.email || body.leaderEmail;
    const leaderPhone = body.lead?.phone || body.leaderPhone || '';
    const leaderCollege = body.lead?.college || body.institutionName || 'SIST';
    const leaderRegisterNo = body.lead?.registerNo || body.leaderCollegeRegNo || '';
    const leaderMeetupUrl = body.lead?.meetupProfileUrl || body.leaderMeetupUrl || '';
    const leaderAwsBuilderCenterUrl = body.lead?.awsBuilderCenterUrl || body.leaderAwsBuilderCenterUrl || '';
    const leaderGithubUrl = body.lead?.githubUrl || body.githubUrl || '';
    const city = body.city || 'Chennai';
    const state = body.state || 'Tamil Nadu';

    if (!teamName || !trackId || !abstractTitle || !abstractText || !leaderName || !leaderEmail) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: teamName, trackId, problem title, abstract, and leader details are mandatory.' 
      }, { status: 400 });
    }

    // Input length validation
    if (
      String(teamName).length > 100 ||
      String(trackId).length > 50 ||
      String(abstractTitle).length > 200 ||
      String(abstractText).length > 3000 ||
      String(leaderName).length > 150 ||
      String(leaderEmail).length > 254 ||
      (leaderPhone && String(leaderPhone).length > 50) ||
      (leaderRegisterNo && String(leaderRegisterNo).length > 50) ||
      (leaderMeetupUrl && String(leaderMeetupUrl).length > 300) ||
      (leaderAwsBuilderCenterUrl && String(leaderAwsBuilderCenterUrl).length > 300) ||
      (cloudArchitectureBlueprint && String(cloudArchitectureBlueprint).length > 500) ||
      (leaderGithubUrl && String(leaderGithubUrl).length > 300)
    ) {
      return NextResponse.json({
        success: false,
        error: 'One or more fields exceed maximum allowed character length.'
      }, { status: 400 });
    }

    // Meetup RSVP verification check per AWS SBGL regulations
    const isMeetupValid = Boolean(leaderMeetupUrl && leaderMeetupUrl.trim().length > 0);
    if (!isMeetupValid) {
      return NextResponse.json({
        success: false,
        error: 'Team Leader Meetup RSVP verification is mandatory per AWS Student Builder Group regulations.'
      }, { status: 400 });
    }

    const newTeam = db.createTeam({
      teamName: String(teamName).trim(),
      trackId: String(trackId).trim(),
      institutionName: String(leaderCollege).trim(),
      city: String(city).trim(),
      state: String(state).trim(),
      leaderName: String(leaderName).trim(),
      leaderEmail: String(leaderEmail).trim().toLowerCase(),
      leaderPhone: String(leaderPhone).trim(),
      leaderCollegeRegNo: String(leaderRegisterNo).trim(),
      leaderMeetupUrl: String(leaderMeetupUrl).trim(),
      leaderAwsBuilderCenterUrl: String(leaderAwsBuilderCenterUrl).trim(),
      problemTitle: String(abstractTitle).trim(),
      problemAbstract: String(abstractText).trim(),
      architecturePdfUrl: String(cloudArchitectureBlueprint).trim(),
      githubUrl: String(leaderGithubUrl).trim(),
    });

    return NextResponse.json({
      success: true,
      message: 'Team successfully registered with 100% Zero Entry Fee!',
      teamCode: newTeam.teamCode,
      inviteCode: newTeam.inviteCode,
      team: newTeam
    }, { status: 201 });
  } catch (err: any) {
    console.error('[API Team Create Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to create team. Please try again.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const rateLimitResult = checkRateLimit(req, { limit: 10, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  try {
    const body = await req.json();
    const { teamCode, member } = body;

    const memberName = member?.fullName || member?.name;
    const memberEmail = member?.email;
    const memberPhone = member?.phone || '';
    const memberCollege = member?.college || member?.institution || 'SIST';
    const memberRegisterNo = member?.registerNo || member?.collegeRegNo || '';
    const memberMeetupUrl = member?.meetupProfileUrl || '';
    const memberAwsBuilderCenterUrl = member?.awsBuilderCenterUrl || '';
    const memberTshirtSize = member?.tshirtSize || member?.tShirtSize || 'L';

    if (!teamCode || !memberName || !memberEmail) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: teamCode, member name, and member email are mandatory.' 
      }, { status: 400 });
    }

    // Input length validation
    if (
      String(teamCode).length > 50 ||
      String(memberName).length > 150 ||
      String(memberEmail).length > 254 ||
      (memberPhone && String(memberPhone).length > 50) ||
      (memberCollege && String(memberCollege).length > 200) ||
      (memberRegisterNo && String(memberRegisterNo).length > 50) ||
      (memberMeetupUrl && String(memberMeetupUrl).length > 300) ||
      (memberAwsBuilderCenterUrl && String(memberAwsBuilderCenterUrl).length > 300)
    ) {
      return NextResponse.json({
        success: false,
        error: 'One or more member fields exceed maximum allowed character length.'
      }, { status: 400 });
    }

    const roleMapping: 'Frontend' | 'Backend' | 'AI / Cloud' | 'UI/UX' = 
      member?.role === 'Frontend' || member?.role === 'Backend' || member?.role === 'AI / Cloud' || member?.role === 'UI/UX'
        ? member.role
        : 'Backend';

    const joinResult = db.joinTeam(String(teamCode).trim().toUpperCase(), {
      name: String(memberName).trim(),
      email: String(memberEmail).trim().toLowerCase(),
      phone: String(memberPhone).trim(),
      college: String(memberCollege).trim(),
      collegeRegNo: String(memberRegisterNo).trim(),
      role: roleMapping,
      meetupProfileUrl: String(memberMeetupUrl).trim(),
      awsBuilderCenterUrl: String(memberAwsBuilderCenterUrl).trim(),
      tshirtSize: memberTshirtSize,
    });

    if (!joinResult.success) {
      return NextResponse.json({ success: false, error: joinResult.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully joined ${joinResult.team?.teamName || 'team'}!`,
      team: joinResult.team ? sanitizeTeamPublic(joinResult.team) : undefined
    });
  } catch (err: any) {
    console.error('[API Team Join Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to join team. Please try again.' }, { status: 500 });
  }
}
