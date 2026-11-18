import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Builder Pass & Arena Badge | KAIROS 2027',
  description: 'Official digital QR identity badge and entry pass for KAIROS 2027 shortlisted builders at Central Library & Campus Bays, Sathyabama Institute.',
};

export default function PassLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

