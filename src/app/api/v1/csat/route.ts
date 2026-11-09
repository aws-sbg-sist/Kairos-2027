import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';
import { getCurrentAdminSession } from '@/lib/auth';

export async function GET() {
  const responses = db.getCSAT();
  const count = responses.length;
  const validResponses = responses.filter(r => Number.isFinite(r.overallSatisfaction) && Number.isFinite(r.npsScore));
  const validCount = validResponses.length;

  const avgSatisfaction = validCount > 0 
    ? (validResponses.reduce((sum, r) => sum + r.overallSatisfaction, 0) / validCount).toFixed(2)
    : '5.0';
  
  // Calculate Net Promoter Score: % Promoters (9-10) - % Detractors (0-6)
  const promoters = validResponses.filter(r => r.npsScore >= 9).length;
  const detractors = validResponses.filter(r => r.npsScore <= 6).length;
  const nps = validCount > 0 ? Math.round(((promoters - detractors) / validCount) * 100) : 100;

  const session = await getCurrentAdminSession();

  return NextResponse.json({
    success: true,
    totalResponses: count,
    metrics: {
      averageSatisfactionScore: Number(avgSatisfaction),
      netPromoterScore: nps,
      promoterPercentage: validCount > 0 ? Math.round((promoters / validCount) * 100) : 100,
    },
    // Redact raw internal IDs and unverified feedback for public consumers
    responses: session 
      ? responses 
      : responses.map(r => ({
          overallSatisfaction: r.overallSatisfaction,
          npsScore: r.npsScore,
          cloudServicesUsed: r.cloudServicesUsed,
          testimonialQuote: r.testimonialQuote,
          submittedAt: r.submittedAt
        }))
  });
}

export async function POST(req: NextRequest) {
  const rateLimitResult = checkRateLimit(req, { limit: 10, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  try {
    const body = await req.json();
    const { 
      overallSatisfaction, 
      npsScore, 
      cloudServicesUsed, 
      pursuingAwsCertification, 
      eventFeedback, 
      testimonialQuote 
    } = body;

    const sat = Number(overallSatisfaction);
    const nps = Number(npsScore);

    if (!Number.isFinite(sat) || !Number.isFinite(nps) || sat < 1 || sat > 5 || nps < 0 || nps > 10) {
      return NextResponse.json({
        success: false,
        error: 'Invalid scores: overallSatisfaction must be a number between 1 and 5, and npsScore must be a number between 0 and 10.'
      }, { status: 400 });
    }

    if (
      (eventFeedback && String(eventFeedback).length > 2000) ||
      (testimonialQuote && String(testimonialQuote).length > 500)
    ) {
      return NextResponse.json({
        success: false,
        error: 'Feedback or testimonial text exceeds maximum allowed character length.'
      }, { status: 400 });
    }

    const saved = db.addCSAT({
      overallSatisfaction: sat,
      npsScore: nps,
      cloudServicesUsed: Array.isArray(cloudServicesUsed) ? cloudServicesUsed.slice(0, 20) : [],
      pursuingAwsCertification: pursuingAwsCertification === 'YES' || pursuingAwsCertification === 'NO' || pursuingAwsCertification === 'ALREADY_CERTIFIED' ? pursuingAwsCertification : 'YES',
      eventFeedback: eventFeedback ? String(eventFeedback).trim() : '',
      testimonialQuote: testimonialQuote ? String(testimonialQuote).trim() : ''
    });

    return NextResponse.json({
      success: true,
      message: 'Participant feedback and satisfaction telemetry recorded successfully!',
      csat: saved
    }, { status: 201 });
  } catch (err: any) {
    console.error('[API CSAT Submit Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to record participant feedback.' }, { status: 500 });
  }
}
