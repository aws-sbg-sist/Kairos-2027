import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentAdminSession } from '@/lib/auth';

function sanitizeCSVCell(val: string | number | undefined | null): string {
  if (val === undefined || val === null) return '""';
  let str = String(val).replace(/"/g, '""');
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'` + str;
  }
  return `"${str}"`;
}

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
      sanitizeCSVCell(item.id),
      sanitizeCSVCell(item.fullName),
      sanitizeCSVCell(item.email),
      sanitizeCSVCell(item.institution),
      sanitizeCSVCell(item.yearOfStudy),
      sanitizeCSVCell(item.department),
      sanitizeCSVCell(item.preferredTrack),
      sanitizeCSVCell(item.portfolioUrl || ''),
      sanitizeCSVCell(item.createdAt)
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
      sanitizeCSVCell(s.id),
      sanitizeCSVCell(s.companyName),
      sanitizeCSVCell(s.contactPerson),
      sanitizeCSVCell(s.contactEmail),
      sanitizeCSVCell(s.contactPhone || ''),
      sanitizeCSVCell(s.interestedTier),
      sanitizeCSVCell(s.status),
      sanitizeCSVCell(s.customRequirements || ''),
      sanitizeCSVCell(s.createdAt)
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
