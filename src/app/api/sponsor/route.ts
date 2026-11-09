import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentAdminSession } from '@/lib/auth';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';

export async function POST(req: NextRequest) {
  const rateLimitResult = checkRateLimit(req, { limit: 10, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  try {
    const body = await req.json();
    const { companyName, contactPerson, contactEmail, contactPhone, interestedTier, customRequirements } = body;

    if (!companyName || !contactPerson || !contactEmail || !interestedTier) {
      return NextResponse.json(
        { success: false, error: 'Company name, contact name, valid email, and partnership tier are required.' },
        { status: 400 }
      );
    }

    // Input length validation
    if (
      String(companyName).length > 150 ||
      String(contactPerson).length > 150 ||
      String(contactEmail).length > 254 ||
      (contactPhone && String(contactPhone).length > 50) ||
      (customRequirements && String(customRequirements).length > 2000)
    ) {
      return NextResponse.json(
        { success: false, error: 'One or more fields exceed maximum allowed character length.' },
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
      companyName: String(companyName).trim(),
      contactPerson: String(contactPerson).trim(),
      contactEmail: String(contactEmail).trim().toLowerCase(),
      contactPhone: contactPhone ? String(contactPhone).trim() : '',
      interestedTier,
      customRequirements: customRequirements ? String(customRequirements).trim() : ''
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
