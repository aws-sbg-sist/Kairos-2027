import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';
import { getCurrentAdminSession } from '@/lib/auth';
import { getCurrentStudentSession } from '@/lib/student_auth';

export async function GET(req: NextRequest) {
  const rateLimitResult = checkRateLimit(req, { limit: 30, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const trackId = searchParams.get('trackId');
  const session = await getCurrentAdminSession();
  const studentSession = await getCurrentStudentSession();

  if (code) {
    const cleanCode = code.trim().toUpperCase();
    const team = db.getTeamByCode(cleanCode) || db.getTeams().find(t => (t.id && t.id.toUpperCase() === cleanCode) || (t.teamCode && t.teamCode.toUpperCase() === cleanCode));
    if (!team) {
      return NextResponse.json({ success: false, error: 'Team not found with the provided code.' }, { status: 404 });
    }

    // RBAC: Verify if caller is an organizer or a registered member of this team
    const isMember = studentSession && (
      (team.leaderEmail && team.leaderEmail.toLowerCase() === studentSession.email.toLowerCase()) ||
      (team.members || []).some(m => m.email.toLowerCase() === studentSession.email.toLowerCase())
    );

    if (session || isMember) {
      // Full details with invite code and personal contact details for authorized members and admins
      return NextResponse.json({ success: true, team });
    }

    // Public / third-party view: sanitize sensitive PII and confidential invite code
    const sanitizedTeam = {
      id: team.id,
      teamCode: team.teamCode,
      teamName: team.teamName,
      trackId: team.trackId,
      institutionName: team.institutionName,
      city: team.city,
      state: team.state,
      selectionStage: team.selectionStage,
      problemTitle: team.problemTitle,
      problemAbstract: team.problemAbstract,
      memberCount: team.members.length,
      members: team.members.map(m => ({
        id: m.id,
        name: m.name,
        role: m.role,
        college: m.college,
        confirmed: m.confirmed
      })),
      createdAt: team.createdAt
    };

    return NextResponse.json({ success: true, team: sanitizedTeam });
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
    const { teamName, trackId, abstractTitle, abstractText, cloudArchitectureBlueprint, lead } = body;

    if (!teamName || !trackId || !abstractTitle || !abstractText || !lead?.fullName || !lead?.email) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: teamName, trackId, abstractTitle, abstractText, lead.fullName, lead.email are mandatory.' 
      }, { status: 400 });
    }

    // Input length validation
    if (
      teamName.length > 100 ||
      trackId.length > 50 ||
      abstractTitle.length > 200 ||
      abstractText.length > 3000 ||
      lead.fullName.length > 150 ||
      lead.email.length > 254 ||
      (lead.phone && lead.phone.length > 50) ||
      (lead.registerNo && lead.registerNo.length > 50) ||
      (lead.meetupProfileUrl && lead.meetupProfileUrl.length > 300) ||
      (lead.awsBuilderCenterUrl && lead.awsBuilderCenterUrl.length > 300) ||
      (cloudArchitectureBlueprint && cloudArchitectureBlueprint.length > 500) ||
      (lead.githubUrl && lead.githubUrl.length > 300)
    ) {
      return NextResponse.json({
        success: false,
        error: 'One or more fields exceed maximum allowed character length.'
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

    if (!teamCode || !member?.fullName || !member?.email) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: teamCode, member.fullName, member.email are mandatory.' 
      }, { status: 400 });
    }

    // Input length validation
    if (
      teamCode.length > 50 ||
      member.fullName.length > 150 ||
      member.email.length > 254 ||
      (member.phone && member.phone.length > 50) ||
      (member.college && member.college.length > 200) ||
      (member.registerNo && member.registerNo.length > 50) ||
      (member.meetupProfileUrl && member.meetupProfileUrl.length > 300) ||
      (member.awsBuilderCenterUrl && member.awsBuilderCenterUrl.length > 300)
    ) {
      return NextResponse.json({
        success: false,
        error: 'One or more member fields exceed maximum allowed character length.'
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
    return NextResponse.json({ success: false, error: 'Failed to join team. Please try again.' }, { status: 500 });
  }
}
