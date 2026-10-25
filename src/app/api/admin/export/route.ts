import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentAdminSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'waitlist';

  if (type === 'waitlist') {
    const list = db.getWaitlist();
    const headers = ['ID', 'Full Name', 'Email', 'Institution', 'Year', 'Department', 'Track', 'Portfolio', 'Registered At'];
    const rows = list.map(item => [
      item.id,
      `"${item.fullName.replace(/"/g, '""')}"`,
      `"${item.email.replace(/"/g, '""')}"`,
      `"${item.institution.replace(/"/g, '""')}"`,
      `"${item.yearOfStudy}"`,
      `"${item.department.replace(/"/g, '""')}"`,
      `"${item.preferredTrack.replace(/"/g, '""')}"`,
      `"${item.portfolioUrl || ''}"`,
      item.createdAt
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
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
      s.id,
      `"${s.companyName.replace(/"/g, '""')}"`,
      `"${s.contactPerson.replace(/"/g, '""')}"`,
      `"${s.contactEmail.replace(/"/g, '""')}"`,
      `"${s.contactPhone || ''}"`,
      `"${s.interestedTier}"`,
      `"${s.status}"`,
      `"${(s.customRequirements || '').replace(/"/g, '""')}"`,
      s.createdAt
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="KAIROS_2027_Sponsors_${new Date().toISOString().split('T')[0]}.csv"`
      }
    });
  }

  return NextResponse.json({ success: false, error: 'Unknown export type' }, { status: 400 });
}
