import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '5 Technical Tracks | KAIROS 2027',
  description: 'Explore the 5 Enterprise Tracks at KAIROS 2027: Agentic AI, Cloud-Native, Edge IoT, FinTech, and Open Enterprise. Scalable cloud problem statements for elite student engineering teams.',
};

export default function TracksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
