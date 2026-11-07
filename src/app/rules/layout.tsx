import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Official Rules, Rubric & Guidelines | KAIROS 2027',
  description: 'Zero registration fee, 100% student IP ownership, code authenticity, and evaluation rubrics for KAIROS 2027.',
};

export default function RulesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
