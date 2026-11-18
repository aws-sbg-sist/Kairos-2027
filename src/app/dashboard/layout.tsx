import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Builder Dashboard | KAIROS 2027',
  description: 'Personal builder dashboard for KAIROS 2027 participants. Access mentorship slots, AWS credit claims, and submission milestones.',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

