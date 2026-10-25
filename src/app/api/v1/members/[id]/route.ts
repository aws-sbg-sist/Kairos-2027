import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ success: false, error: 'Member ID or username is required.' }, { status: 400 });
  }

  let member = db.getMemberByUsername(id);
  if (!member) {
    // Try matching by id
    const all = db.getMembers();
    member = all.find(m => m.id === id);
  }

  if (!member) {
    return NextResponse.json({ success: false, error: 'Member not found in organizing cadre.' }, { status: 404 });
  }

  return NextResponse.json({ success: true, member });
}
