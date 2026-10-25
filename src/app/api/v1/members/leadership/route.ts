import { NextResponse } from 'next/server';
import { HIGHER_MANAGEMENT } from '@/lib/config';
import { db } from '@/lib/db';

export async function GET() {
  const higherManagementMembers = db.getMembers().filter(m => m.isHigherManagement);

  return NextResponse.json({
    success: true,
    batch: HIGHER_MANAGEMENT.batchTitle,
    leadership: HIGHER_MANAGEMENT,
    roster: higherManagementMembers
  });
}
