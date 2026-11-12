import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveAuthContext, hasPermission } from '@/lib/rbac';

export async function GET() {
  const flags = db.getFeatureFlags();
  return NextResponse.json({ success: true, flags });
}

export async function POST(req: NextRequest) {
  const authCtx = await resolveAuthContext();
  if (authCtx.role === 'ANONYMOUS') {
    return NextResponse.json({ success: false, error: 'Unauthorized: Admin session required' }, { status: 401 });
  }

  if (!hasPermission(authCtx.role, 'flags:update')) {
    return NextResponse.json({
      success: false,
      error: 'Forbidden: Super Administrator privileges required to modify system feature flags.',
      code: 'FORBIDDEN_SUPER_ADMIN_REQUIRED'
    }, { status: 403 });
  }

  try {
    const updates = await req.json();
    const updaterName = authCtx.adminSession?.organizerName || 'Super Administrator';
    const newFlags = db.setFeatureFlags(updates, updaterName);
    return NextResponse.json({ success: true, flags: newFlags });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Failed to update feature flags' }, { status: 500 });
  }
}
