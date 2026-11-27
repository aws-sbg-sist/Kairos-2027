import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'On-Campus Logistics & Venue Guide | KAIROS 2027',
  description: 'Complete on-campus logistics, venue maps, campus transit buses, security, and complimentary meal schedules at Sathyabama Indoor Stadium.',
  alternates: { canonical: '/on-campus' },
};

export default function OnCampusLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

