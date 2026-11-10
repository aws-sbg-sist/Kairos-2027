import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSAT Experience Feedback | KAIROS 2027',
  description: 'Official post-event CSAT & Net Promoter Score survey for KAIROS 2027 builders and mentors.',
};

export default function CSATLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

