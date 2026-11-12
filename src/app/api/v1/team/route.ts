import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';
import { getCurrentAdminSession } from '@/lib/auth';
import { getCurrentStudentSession } from '@/lib/student_auth';
import { verifyTeamLeader } from '@/lib/rbac';
import { TECHNICAL_TRACKS } from '@/lib/config';

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

  // 1. Enforce Registration Open / Deadline Feature Flags
  const flags = db.getFeatureFlags();
  if (!flags.registrationOpen) {
    return NextResponse.json({
      success: false,
      error: 'Team registration is currently closed by the organizing committee.',
      code: 'REGISTRATION_CLOSED'
    }, { status: 403 });
  }

  if (flags.registrationDeadline) {
    const deadline = new Date(flags.registrationDeadline).getTime();
    if (!isNaN(deadline) && Date.now() > deadline) {
      return NextResponse.json({
        success: false,
        error: 'Team registration deadline has passed. New team creations are locked.',
        code: 'REGISTRATION_DEADLINE_EXCEEDED'
      }, { status: 403 });
    }
  }

  try {
    const body = await req.json();
    const { 
      teamName, 
      trackId, 
      abstractTitle, 
      abstractText, 
      cloudArchitectureBlueprint, 
      lead 
    } = body;

    // Support both nested lead object and flat leader properties
    const leadName = lead?.fullName || body.leaderName;
    const leadEmail = (lead?.email || body.leaderEmail || '').trim().toLowerCase();
    const leadPhone = lead?.phone || body.leaderPhone || '';
    const leadCollegeRegNo = lead?.registerNo || body.leaderCollegeRegNo || '';
    const leadCollege = lead?.college || body.institutionName || 'SIST';
    const leadCity = body.city || 'Chennai';
    const leadState = body.state || 'Tamil Nadu';
    const leadMeetupUrl = lead?.meetupProfileUrl || body.leaderMeetupUrl || '';
    const leadMeetupVerified = lead?.meetupVerified ?? body.meetupVerified ?? true;
    const leadAwsUrl = lead?.awsBuilderCenterUrl || body.leaderAwsBuilderCenterUrl || '';
    const title = abstractTitle || body.problemTitle;
    const text = abstractText || body.problemAbstract;
    const blueprint = cloudArchitectureBlueprint || body.architecturePdfUrl || '';
    const github = lead?.githubUrl || body.githubUrl || '';

    if (!teamName || !trackId || !title || !text || !leadName || !leadEmail) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: teamName, trackId, problemTitle, problemAbstract, leaderName, leaderEmail are mandatory.' 
      }, { status: 400 });
    }

    // Input length validation
    if (
      teamName.length > 100 ||
      trackId.length > 50 ||
      title.length > 200 ||
      text.length > 3000 ||
      leadName.length > 150 ||
      leadEmail.length > 254 ||
      leadPhone.length > 50 ||
      leadCollegeRegNo.length > 50 ||
      leadMeetupUrl.length > 300 ||
      leadAwsUrl.length > 300 ||
      blueprint.length > 500 ||
      github.length > 300
    ) {
      return NextResponse.json({
        success: false,
        error: 'One or more fields exceed maximum allowed character length.'
      }, { status: 400 });
    }

    // Abstract word count validation (maximum 300 words)
    const wordCount = text.trim().split(/\s+/).length;
    if (wordCount > 300) {
      return NextResponse.json({
        success: false,
        error: `Project abstract exceeds maximum 300 words (provided: ${wordCount} words).`
      }, { status: 400 });
    }

    // Track ID validation
    const validTracks = TECHNICAL_TRACKS.map(t => t.id);
    const trackExists = validTracks.includes(trackId) || validTracks.some(vt => vt.includes(trackId) || trackId.includes(vt));
    if (!trackExists) {
      return NextResponse.json({
        success: false,
        error: `Invalid track selected: ${trackId}. Must be a valid KAIROS 2027 technical track.`
      }, { status: 400 });
    }

    // Multi-team membership prevention: Builder cannot lead or join multiple teams
    const existingTeam = db.getStudentTeam(leadEmail);
    if (existingTeam) {
      return NextResponse.json({
        success: false,
        error: `Builder is already registered on team "${existingTeam.teamName}". Event regulations strictly prohibit multi-team registration.`,
        code: 'MULTI_TEAM_FORBIDDEN'
      }, { status: 409 });
    }

    const newTeam = db.createTeam({
      teamName: teamName.trim(),
      trackId: trackId.trim(),
      institutionName: leadCollege.trim(),
      city: leadCity.trim(),
      state: leadState.trim(),
      leaderName: leadName.trim(),
      leaderEmail: leadEmail,
      leaderPhone: leadPhone.trim(),
      leaderCollegeRegNo: leadCollegeRegNo.trim(),
      leaderMeetupUrl: leadMeetupUrl.trim(),
      leaderAwsBuilderCenterUrl: leadAwsUrl.trim(),
      problemTitle: title.trim(),
      problemAbstract: text.trim(),
      architecturePdfUrl: blueprint.trim(),
      githubUrl: github.trim(),
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
    const msg = err.message || 'Failed to create team. Please try again.';
    const statusCode = msg.includes('already registered') ? 409 : 500;
    return NextResponse.json({ success: false, error: msg }, { status: statusCode });
  }
}

export async function PUT(req: NextRequest) {
  const rateLimitResult = checkRateLimit(req, { limit: 10, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  // Enforce Registration Open / Deadline Feature Flags
  const flags = db.getFeatureFlags();
  if (!flags.registrationOpen) {
    return NextResponse.json({
      success: false,
      error: 'Team registration is currently closed by the organizing committee.',
      code: 'REGISTRATION_CLOSED'
    }, { status: 403 });
  }

  if (flags.registrationDeadline) {
    const deadline = new Date(flags.registrationDeadline).getTime();
    if (!isNaN(deadline) && Date.now() > deadline) {
      return NextResponse.json({
        success: false,
        error: 'Team registration deadline has passed. Joining teams is currently closed.',
        code: 'REGISTRATION_DEADLINE_EXCEEDED'
      }, { status: 403 });
    }
  }

  try {
    const body = await req.json();
    const { teamCode, member } = body;

    if (!teamCode || !member?.fullName && !member?.name || !member?.email) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: teamCode, member.fullName, member.email are mandatory.' 
      }, { status: 400 });
    }

    const memberName = member.fullName || member.name;
    const memberEmail = member.email.trim().toLowerCase();

    // Input length validation
    if (
      teamCode.length > 50 ||
      memberName.length > 150 ||
      memberEmail.length > 254 ||
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

    // Multi-team check: ensure member is not already in another squad
    const existingTeam = db.getStudentTeam(memberEmail);
    if (existingTeam) {
      const cleanCode = teamCode.trim().toUpperCase();
      if (
        (existingTeam.teamCode && existingTeam.teamCode.toUpperCase() === cleanCode) ||
        existingTeam.id.toUpperCase() === cleanCode ||
        existingTeam.inviteCode.toUpperCase() === cleanCode
      ) {
        return NextResponse.json({
          success: false,
          error: 'A member with this email is already on this team roster.',
          code: 'DUPLICATE_MEMBERSHIP'
        }, { status: 400 });
      }
      return NextResponse.json({
        success: false,
        error: `Builder is already registered on team "${existingTeam.teamName}". Event regulations strictly prohibit multi-team registration.`,
        code: 'MULTI_TEAM_FORBIDDEN'
      }, { status: 409 });
    }

    const roleMapping: 'Frontend' | 'Backend' | 'AI / Cloud' | 'UI/UX' = 
      member.role === 'Frontend' || member.role === 'Backend' || member.role === 'AI / Cloud' || member.role === 'UI/UX'
        ? member.role
        : 'Backend';

    const joinResult = db.joinTeam(teamCode.trim().toUpperCase(), {
      name: memberName.trim(),
      email: memberEmail,
      phone: member.phone?.trim() || '',
      college: member.college?.trim() || 'SIST',
      collegeRegNo: member.registerNo?.trim() || member.collegeRegNo?.trim() || '',
      role: roleMapping,
      meetupProfileUrl: member.meetupProfileUrl?.trim() || '',
      awsBuilderCenterUrl: member.awsBuilderCenterUrl?.trim() || '',
      tshirtSize: member.tShirtSize || member.tshirtSize || 'L',
    });

    if (!joinResult.success) {
      const statusCode = joinResult.error?.includes('already registered') ? 409 : 400;
      return NextResponse.json({ success: false, error: joinResult.error }, { status: statusCode });
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

export async function PATCH(req: NextRequest) {
  try {
    const studentSession = await getCurrentStudentSession();
    if (!studentSession) {
      return NextResponse.json({
        success: false,
        error: 'Authentication required. Please sign in to edit team details.',
        code: 'UNAUTHORIZED'
      }, { status: 401 });
    }

    const body = await req.json();
    const { teamCode, teamName, trackId, problemTitle, problemAbstract, architecturePdfUrl, githubUrl } = body;

    if (!teamCode) {
      return NextResponse.json({ success: false, error: 'Team code is required.' }, { status: 400 });
    }

    // RBAC: Verify that the caller is the authorized Team Leader
    const leaderCheck = verifyTeamLeader(studentSession.email, teamCode);
    if (!leaderCheck.authorized) {
      return NextResponse.json({
        success: false,
        error: leaderCheck.error || 'Only the designated Team Leader can edit team details.',
        code: leaderCheck.statusCode === 404 ? 'TEAM_NOT_FOUND' : 'FORBIDDEN_LEADER_ONLY'
      }, { status: leaderCheck.statusCode });
    }

    if (problemAbstract) {
      const wordCount = problemAbstract.trim().split(/\s+/).length;
      if (wordCount > 300) {
        return NextResponse.json({
          success: false,
          error: `Project abstract exceeds maximum 300 words (provided: ${wordCount} words).`
        }, { status: 400 });
      }
    }

    const updateResult = db.updateTeamDetails(teamCode, {
      teamName,
      trackId,
      problemTitle,
      problemAbstract,
      architecturePdfUrl,
      githubUrl
    });

    if (!updateResult.success) {
      return NextResponse.json({ success: false, error: updateResult.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Team details successfully updated!',
      team: updateResult.team
    });
  } catch (err: any) {
    console.error('[API Team Patch Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to update team details.' }, { status: 500 });
  }
}
