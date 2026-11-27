import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Builder Pass & Arena Badge | KAIROS 2027',
  description: 'Official digital QR identity badge and entry pass for KAIROS 2027 shortlisted builders at Sathyabama Indoor Stadium, Chennai.',
  alternates: { canonical: '/portal/pass' },
  robots: { index: false, follow: false },
};

export default function PassLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

