import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveAuthContext, hasPermission } from '@/lib/rbac';
import { Judge } from '@/types';

export async function GET(req: NextRequest) {
  try {
    const authCtx = await resolveAuthContext();
    if (authCtx.role === 'ANONYMOUS') {
      return NextResponse.json({ success: false, error: 'Unauthorized: Admin session required' }, { status: 401 });
    }

    if (!hasPermission(authCtx.role, 'judges:manage')) {
      return NextResponse.json({
        success: false,
        error: 'Forbidden: Insufficient privileges to manage judges.',
        code: 'FORBIDDEN'
      }, { status: 403 });
    }

    const judges = db.getJudges();
    const evaluations = db.getEvaluations();

    const judgesWithStats = judges.map(j => {
      const judgeEvals = evaluations.filter(e => e.judgeId === j.id);
      return {
        ...j,
        evaluationCount: judgeEvals.length,
        averageZScore: judgeEvals.length > 0 
          ? Number((judgeEvals.reduce((acc, e) => acc + (e.normalizedZScore || 0), 0) / judgeEvals.length).toFixed(3))
          : 0
      };
    });

    return NextResponse.json({
      success: true,
      count: judgesWithStats.length,
      judges: judgesWithStats
    });
  } catch (err: any) {
    console.error('[API Admin Judges GET Error]:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authCtx = await resolveAuthContext();
    if (authCtx.role === 'ANONYMOUS') {
      return NextResponse.json({ success: false, error: 'Unauthorized: Admin session required' }, { status: 401 });
    }

    if (!hasPermission(authCtx.role, 'judges:manage')) {
      return NextResponse.json({
        success: false,
        error: 'Forbidden: Insufficient privileges to create judges.',
        code: 'FORBIDDEN'
      }, { status: 403 });
    }

    const body = await req.json();
    const { fullName, organization, designation, trackSpecialization, assignedHall, accessPin, isActive, assignedTracks } = body;

    if (!fullName || !organization || !designation) {
      return NextResponse.json({
        success: false,
        error: 'Full name, organization, and designation are required fields.'
      }, { status: 400 });
    }

    const organizerName = authCtx.adminSession?.organizerName || 'Admin Organizer';
    const newJudge = db.addJudge({
      fullName: fullName.trim(),
      organization: organization.trim(),
      designation: designation.trim(),
      trackSpecialization: trackSpecialization?.trim() || 'General Evaluation',
      assignedHall: assignedHall?.trim() || 'Auditorium Bay 1',
      accessPin: accessPin?.trim() || String(Math.floor(100000 + Math.random() * 900000)),
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      assignedTracks: Array.isArray(assignedTracks) ? assignedTracks : []
    }, organizerName);

    return NextResponse.json({
      success: true,
      message: `Judge identity created for ${newJudge.fullName}`,
      judge: newJudge
    }, { status: 201 });
  } catch (err: any) {
    console.error('[API Admin Judges POST Error]:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const authCtx = await resolveAuthContext();
    if (authCtx.role === 'ANONYMOUS') {
      return NextResponse.json({ success: false, error: 'Unauthorized: Admin session required' }, { status: 401 });
    }

    if (!hasPermission(authCtx.role, 'judges:manage')) {
      return NextResponse.json({
        success: false,
        error: 'Forbidden: Insufficient privileges to update judges.',
        code: 'FORBIDDEN'
      }, { status: 403 });
    }

    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Judge id is required.' }, { status: 400 });
    }

    const organizerName = authCtx.adminSession?.organizerName || 'Admin Organizer';
    const updated = db.updateJudge(id, updates, organizerName);

    if (!updated) {
      return NextResponse.json({ success: false, error: `Judge ${id} not found.` }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Judge ${updated.fullName} updated successfully`,
      judge: updated
    });
  } catch (err: any) {
    console.error('[API Admin Judges PATCH Error]:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authCtx = await resolveAuthContext();
    if (authCtx.role === 'ANONYMOUS') {
      return NextResponse.json({ success: false, error: 'Unauthorized: Admin session required' }, { status: 401 });
    }

    if (!hasPermission(authCtx.role, 'judges:manage')) {
      return NextResponse.json({
        success: false,
        error: 'Forbidden: Insufficient privileges to delete judges.',
        code: 'FORBIDDEN'
      }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    let id = searchParams.get('id');

    if (!id) {
      try {
        const body = await req.json();
        id = body.id;
      } catch {
        // query param fallback
      }
    }

    if (!id) {
      return NextResponse.json({ success: false, error: 'Judge id is required.' }, { status: 400 });
    }

    const organizerName = authCtx.adminSession?.organizerName || 'Admin Organizer';
    const removed = db.deleteJudge(id, organizerName);

    if (!removed) {
      return NextResponse.json({ success: false, error: `Judge ${id} not found.` }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Judge ${id} removed from evaluation roster.`
    });
  } catch (err: any) {
    console.error('[API Admin Judges DELETE Error]:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
