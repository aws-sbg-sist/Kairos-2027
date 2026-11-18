import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Organizing Committee & Leads | KAIROS 2027',
  description: 'Meet the student architects and organizers behind KAIROS 2027 from AWS Student Builder Group SIST.',
};

export default function MembersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

