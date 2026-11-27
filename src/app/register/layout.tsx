import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register Team | KAIROS 2027',
  description: 'Register your 3 to 6 member engineering squad free for Round 0 & Round 1 of KAIROS 2027. ₹1,75,000 cash prizes and $50,000+ AWS credits.',
  alternates: { canonical: '/register' },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

