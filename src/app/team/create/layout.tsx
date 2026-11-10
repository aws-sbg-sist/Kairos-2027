import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Team & Submit Abstract | KAIROS 2027',
  description: 'Register your squad name, choose an enterprise track, and submit your project abstract for KAIROS 2027.',
};

export default function CreateTeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

