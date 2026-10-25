import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentAdminSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { companyName, contactPerson, contactEmail, contactPhone, interestedTier, customRequirements } = body;

    if (!companyName || !contactPerson || !contactEmail || !interestedTier) {
      return NextResponse.json(
        { success: false, error: 'Company name, contact name, valid email, and partnership tier are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid corporate or contact email.' },
        { status: 400 }
      );
    }

    const inquiry = db.addSponsorInquiry({
      companyName: companyName.trim(),
      contactPerson: contactPerson.trim(),
      contactEmail: contactEmail.trim().toLowerCase(),
      contactPhone: contactPhone?.trim() || '',
      interestedTier,
      customRequirements: customRequirements?.trim() || ''
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your partnership inquiry has been registered. Our sponsorship team will review your proposal and reply promptly.',
      inquiryId: inquiry.id
    });
  } catch (err: any) {
    console.error('[API Sponsor Error]:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to record sponsorship inquiry. Please contact sistawscc@gmail.com directly.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
  }

  const sponsors = db.getSponsors();
  return NextResponse.json({ success: true, count: sponsors.length, sponsors });
}
