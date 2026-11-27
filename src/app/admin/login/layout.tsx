import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Console Login | KAIROS 2027',
  description: 'Organizer and administrator authentication console for KAIROS 2027 event operations.',
  alternates: { canonical: '/admin/login' },
  robots: { index: false, follow: false },
};

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

