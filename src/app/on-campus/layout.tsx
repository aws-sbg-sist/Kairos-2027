import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'On-Campus Logistics & Venue Guide | KAIROS 2027',
  description: 'Complete on-campus logistics, venue maps, hostel accommodation, bus routes, security, and food arrangements at Sathyabama Central Library Complex.',
};

export default function OnCampusLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

