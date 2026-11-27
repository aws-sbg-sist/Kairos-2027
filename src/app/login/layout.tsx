import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Builder Sign In | KAIROS 2027',
  description: 'Sign in to your KAIROS 2027 builder account to manage your team, Round 0 abstract, and digital arena pass.',
  alternates: { canonical: '/login' },
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
