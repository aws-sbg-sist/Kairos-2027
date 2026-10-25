import { NextResponse } from 'next/server';
import { generateKairosICS } from '@/lib/ics';

export async function GET() {
  const icsData = generateKairosICS();

  return new NextResponse(icsData, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="KAIROS_2027_Hackathon.ics"',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
