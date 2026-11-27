import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentAdminSession } from '@/lib/auth';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';
import { safeParseJson } from '@/lib/http';

export async function POST(req: NextRequest) {
  const rateLimitResult = checkRateLimit(req, { limit: 10, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  const parsed = await safeParseJson(req);
  if (!parsed.ok) return parsed.response;

  try {
    const { companyName, contactPerson, contactEmail, contactPhone, interestedTier, customRequirements } = parsed.data;

    if (!companyName || !contactPerson || !contactEmail || !interestedTier || typeof companyName !== 'string' || typeof contactPerson !== 'string' || typeof contactEmail !== 'string' || typeof interestedTier !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Company name, contact name, valid email, and partnership tier are required.' },
        { status: 400 }
      );
    }

    if (
      companyName.length > 200 ||
      contactPerson.length > 150 ||
      contactEmail.length > 254 ||
      (contactPhone && String(contactPhone).length > 50) ||
      interestedTier.length > 100 ||
      (customRequirements && String(customRequirements).length > 3000)
    ) {
      return NextResponse.json(
        { success: false, error: 'One or more fields exceed maximum allowed character length.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid corporate or contact email.' },
        { status: 400 }
      );
    }

    const normalizedTierMap: Record<string, 'title' | 'powered_by' | 'gold' | 'track' | 'in_kind' | 'custom'> = {
      title: 'title',
      powered_by: 'powered_by',
      gold: 'gold',
      track: 'track',
      in_kind: 'in_kind',
      custom: 'custom',
    };
    const lowerTier = interestedTier.toLowerCase();
    const mappedTier = normalizedTierMap[lowerTier] ||
      (lowerTier.includes('title') ? 'title' :
      lowerTier.includes('powered') ? 'powered_by' :
      lowerTier.includes('gold') || lowerTier.includes('associate') ? 'gold' :
      lowerTier.includes('track') ? 'track' :
      lowerTier.includes('kind') ? 'in_kind' : 'custom');

    const inquiry = await db.addSponsorInquiry({
      companyName: companyName.trim(),
      contactPerson: contactPerson.trim(),
      contactEmail: contactEmail.trim().toLowerCase(),
      contactPhone: contactPhone ? String(contactPhone).trim() : '',
      interestedTier: mappedTier,
      customRequirements: customRequirements ? String(customRequirements).trim() : ''
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your partnership inquiry has been registered. Our sponsorship team will review your proposal and reply promptly.',
      inquiryId: inquiry.id
    }, { status: 201 });
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

  const sponsors = await db.getSponsors();
  return NextResponse.json({ success: true, count: sponsors.length, sponsors });
}
