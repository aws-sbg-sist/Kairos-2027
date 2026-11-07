import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corporate Sponsorship & Partnerships | KAIROS 2027',
  description: 'Download the official KAIROS 2027 Sponsorship Prospectus. Title Presenting, Co-Powered, Gold, and Track partner opportunities.',
};

export default function SponsorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
