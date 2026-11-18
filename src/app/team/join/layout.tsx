import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join an Existing Squad | KAIROS 2027',
  description: 'Enter your team invite code, verify your roster placement, and confirm your participation for KAIROS 2027.',
};

export default function JoinTeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

