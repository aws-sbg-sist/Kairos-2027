import type { Metadata, Viewport } from 'next';
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#070712',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'KAIROS 2027 | Grand Edition — National Technical Hackathon',
  description: 'Where Innovation Meets Its Moment. 48-Hour National Technical Hackathon at Sathyabama Indoor Stadium, Chennai (22–24 January 2027). Organized by AWS Student Builder Group (SIST Chapter). Free ₹0 registration, 75 elite teams, 5 technical tracks.',
  keywords: [
    'KAIROS 2027',
    'KAIROS Hackathon',
    'AWS Student Builder Group SIST',
    'Sathyabama Hackathon',
    'Chennai Hackathon 2027',
    'National Technical Hackathon',
    'Agentic AI Hackathon',
    'Distributed Systems',
    'Web3 Security',
    'FinTech Hackathon'
  ],
  authors: [{ name: 'AWS Student Builder Group - SIST Chapter' }],
  metadataBase: new URL('https://kairos2027.in'),
  openGraph: {
    title: 'KAIROS 2027 | Grand Edition — National Technical Hackathon',
    description: '48 Hours. 75 Elite Teams. Where Innovation Meets Its Moment. 22–24 January 2027 · Sathyabama Indoor Stadium, Chennai.',
    url: 'https://kairos2027.in',
    siteName: 'KAIROS 2027',
    images: [
      {
        url: '/assets/kairos-wordmark.png',
        width: 1200,
        height: 630,
        alt: 'KAIROS 2027 Grand Edition Hackathon Banner',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KAIROS 2027 | Grand Edition — National Technical Hackathon',
    description: 'Where Innovation Meets Its Moment. 48 Hours to Build What Comes Next. 22–24 Jan 2027 · Chennai.',
    images: ['/assets/kairos-wordmark.png'],
  },
  icons: {
    icon: '/assets/kairos-hourglass.png',
    shortcut: '/assets/kairos-hourglass.png',
    apple: '/assets/kairos-hourglass.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} dark`}>
      <body className="bg-kairos-bg text-slate-100 font-sans antialiased min-h-screen ambient-cosmic-bg selection:bg-purple-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
