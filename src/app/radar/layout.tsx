import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Builder Radar & Squad Matchmaking | KAIROS 2027',
  description: 'Solo or duo builder? Broadcast your stack and find teammates to form a 3 to 6 member squad for KAIROS 2027.',
  alternates: { canonical: '/radar' },
};

export default function RadarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
