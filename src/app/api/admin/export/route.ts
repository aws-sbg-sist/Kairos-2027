import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sanitizeCsvCell } from '@/lib/auth';
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
  const type = searchParams.get('type') || 'waitlist';

  if (type === 'waitlist') {
    const list = db.getWaitlist();
    const headers = ['ID', 'Full Name', 'Email', 'Institution', 'Year', 'Department', 'Track', 'Portfolio', 'Registered At'];
    const rows = list.map(item => [
      sanitizeCsvCell(item.id),
      sanitizeCsvCell(item.fullName),
      sanitizeCsvCell(item.email),
      sanitizeCsvCell(item.institution),
      sanitizeCsvCell(item.yearOfStudy),
      sanitizeCsvCell(item.department),
      sanitizeCsvCell(item.preferredTrack),
      sanitizeCsvCell(item.portfolioUrl || ''),
      sanitizeCsvCell(item.createdAt)
    ]);

    const csvContent = [headers.map(sanitizeCsvCell).join(','), ...rows.map(r => r.join(','))].join('\n');
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="KAIROS_2027_Waitlist_${new Date().toISOString().split('T')[0]}.csv"`
      }
    });
  }

  if (type === 'sponsors') {
    const sponsors = db.getSponsors();
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
        'Content-Disposition': `attachment; filename="KAIROS_2027_Sponsors_${new Date().toISOString().split('T')[0]}.csv"`
      }
    });
  }

  return NextResponse.json({ success: false, error: 'Unknown export type' }, { status: 400 });
}
