import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentAdminSession } from '@/lib/auth';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';

export async function GET(req: NextRequest) {
  const rateLimitResult = checkRateLimit(req, { limit: 30, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code') || searchParams.get('referralCode');

  // Single referral code lookup
  if (code) {
    const lead = db.getReferralByCode(code.trim().toUpperCase());
    if (!lead) {
      return NextResponse.json({ success: false, error: 'Referral lead not found with that code.' }, { status: 404 });
    }

    const session = await getCurrentAdminSession();
    // If not admin, return a privacy-sanitized view (mask UPI ID and PII)
    if (!session) {
      const sanitizedLead = {
        id: lead.id,
        referralCode: lead.referralCode,
        companyName: lead.companyName,
        status: lead.status,
        lockExpiryDate: lead.lockExpiryDate,
        submittedAt: lead.submittedAt,
        referrerName: lead.referrerName,
        referrerCollege: lead.referrerCollege,
        referrerUpiId: lead.referrerUpiId 
          ? lead.referrerUpiId.replace(/(.{2})(.*)(@.*)/, '$1****$3')
          : undefined,
        estimatedDealTier: lead.estimatedDealTier,
      };
      return NextResponse.json({ success: true, lead: sanitizedLead });
    }

    return NextResponse.json({ success: true, lead });
  }

  // Listing all sponsor referral leads requires admin authorization to prevent scraping PII
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({
      success: false,
      error: 'Unauthorized access. Full referral lead registry requires admin authentication.'
    }, { status: 401 });
  }

  const leads = db.getReferrals();
  return NextResponse.json({ success: true, count: leads.length, leads });
}

export async function POST(req: NextRequest) {
  const rateLimitResult = checkRateLimit(req, { limit: 10, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  try {
    const body = await req.json();
    const {
      referrerName,
      referrerEmail,
      referrerPhone,
      referrerCollege,
      referrerUpiId,
      companyName,
      decisionMakerName,
      decisionMakerEmail,
      decisionMakerDesignation,
      estimatedDealTier,
      notes
    } = body;

    if (!referrerName || !referrerEmail || !referrerUpiId || !companyName || !decisionMakerName || !decisionMakerEmail) {
      return NextResponse.json({
        success: false,
        error: 'Missing mandatory fields: referrerName, referrerEmail, referrerUpiId, companyName, decisionMakerName, and decisionMakerEmail.'
      }, { status: 400 });
    }

    // Input length validation
    if (
      referrerName.length > 150 ||
      referrerEmail.length > 254 ||
      (referrerPhone && referrerPhone.length > 50) ||
      (referrerCollege && referrerCollege.length > 200) ||
      referrerUpiId.length > 100 ||
      companyName.length > 200 ||
      decisionMakerName.length > 150 ||
      decisionMakerEmail.length > 254 ||
      (decisionMakerDesignation && decisionMakerDesignation.length > 150) ||
      (notes && notes.length > 2000)
    ) {
      return NextResponse.json({
        success: false,
        error: 'One or more fields exceed maximum allowed character length.'
      }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(referrerEmail) || !emailRegex.test(decisionMakerEmail)) {
      return NextResponse.json({ success: false, error: 'Invalid email address provided.' }, { status: 400 });
    }

    const newLead = db.addReferral({
      referrerName: referrerName.trim(),
      referrerEmail: referrerEmail.trim().toLowerCase(),
      referrerPhone: referrerPhone?.trim() || '',
      referrerCollege: referrerCollege?.trim() || '',
      referrerUpiId: referrerUpiId.trim(),
      companyName: companyName.trim(),
      decisionMakerName: decisionMakerName.trim(),
      decisionMakerEmail: decisionMakerEmail.trim().toLowerCase(),
      decisionMakerDesignation: decisionMakerDesignation?.trim() || 'Leadership / Sponsor Point of Contact',
      estimatedDealTier: estimatedDealTier || 'ASSOCIATE_50K',
      notes: notes?.trim() || ''
    });

    return NextResponse.json({
      success: true,
      message: 'Referral lead registered! 21-Day lead lock activated.',
      lead: newLead
    }, { status: 201 });
  } catch (err: any) {
    console.error('[API Refer Sponsor Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to record sponsor referral.' }, { status: 500 });
  }
}
