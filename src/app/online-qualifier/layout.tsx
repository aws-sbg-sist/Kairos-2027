import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Round 1 Online Qualifier | KAIROS 2027',
  description: 'Submit your Round 1 architecture design, system diagrams, and project abstract for KAIROS 2027 online qualification.',
};

export default function OnlineQualifierLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

