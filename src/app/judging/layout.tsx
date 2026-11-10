import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Evaluation & Scoring Portal | KAIROS 2027',
  description: 'Official jury scoring console for evaluating architectures, cloud engineering, and technical execution at KAIROS 2027.',
};

export default function JudgingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

