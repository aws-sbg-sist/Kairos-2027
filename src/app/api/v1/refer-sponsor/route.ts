import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code') || searchParams.get('referralCode');

  if (code) {
    const lead = db.getReferralByCode(code.trim().toUpperCase());
    if (!lead) {
      return NextResponse.json({ success: false, error: 'Referral lead not found with that code.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, lead });
  }

  const leads = db.getReferrals();
  return NextResponse.json({ success: true, count: leads.length, leads });
}

export async function POST(req: NextRequest) {
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
