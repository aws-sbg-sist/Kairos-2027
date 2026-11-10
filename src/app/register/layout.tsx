import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register Team (100% Free) | KAIROS 2027',
  description: 'Register your 4 to 6 member engineering squad for KAIROS 2027. Zero entry fee, ₹1,75,000 cash prizes, free accommodation, food, and AWS cloud credits.',
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

