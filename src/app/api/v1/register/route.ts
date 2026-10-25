import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      fullName, 
      email, 
      phone, 
      college, 
      yearOfStudy, 
      githubUrl, 
      linkedinUrl, 
      preferredTrack, 
      teamStatus, 
      teamCode, 
      meetupProfileUrl, 
      awsBuilderCenterUrl,
      experienceLevel,
      tShirtSize 
    } = body;

    if (!fullName || !email) {
      return NextResponse.json({ 
        success: false, 
        error: 'Full name and email are mandatory fields.' 
      }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email address.' }, { status: 400 });
    }

    const result = db.addWaitlistEntry({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      institution: college?.trim() || 'SIST',
      college: college?.trim() || 'SIST',
      department: 'Computer Science & Engineering',
      yearOfStudy: yearOfStudy || '3rd Year',
      githubUrl: githubUrl?.trim() || '',
      linkedinUrl: linkedinUrl?.trim() || '',
      preferredTrack: preferredTrack || 'Agentic AI & Generative Intelligence',
      teamStatus: teamStatus || 'looking_for_team',
      teamCode: teamCode?.trim().toUpperCase(),
      meetupProfileUrl: meetupProfileUrl?.trim() || '',
      awsBuilderCenterUrl: awsBuilderCenterUrl?.trim() || '',
      experienceLevel: experienceLevel || 'Intermediate',
      tShirtSize: tShirtSize || 'L'
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error || 'Registration failed' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Registration recorded successfully! 100% Free — Zero Entry Fee.',
      registrationId: result.entry?.id,
      entry: result.entry
    }, { status: 201 });
  } catch (err: any) {
    console.error('[API Register Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to record registration.' }, { status: 500 });
  }
}
