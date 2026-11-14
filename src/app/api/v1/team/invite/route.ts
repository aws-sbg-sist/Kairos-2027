import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentStudentSession } from '@/lib/student_auth';
import { getCurrentAdminSession } from '@/lib/auth';
import { verifyTeamLeader } from '@/lib/rbac';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';
import { sendTransactionalEmail, buildTeamInvitationEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  const rateLimitResult = checkRateLimit(req, { limit: 10, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  try {
    const studentSession = await getCurrentStudentSession();
    const adminSession = await getCurrentAdminSession();

    if (!studentSession && !adminSession) {
      return NextResponse.json({
        success: false,
        error: 'Authentication required. Please sign in to send invitations.',
        code: 'UNAUTHORIZED'
      }, { status: 401 });
    }

    const body = await req.json();
    const { teamCode, inviteeEmail, inviteeName } = body;

    if (!teamCode || !inviteeEmail) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: teamCode and inviteeEmail are mandatory.',
        code: 'BAD_REQUEST'
      }, { status: 400 });
    }

    const cleanEmail = inviteeEmail.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid recipient email address format.',
        code: 'INVALID_EMAIL'
      }, { status: 400 });
    }

    const team = await db.getTeamByCode(teamCode.trim().toUpperCase());
    if (!team) {
      return NextResponse.json({
        success: false,
        error: 'Team not found with the provided code.',
        code: 'NOT_FOUND'
      }, { status: 404 });
    }

    // RBAC: If student, verify leader of this team
    const teamCodeStr = team.teamCode || team.id || '';
    if (!adminSession) {
      const leaderCheck = await verifyTeamLeader(studentSession!.email, teamCodeStr);
      if (!leaderCheck.authorized) {
        return NextResponse.json({
          success: false,
          error: leaderCheck.error || 'Only the designated Team Leader can dispatch official invitations.',
          code: 'FORBIDDEN_LEADER_ONLY'
        }, { status: leaderCheck.statusCode });
      }
    }

    // Check if invitee is already on this team
    const isAlreadyMember = team.members.some(m => m.email.toLowerCase() === cleanEmail) || 
      team.leaderEmail.toLowerCase() === cleanEmail;
    if (isAlreadyMember) {
      return NextResponse.json({
        success: false,
        error: 'This builder is already registered on your team roster.',
        code: 'ALREADY_MEMBER'
      }, { status: 400 });
    }

    // Check if invitee is already in another team
    const existingTeam = await db.getStudentTeam(cleanEmail);
    if (existingTeam) {
      return NextResponse.json({
        success: false,
        error: `Builder is already registered on team "${existingTeam.teamName}". Multi-team registration is prohibited.`,
        code: 'MULTI_TEAM_FORBIDDEN'
      }, { status: 409 });
    }

    // Check maximum squad capacity (5 members)
    if (team.members.length >= 5) {
      return NextResponse.json({
        success: false,
        error: 'Team has already reached maximum squad capacity (5 members).',
        code: 'TEAM_FULL'
      }, { status: 400 });
    }

    const inviterName = studentSession ? studentSession.fullName : (adminSession?.organizerName || team.leaderName || 'Team Leader');

    // Non-blocking email dispatch
    const emailResult = await sendTransactionalEmail(buildTeamInvitationEmail({
      to: cleanEmail,
      recipientName: inviteeName?.trim() || undefined,
      inviterName,
      teamName: team.teamName || 'Kairos Squad',
      teamCode: team.teamCode || team.id || 'KAIROS-SQUAD',
      inviteCode: team.inviteCode || 'KAIROS-JOIN',
      trackName: team.trackId || 'General Track',
    }));

    return NextResponse.json({
      success: true,
      message: `Invitation successfully sent to ${cleanEmail}`,
      teamCode: team.teamCode,
      recipient: cleanEmail,
      deliveryStatus: emailResult.suppressed ? 'SUPPRESSED_DUPLICATE' : (emailResult.simulated ? 'SIMULATED' : (emailResult.success ? 'DELIVERED' : 'FAILED'))
    });
  } catch (err: any) {
    console.error('[API Team Invite Error]:', err);
    return NextResponse.json({
      success: false,
      error: 'Failed to process team invitation dispatch.',
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}
