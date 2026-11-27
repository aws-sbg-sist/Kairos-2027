import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Organizer Command Console | KAIROS 2027',
  description: 'Protected tournament operations console for KAIROS 2027 organizing cadre.',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
