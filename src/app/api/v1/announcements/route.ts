import { NextResponse } from 'next/server';

export interface Announcement {
  id: string;
  title: string;
  category: 'SCHEDULE' | 'EVALUATION' | 'INFRASTRUCTURE' | 'LOGISTICS';
  urgency: 'HIGH' | 'MEDIUM' | 'INFO';
  date: string;
  summary: string;
  actionUrl?: string;
  actionLabel?: string;
}

const OFFICIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-01',
    title: 'Round 0 Problem Abstracts Deadline: Jan 06, 2027',
    category: 'SCHEDULE',
    urgency: 'HIGH',
    date: '2027-01-06T23:59:59+05:30',
    summary: 'Ensure your squad problem title, 300-word technical abstract, and AWS architecture diagram are submitted before the cutoff.',
    actionUrl: '/online-qualifier',
    actionLabel: 'Submit Abstract'
  },
  {
    id: 'ann-02',
    title: 'Top 250 Semi-Finalist Shortlist Declaration: Jan 10, 2027',
    category: 'EVALUATION',
    urgency: 'MEDIUM',
    date: '2027-01-10T12:00:00+05:30',
    summary: 'Jury panel evaluation of Round 0 submissions will conclude. Qualified teams advance to the 3-day Online Video & Code Defense stage.',
    actionUrl: '/tracks',
    actionLabel: 'Review Evaluation Rubric'
  },
  {
    id: 'ann-03',
    title: 'AWS Cloud Promotional Credits Dispatched for Shortlisted Squads',
    category: 'INFRASTRUCTURE',
    urgency: 'INFO',
    date: '2027-01-12T10:00:00+05:30',
    summary: 'Complimentary AWS promotional vouchers will be delivered directly to the builder dashboard for Amazon Bedrock and serverless deployment.',
    actionUrl: '/dashboard',
    actionLabel: 'Inspect Sandbox'
  },
  {
    id: 'ann-04',
    title: 'Grand Finale Check-in: Jan 22, 2027 at Sathyabama Indoor Auditorium',
    category: 'LOGISTICS',
    urgency: 'HIGH',
    date: '2027-01-22T08:00:00+05:30',
    summary: 'Campus entry starts at 08:00 AM IST. Mandatory items: Digital Participant Pass with QR code, Physical College ID, and laptop.',
    actionUrl: '/on-campus',
    actionLabel: 'Venue Map & Bus Fleet'
  }
];

export async function GET() {
  return NextResponse.json({
    success: true,
    announcements: OFFICIAL_ANNOUNCEMENTS
  });
}
