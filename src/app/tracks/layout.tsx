import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '15 Official Problem Statements | KAIROS 2027',
  description: 'Explore 15 official 48-hour hackathon problem statements across five KAIROS 2027 tracks, with full briefs and evaluation criteria.',
  alternates: { canonical: '/tracks' },
};

export default function TracksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
