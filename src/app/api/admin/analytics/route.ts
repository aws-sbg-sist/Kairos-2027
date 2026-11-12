import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveAuthContext, hasPermission } from '@/lib/rbac';

export async function GET(req: NextRequest) {
  try {
    const authCtx = await resolveAuthContext();
    if (authCtx.role === 'ANONYMOUS') {
      return NextResponse.json({ success: false, error: 'Unauthorized: Admin session required' }, { status: 401 });
    }

    if (!hasPermission(authCtx.role, 'teams:read_all') && !hasPermission(authCtx.role, 'waitlist:read')) {
      return NextResponse.json({
        success: false,
        error: 'Forbidden: Insufficient privileges to view administrative analytics.',
        code: 'FORBIDDEN'
      }, { status: 403 });
    }

    const analytics = db.getAdminAnalytics();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      analytics
    });
  } catch (err: any) {
    console.error('[API Admin Analytics GET Error]:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
