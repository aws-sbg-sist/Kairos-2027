import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Sans, Space_Grotesk, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { KairosChatbot } from '@/components/chatbot/KairosChatbot';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { KeyboardShortcutsModal } from '@/components/modals/KeyboardShortcutsModal';
import { MobileFloatingBar } from '@/components/navigation/MobileFloatingBar';
import { MagneticGlowCursor } from '@/components/effects/MagneticGlowCursor';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-ai',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'KAIROS 2027 — 48-Hour AWS Cloud Hackathon | Sathyabama IST',
  description: '48-hour national AWS Cloud hackathon at Sathyabama IST, Chennai. Teams of 3–6, free Round 0/R1, ₹1,75,000 prize pool & $50,000+ AWS credits.',
  keywords: [
    'KAIROS 2027',
    'KAIROS Hackathon',
    'AWS Student Builder Group SIST',
    'Sathyabama Hackathon',
    'Chennai Hackathon 2027',
    'National Technical Hackathon',
    'Agentic AI Hackathon',
    'Amazon Bedrock',
    'Distributed Systems',
    'Cloud-Native AWS',
    'Edge IoT Hackathon',
    'FinTech Hackathon'
  ],
  authors: [{ name: 'AWS Student Builder Group — SIST Chapter' }],
  metadataBase: new URL(process.env.RENDER_EXTERNAL_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://kairos.sathyabama.ac.in'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'KAIROS 2027 | Architect and Deploy Live on AWS Cloud',
    description: '48 Hours Non-Stop · ₹1,75,000 Total Prize Pool · 100 Elite Teams · Sathyabama Indoor Stadium, Chennai.',
    url: '/',
    siteName: 'KAIROS 2027 Hackathon',
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/assets/kairos-hourglass.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/assets/kairos-hourglass.png',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Hackathon',
  name: 'KAIROS 2027 | Grand Edition',
  description: 'National 48-Hour Technical Hackathon on AWS Cloud at Sathyabama Institute of Science and Technology, Chennai.',
  startDate: '2027-01-22T09:30:00+05:30',
  endDate: '2027-01-24T17:00:00+05:30',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Indoor Stadium, Sathyabama Institute of Science and Technology',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jeppiaar Nagar, Rajiv Gandhi Salai (OMR)',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      postalCode: '600119',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.8731,
      longitude: 80.2209
    }
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    validFrom: '2026-10-25T00:00:00+05:30',
    description: 'National merit-based qualification and live jury defense.'
  },
  organizer: {
    '@type': 'Organization',
    name: 'AWS Student Builder Group — SIST Chapter',
    url: process.env.RENDER_EXTERNAL_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://kairos.sathyabama.ac.in',
    parentOrganization: {
      '@type': 'EducationalOrganization',
      name: 'Sathyabama Institute of Science and Technology'
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="cyber" className={`${ibmPlexSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${plusJakarta.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-aws-canvas text-aws-snow font-sans antialiased min-h-screen ambient-cosmic-bg selection:bg-cyber-magenta/40 selection:text-white">
        <ThemeProvider>
          {/* Atmospheric Film Grain Texture */}
          <div className="kairos-grain-overlay" aria-hidden="true" />
          {/* WCAG 2.4.1 Accessible Skip Navigation */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[999] px-4 py-2 bg-gradient-to-r from-purple-700 to-purple-900 text-white font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-white transition"
          >
            Skip to main content
          </a>
          {children}
          {/* Theme-Matched Kairos Chrono-Reticle Custom Cursor & Quantum Trail */}
          <MagneticGlowCursor />
          {/* Global Mobile Quick Registration Dock & Keyboard Shortcuts HUD */}
          <MobileFloatingBar />
          <KeyboardShortcutsModal />
          {/* Floating Kairos AI Chatbot */}
          <KairosChatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
