import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account Security & Verification | KAIROS 2027',
  description: 'Builder account verification and credential recovery portal for KAIROS 2027.',
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
