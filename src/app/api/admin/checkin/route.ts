import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveAuthContext, hasPermission } from '@/lib/rbac';
import { verifyPassToken } from '@/lib/pass';

export async function GET(req: NextRequest) {
  try {
    const authCtx = await resolveAuthContext();
    if (authCtx.role === 'ANONYMOUS') {
      return NextResponse.json({ success: false, error: 'Unauthorized: Admin session required' }, { status: 401 });
    }

    if (!hasPermission(authCtx.role, 'checkin:manage')) {
      return NextResponse.json({
        success: false,
        error: 'Forbidden: Insufficient privileges to access check-in desk.',
        code: 'FORBIDDEN'
      }, { status: 403 });
    }

    const teams = db.getTeams();
    const checkedInTeams = teams.filter(t => t.checkedIn);
    const pendingTeams = teams.filter(t => !t.checkedIn && t.selectionStage !== 'DISQUALIFIED');
    const disqualifiedTeams = teams.filter(t => t.selectionStage === 'DISQUALIFIED');

    const recentCheckIns = [...checkedInTeams]
      .sort((a, b) => new Date(b.checkedInAt || 0).getTime() - new Date(a.checkedInAt || 0).getTime())
      .slice(0, 20);

    return NextResponse.json({
      success: true,
      summary: {
        totalTeams: teams.length,
        checkedInCount: checkedInTeams.length,
        pendingCount: pendingTeams.length,
        disqualifiedCount: disqualifiedTeams.length,
        checkInRate: teams.length > 0 ? Math.round((checkedInTeams.length / teams.length) * 100) : 0
      },
      recentCheckIns
    });
  } catch (err: any) {
    console.error('[API Admin Check-in GET Error]:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authCtx = await resolveAuthContext();
    if (authCtx.role === 'ANONYMOUS') {
      return NextResponse.json({ success: false, error: 'Unauthorized: Admin session required' }, { status: 401 });
    }

    if (!hasPermission(authCtx.role, 'checkin:manage')) {
      return NextResponse.json({
        success: false,
        error: 'Forbidden: Insufficient privileges to perform check-in.',
        code: 'FORBIDDEN'
      }, { status: 403 });
    }

    const body = await req.json();
    const { token, teamCode, email } = body;

    let targetIdentifier = teamCode || email;
    let verifiedParticipant: any = null;

    if (token) {
      const verification = verifyPassToken(token);
      if (!verification.valid || !verification.participant) {
        return NextResponse.json({
          success: false,
          error: verification.error || 'Cryptographic pass verification failed. Token is invalid, expired, or tampered.'
        }, { status: 400 });
      }

      verifiedParticipant = verification.participant;
      targetIdentifier = verification.team?.teamCode || verification.participant.email;
    }

    if (!targetIdentifier) {
      return NextResponse.json({
        success: false,
        error: 'Scan a participant QR token or provide a Team Code / Email address.'
      }, { status: 400 });
    }

    const organizerName = authCtx.adminSession?.organizerName || 'Admin Organizer';
    const result = db.checkInTeam(targetIdentifier, organizerName);

    if (result.alreadyCheckedIn) {
      return NextResponse.json({
        success: false,
        alreadyCheckedIn: true,
        error: result.message,
        team: result.team,
        participant: verifiedParticipant
      }, { status: 409 });
    }

    if (!result.success || !result.team) {
      return NextResponse.json({
        success: false,
        error: result.error || 'Check-in validation failed.'
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      team: result.team,
      participant: verifiedParticipant
    });
  } catch (err: any) {
    console.error('[API Admin Check-in POST Error]:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
