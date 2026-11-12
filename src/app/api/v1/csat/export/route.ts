import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentAdminSession } from '@/lib/auth';

export async function GET() {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({
      success: false,
      error: 'Unauthorized. Valid organizer administrator session is required to export CSAT survey feedback.'
    }, { status: 401 });
  }

  try {
    const csvContent = db.exportCSATCSV();

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="kairos_2027_aws_sbg_csat_export.csv"',
      },
    });
  } catch (err: any) {
    console.error('[API CSAT Export Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to export CSAT CSV.' }, { status: 500 });
  }
}
