import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sanitizeCsvCell } from '@/lib/csv';
import { resolveAuthContext, hasPermission } from '@/lib/rbac';

export async function GET(req: NextRequest) {
  const authCtx = await resolveAuthContext();
  if (authCtx.role === 'ANONYMOUS') {
    return NextResponse.json({ success: false, error: 'Unauthorized: Admin session required' }, { status: 401 });
  }

  if (!hasPermission(authCtx.role, 'waitlist:export')) {
    return NextResponse.json({
      success: false,
      error: 'Forbidden: Super Administrator privileges required for mass participant data export.',
      code: 'FORBIDDEN_SUPER_ADMIN_REQUIRED'
    }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const type = (searchParams.get('type') || 'waitlist').toLowerCase();
  const dateStr = new Date().toISOString().split('T')[0];

  // 1. Waitlist
  if (type === 'waitlist') {
    const list = await db.getWaitlist();
    const headers = ['ID', 'Full Name', 'Email', 'Institution', 'Year', 'Department', 'Track', 'Portfolio', 'Status', 'Registered At'];
    const rows = list.map(item => [
      sanitizeCsvCell(item.id),
      sanitizeCsvCell(item.fullName),
      sanitizeCsvCell(item.email),
      sanitizeCsvCell(item.institution),
      sanitizeCsvCell(item.yearOfStudy),
      sanitizeCsvCell(item.department),
      sanitizeCsvCell(item.preferredTrack),
      sanitizeCsvCell(item.portfolioUrl || ''),
      sanitizeCsvCell(item.status || 'pending'),
      sanitizeCsvCell(item.createdAt)
    ]);

    const csvContent = [headers.map(sanitizeCsvCell).join(','), ...rows.map(r => r.join(','))].join('\n');
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="KAIROS_2027_Waitlist_${dateStr}.csv"`
      }
    });
  }

  // 2. Participants (All registered student builders)
  if (type === 'participants') {
    const teams = await db.getTeams();
    const headers = ['Student ID', 'Full Name', 'Email', 'Phone', 'Institution', 'Department', 'Year', 'T-Shirt Size', 'Role', 'Team Code', 'Team Name', 'Confirmed'];
    const rows: string[][] = [];

    // Collect all unique members from teams
    teams.forEach(t => {
      (t.members || []).forEach(m => {
        rows.push([
          sanitizeCsvCell(m.id),
          sanitizeCsvCell(m.name),
          sanitizeCsvCell(m.email),
          sanitizeCsvCell(m.phone || ''),
          sanitizeCsvCell(m.college || t.institutionName || ''),
          sanitizeCsvCell(m.collegeRegNo || ''),
          sanitizeCsvCell(''),
          sanitizeCsvCell(m.tshirtSize || ''),
          sanitizeCsvCell(m.role),
          sanitizeCsvCell(t.teamCode || t.id),
          sanitizeCsvCell(t.teamName),
          sanitizeCsvCell(m.confirmed ? 'YES' : 'NO')
        ]);
      });
    });

    const csvContent = [headers.map(sanitizeCsvCell).join(','), ...rows.map(r => r.join(','))].join('\n');
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="KAIROS_2027_Participants_${dateStr}.csv"`
      }
    });
  }

  // 3. Teams
  if (type === 'teams') {
    const teams = await db.getTeams();
    const headers = [
      'Team Code', 'Team Name', 'Track', 'Leader Name', 'Leader Email', 
      'Institution', 'City', 'State', 'Roster Count', 'Selection Stage', 
      'Status', 'Desk Bay', 'Checked In', 'Checked In At', 'Checked In By', 'Registered At'
    ];
    const rows = teams.map(t => [
      sanitizeCsvCell(t.teamCode || t.id),
      sanitizeCsvCell(t.teamName),
      sanitizeCsvCell(t.trackId),
      sanitizeCsvCell(t.leaderName || (t.members?.[0]?.name) || ''),
      sanitizeCsvCell(t.leaderEmail),
      sanitizeCsvCell(t.institutionName || ''),
      sanitizeCsvCell(t.city || ''),
      sanitizeCsvCell(t.state || ''),
      sanitizeCsvCell(t.members ? t.members.length : 0),
      sanitizeCsvCell(t.selectionStage || 'ROUND_0_APPLICANT'),
      sanitizeCsvCell(t.status || 'registered'),
      sanitizeCsvCell(t.deskBayAllocation || 'Unassigned'),
      sanitizeCsvCell(t.checkedIn ? 'YES' : 'NO'),
      sanitizeCsvCell(t.checkedInAt || ''),
      sanitizeCsvCell(t.checkedInBy || ''),
      sanitizeCsvCell(t.createdAt)
    ]);

    const csvContent = [headers.map(sanitizeCsvCell).join(','), ...rows.map(r => r.join(','))].join('\n');
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="KAIROS_2027_Teams_${dateStr}.csv"`
      }
    });
  }

  // 4. Team Members
  if (type === 'team-members') {
    const teams = await db.getTeams();
    const headers = ['Team Code', 'Team Name', 'Member Name', 'Email', 'Phone', 'College Reg No', 'Role', 'College', 'T-Shirt Size', 'Confirmed'];
    const rows: string[][] = [];

    teams.forEach(t => {
      (t.members || []).forEach(m => {
        rows.push([
          sanitizeCsvCell(t.teamCode || t.id),
          sanitizeCsvCell(t.teamName),
          sanitizeCsvCell(m.name),
          sanitizeCsvCell(m.email),
          sanitizeCsvCell(m.phone || ''),
          sanitizeCsvCell(m.collegeRegNo || ''),
          sanitizeCsvCell(m.role),
          sanitizeCsvCell(m.college || t.institutionName || ''),
          sanitizeCsvCell(m.tshirtSize || ''),
          sanitizeCsvCell(m.confirmed ? 'YES' : 'NO')
        ]);
      });
    });

    const csvContent = [headers.map(sanitizeCsvCell).join(','), ...rows.map(r => r.join(','))].join('\n');
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="KAIROS_2027_Team_Members_${dateStr}.csv"`
      }
    });
  }

  // 5. Abstracts
  if (type === 'abstracts') {
    const teams = await db.getTeams();
    const headers = ['Team Code', 'Team Name', 'Track', 'Problem Title', 'Problem Abstract', 'Architecture PDF', 'Reviewer Notes', 'Reviewed By', 'Reviewed At', 'Selection Stage'];
    const rows = teams.map(t => [
      sanitizeCsvCell(t.teamCode || t.id),
      sanitizeCsvCell(t.teamName),
      sanitizeCsvCell(t.trackId),
      sanitizeCsvCell(t.problemTitle || ''),
      sanitizeCsvCell(t.problemAbstract || ''),
      sanitizeCsvCell(t.architecturePdfUrl || ''),
      sanitizeCsvCell(t.reviewerNotes || ''),
      sanitizeCsvCell(t.reviewedBy || ''),
      sanitizeCsvCell(t.reviewedAt || ''),
      sanitizeCsvCell(t.selectionStage || 'ROUND_0_APPLICANT')
    ]);

    const csvContent = [headers.map(sanitizeCsvCell).join(','), ...rows.map(r => r.join(','))].join('\n');
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="KAIROS_2027_Abstracts_${dateStr}.csv"`
      }
    });
  }

  // 6. Submissions
  if (type === 'submissions') {
    const teams = await db.getTeams();
    const headers = ['Team Code', 'Team Name', 'Track', 'Leader Email', 'GitHub Repository', 'Loom Video URL', 'Selection Stage', 'Desk Bay'];
    const rows = teams.map(t => [
      sanitizeCsvCell(t.teamCode || t.id),
      sanitizeCsvCell(t.teamName),
      sanitizeCsvCell(t.trackId),
      sanitizeCsvCell(t.leaderEmail),
      sanitizeCsvCell(t.githubUrl || ''),
      sanitizeCsvCell(t.loomVideoUrl || ''),
      sanitizeCsvCell(t.selectionStage || 'ROUND_0_APPLICANT'),
      sanitizeCsvCell(t.deskBayAllocation || 'Unassigned')
    ]);

    const csvContent = [headers.map(sanitizeCsvCell).join(','), ...rows.map(r => r.join(','))].join('\n');
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="KAIROS_2027_Submissions_${dateStr}.csv"`
      }
    });
  }

  // 7. Evaluations
  if (type === 'evaluations') {
    const evals = await db.getEvaluations();
    const headers = ['Evaluation ID', 'Team ID', 'Judge ID', 'Checkpoint Gate', 'Criterion 1 Score', 'Criterion 2 Score', 'Criterion 3 Score', 'Criterion 4 Score', 'Raw Total Score', 'Normalized Z-Score', 'Evaluated At'];
    const rows = evals.map(e => [
      sanitizeCsvCell(e.id),
      sanitizeCsvCell(e.teamId),
      sanitizeCsvCell(e.judgeId),
      sanitizeCsvCell(`Gate ${e.checkpointGate}`),
      sanitizeCsvCell(e.criterion1Score),
      sanitizeCsvCell(e.criterion2Score),
      sanitizeCsvCell(e.criterion3Score),
      sanitizeCsvCell(e.criterion4Score),
      sanitizeCsvCell(e.rawTotalScore),
      sanitizeCsvCell(e.normalizedZScore),
      sanitizeCsvCell(e.evaluatedAt)
    ]);

    const csvContent = [headers.map(sanitizeCsvCell).join(','), ...rows.map(r => r.join(','))].join('\n');
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="KAIROS_2027_Evaluations_${dateStr}.csv"`
      }
    });
  }

  // 8. Sponsors
  if (type === 'sponsors') {
    const sponsors = await db.getSponsors();
    const headers = ['ID', 'Company', 'Contact Person', 'Email', 'Phone', 'Tier', 'Status', 'Requirements', 'Received At'];
    const rows = sponsors.map(s => [
      sanitizeCsvCell(s.id),
      sanitizeCsvCell(s.companyName),
      sanitizeCsvCell(s.contactPerson),
      sanitizeCsvCell(s.contactEmail),
      sanitizeCsvCell(s.contactPhone || ''),
      sanitizeCsvCell(s.interestedTier),
      sanitizeCsvCell(s.status),
      sanitizeCsvCell(s.customRequirements || ''),
      sanitizeCsvCell(s.createdAt)
    ]);

    const csvContent = [headers.map(sanitizeCsvCell).join(','), ...rows.map(r => r.join(','))].join('\n');
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="KAIROS_2027_Sponsors_${dateStr}.csv"`
      }
    });
  }

  return NextResponse.json({ 
    success: false, 
    error: `Unknown export type "${type}". Supported types: waitlist, participants, teams, team-members, abstracts, submissions, evaluations, sponsors.` 
  }, { status: 400 });
}
