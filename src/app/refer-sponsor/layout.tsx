import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rainmaker Corporate Sponsor Referral | KAIROS 2027',
  description: 'Refer corporate sponsors to KAIROS 2027 and earn 10%–15% referral commission payouts (up to ₹30,000) with 21-day exclusive lead lock.',
};

export default function ReferSponsorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
