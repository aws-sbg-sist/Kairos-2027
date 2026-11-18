import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Stage & Non-Stop Schedule | KAIROS 2027',
  description: 'Live arena telemetry, non-stop hackathon schedule, real-time code commits, and stage broadcasts for KAIROS 2027.',
};

export default function StageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

