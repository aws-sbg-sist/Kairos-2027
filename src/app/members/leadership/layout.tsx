import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Leadership Team | KAIROS 2027',
  description: 'Executive leadership, technical directors, and core team members of AWS Student Builder Group SIST organizing KAIROS 2027.',
};

export default function LeadershipLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

