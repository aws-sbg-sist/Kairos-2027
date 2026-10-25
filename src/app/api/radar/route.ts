import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { TeamRadarSignal } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const signals = db.getRadarSignals();
    return NextResponse.json({ success: true, signals });
  } catch (error) {
    console.error('Error fetching radar signals:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch radar signals' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { builderName, role, trackId, skills, college, seeking, contactUrl } = body;

    if (!builderName || !role || !trackId || !seeking || !contactUrl) {
      return NextResponse.json(
        { success: false, error: 'Please provide all required fields (Name, Role, Track, Seeking details, Contact URL).' },
        { status: 400 }
      );
    }

    const cleanSkills = Array.isArray(skills) 
      ? skills.map(s => String(s).trim()).filter(Boolean)
      : String(skills || '').split(',').map(s => s.trim()).filter(Boolean);

    const newSignal = db.addRadarSignal({
      builderName: String(builderName).trim(),
      role: role as TeamRadarSignal['role'],
      trackId: String(trackId).trim(),
      skills: cleanSkills.length > 0 ? cleanSkills : ['Builder'],
      college: String(college || 'Sathyabama Institute of Science and Technology').trim(),
      seeking: String(seeking).trim(),
      contactUrl: String(contactUrl).trim(),
    });

    return NextResponse.json({ success: true, signal: newSignal });
  } catch (error) {
    console.error('Error submitting radar signal:', error);
    return NextResponse.json({ success: false, error: 'Failed to broadcast beacon' }, { status: 500 });
  }
}
