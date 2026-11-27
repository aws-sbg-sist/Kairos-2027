import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '48-Hour Schedule & Checkpoints | KAIROS 2027',
  description: 'Hour-by-hour timetable, Round 0 & R1 deadlines, technical checkpoints, meals, and bus dispersal at Sathyabama Indoor Stadium.',
  alternates: { canonical: '/schedule' },
};

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
