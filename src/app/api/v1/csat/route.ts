import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const responses = db.getCSAT();
  const count = responses.length;
  const avgSatisfaction = count > 0 
    ? (responses.reduce((sum, r) => sum + r.overallSatisfaction, 0) / count).toFixed(2)
    : '5.0';
  
  // Calculate Net Promoter Score: % Promoters (9-10) - % Detractors (0-6)
  const promoters = responses.filter(r => r.npsScore >= 9).length;
  const detractors = responses.filter(r => r.npsScore <= 6).length;
  const nps = count > 0 ? Math.round(((promoters - detractors) / count) * 100) : 100;

  return NextResponse.json({
    success: true,
    totalResponses: count,
    metrics: {
      averageSatisfactionScore: Number(avgSatisfaction),
      netPromoterScore: nps,
      promoterPercentage: count > 0 ? Math.round((promoters / count) * 100) : 100,
    },
    responses
  });
}

export async function POST(req: NextRequest) {
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

    if (sat < 1 || sat > 5 || nps < 0 || nps > 10) {
      return NextResponse.json({
        success: false,
        error: 'Invalid scores: overallSatisfaction must be 1-5, and npsScore must be 0-10.'
      }, { status: 400 });
    }

    const saved = db.addCSAT({
      overallSatisfaction: sat,
      npsScore: nps,
      cloudServicesUsed: Array.isArray(cloudServicesUsed) ? cloudServicesUsed : [],
      pursuingAwsCertification: pursuingAwsCertification === 'YES' || pursuingAwsCertification === 'NO' || pursuingAwsCertification === 'ALREADY_CERTIFIED' ? pursuingAwsCertification : 'YES',
      eventFeedback: eventFeedback?.trim() || '',
      testimonialQuote: testimonialQuote?.trim() || ''
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your valuable feedback! Official AWS SBG CSAT recorded.',
      csatId: saved.id
    }, { status: 201 });
  } catch (err: any) {
    console.error('[API CSAT Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to record CSAT response.' }, { status: 500 });
  }
}
