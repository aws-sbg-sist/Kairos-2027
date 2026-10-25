import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendTransactionalEmail, buildWaitlistConfirmationEmail } from '@/lib/email';
import { getCurrentAdminSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, institution, yearOfStudy, department, preferredTrack, portfolioUrl, motivation } = body;

    if (!fullName || !email || !institution || !preferredTrack) {
      return NextResponse.json(
        { success: false, error: 'Full name, valid email, institution, and preferred track are required.' },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid academic or personal email address.' },
        { status: 400 }
      );
    }

    const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'Unknown';

    const result = db.addWaitlistEntry({
      fullName: fullName.trim(),
      email: email.trim(),
      institution: institution.trim(),
      yearOfStudy: yearOfStudy || 'Undergraduate',
      department: department || 'Engineering',
      preferredTrack,
      portfolioUrl: portfolioUrl?.trim() || '',
      motivation: motivation?.trim() || '',
      ipAddress: ip,
      userAgent
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 409 }
      );
    }

    // Send confirmation email (truthful delivery per prompt)
    const emailPayload = buildWaitlistConfirmationEmail(fullName, preferredTrack);
    emailPayload.to = email.trim();
    await sendTransactionalEmail(emailPayload);

    return NextResponse.json({
      success: true,
      message: 'Priority early-interest reservation confirmed!',
      entry: result.entry
    });
  } catch (err: any) {
    console.error('[API Waitlist Error]:', err);
    return NextResponse.json(
      { success: false, error: 'An unexpected server error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
  }

  const entries = db.getWaitlist();
  return NextResponse.json({ success: true, count: entries.length, waitlist: entries });
}
