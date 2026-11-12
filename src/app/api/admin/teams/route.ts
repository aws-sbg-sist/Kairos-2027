import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveAuthContext, hasPermission } from '@/lib/rbac';
import { ParticipantTeam } from '@/types';

export async function GET(req: NextRequest) {
  try {
    const authCtx = await resolveAuthContext();
    if (authCtx.role === 'ANONYMOUS') {
      return NextResponse.json({ success: false, error: 'Unauthorized: Admin session required' }, { status: 401 });
    }

    if (!hasPermission(authCtx.role, 'teams:read_all')) {
      return NextResponse.json({
        success: false,
        error: 'Forbidden: Insufficient privileges to view team registry.',
        code: 'FORBIDDEN'
      }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const q = (searchParams.get('q') || searchParams.get('search') || '').trim().toLowerCase();
    const track = (searchParams.get('track') || 'ALL').trim();
    const stage = (searchParams.get('stage') || 'ALL').trim();
    const status = (searchParams.get('status') || 'ALL').trim();
    const missing = (searchParams.get('missing') || 'none').trim().toLowerCase();

    let teams = db.getTeams();

    if (q) {
      teams = teams.filter(t => 
        (t.teamCode && t.teamCode.toLowerCase().includes(q)) ||
        t.teamName.toLowerCase().includes(q) ||
        (t.leaderName && t.leaderName.toLowerCase().includes(q)) ||
        (t.leaderEmail && t.leaderEmail.toLowerCase().includes(q)) ||
        (t.institutionName && t.institutionName.toLowerCase().includes(q)) ||
        (t.city && t.city.toLowerCase().includes(q)) ||
        (t.problemTitle && t.problemTitle.toLowerCase().includes(q)) ||
        (t.members && t.members.some(m => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)))
      );
    }

    if (track !== 'ALL') {
      teams = teams.filter(t => t.trackId?.toLowerCase() === track.toLowerCase());
    }

    if (stage !== 'ALL') {
      teams = teams.filter(t => (t.selectionStage || 'ROUND_0_APPLICANT') === stage);
    }

    if (status !== 'ALL') {
      teams = teams.filter(t => (t.status || 'registered').toLowerCase() === status.toLowerCase());
    }

    if (missing === 'github') {
      teams = teams.filter(t => !t.githubUrl || t.githubUrl.trim() === '');
    } else if (missing === 'loom') {
      teams = teams.filter(t => !t.loomVideoUrl || t.loomVideoUrl.trim() === '');
    } else if (missing === 'any') {
      teams = teams.filter(t => !t.githubUrl || !t.loomVideoUrl || t.githubUrl.trim() === '' || t.loomVideoUrl.trim() === '');
    } else if (missing === 'complete') {
      teams = teams.filter(t => !!t.githubUrl && !!t.loomVideoUrl && t.githubUrl.trim() !== '' && t.loomVideoUrl.trim() !== '');
    }

    return NextResponse.json({
      success: true,
      count: teams.length,
      teams
    });
  } catch (err: any) {
    console.error('[API Admin Teams GET Error]:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const authCtx = await resolveAuthContext();
    if (authCtx.role === 'ANONYMOUS') {
      return NextResponse.json({ success: false, error: 'Unauthorized: Admin session required' }, { status: 401 });
    }

    if (!hasPermission(authCtx.role, 'teams:manage')) {
      return NextResponse.json({
        success: false,
        error: 'Forbidden: Insufficient privileges to update teams.',
        code: 'FORBIDDEN'
      }, { status: 403 });
    }

    const body = await req.json();
    const identifier = body.teamCode || body.teamId || body.id;

    if (!identifier) {
      return NextResponse.json({
        success: false,
        error: 'Team identifier (teamCode, teamId, or id) is required.'
      }, { status: 400 });
    }

    const organizerName = authCtx.adminSession?.organizerName || 'Admin Organizer';
    const updates: Partial<ParticipantTeam> = {};

    if (body.selectionStage !== undefined) {
      const allowedStages = ['ROUND_0_APPLICANT', 'ONLINE_SEMI_FINALIST', 'ON_CAMPUS_QUALIFIED', 'DISQUALIFIED'];
      if (!allowedStages.includes(body.selectionStage)) {
        return NextResponse.json({
          success: false,
          error: `Invalid selectionStage. Allowed: ${allowedStages.join(', ')}`
        }, { status: 400 });
      }
      updates.selectionStage = body.selectionStage;
    }

    if (body.status !== undefined) updates.status = body.status;
    if (body.deskBayAllocation !== undefined) updates.deskBayAllocation = body.deskBayAllocation;
    if (body.awsCreditVoucher !== undefined) updates.awsCreditVoucher = body.awsCreditVoucher;
    if (body.githubUrl !== undefined) updates.githubUrl = body.githubUrl;
    if (body.loomVideoUrl !== undefined) updates.loomVideoUrl = body.loomVideoUrl;
    if (body.teamName !== undefined) updates.teamName = body.teamName;
    if (body.trackId !== undefined) updates.trackId = body.trackId;
    if (body.problemTitle !== undefined) updates.problemTitle = body.problemTitle;
    if (body.problemAbstract !== undefined) updates.problemAbstract = body.problemAbstract;

    if (body.reviewerNotes !== undefined) {
      updates.reviewerNotes = body.reviewerNotes;
      updates.reviewedBy = organizerName;
      updates.reviewedAt = new Date().toISOString();
    }

    if (body.checkedIn !== undefined) {
      updates.checkedIn = Boolean(body.checkedIn);
      if (updates.checkedIn) {
        updates.checkedInAt = new Date().toISOString();
        updates.checkedInBy = organizerName;
      }
    }

    const result = db.updateTeamAdmin(identifier, updates, organizerName);
    if (!result.success || !result.team) {
      return NextResponse.json({ success: false, error: result.error || 'Failed to update team' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Team ${result.team.teamCode || result.team.teamName} updated successfully`,
      team: result.team
    });
  } catch (err: any) {
    console.error('[API Admin Teams PATCH Error]:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
