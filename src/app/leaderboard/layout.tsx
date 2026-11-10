import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Leaderboard & Track Standings | KAIROS 2027',
  description: 'Real-time scores, track standings, jury evaluation points, and squad rankings for KAIROS 2027.',
};

export default function LeaderboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

