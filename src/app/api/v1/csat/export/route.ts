import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveAuthContext, hasPermission } from '@/lib/rbac';

export async function GET() {
  const authCtx = await resolveAuthContext();
  if (authCtx.role === 'ANONYMOUS') {
    return NextResponse.json({
      success: false,
      error: 'Unauthorized. Valid organizer administrator session is required to export CSAT survey feedback.'
    }, { status: 401 });
  }

  if (!hasPermission(authCtx.role, 'csat:export')) {
    return NextResponse.json({
      success: false,
      error: 'Forbidden: Super Administrator privileges required to export CSAT survey feedback.',
      code: 'FORBIDDEN_SUPER_ADMIN_REQUIRED'
    }, { status: 403 });
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
