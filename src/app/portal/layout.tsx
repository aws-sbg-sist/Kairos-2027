import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Builder Portal & Roster Gateway | KAIROS 2027',
  description: 'Participant portal for KAIROS 2027. Manage your squad roster, verify teammates, view submission status, and access live telemetry.',
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

