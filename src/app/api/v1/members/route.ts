import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tier = searchParams.get('tier') || undefined;
  const division = searchParams.get('division') || undefined;
  const search = searchParams.get('search') || undefined;
  const batch = searchParams.get('batch') || undefined;

  const members = db.getMembers({ tier, division, search, batch });
  return NextResponse.json({
    success: true,
    totalCadre: 106,
    returnedCount: members.length,
    members
  });
}
