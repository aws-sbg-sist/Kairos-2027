import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AWS Cloud Resources & Starter Kits | KAIROS 2027',
  description: 'AWS Cloud Quest tournaments, Bedrock generative AI starter kits, and serverless prototypes for KAIROS 2027 builders.',
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
