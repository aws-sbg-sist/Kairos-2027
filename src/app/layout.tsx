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
  themeColor: '#0B0F19',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'KAIROS 2027 — National Flagship 48-Hour Hackathon | AWS Student Builder Group SIST',
  description: 'Join 400–600 elite developers (teams of 4–6) at Sathyabama for KAIROS 2027. 48 hours continuous non-stop hacking on AWS Cloud. 100% Free - Zero Entry Fee. ₹1,75,000 pure cash prizes, two-tier technical screening, and tier-1 corporate sponsors. Register for free now!',
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
  metadataBase: new URL('https://kairos.sathyabama.ac.in'),
  openGraph: {
    title: 'KAIROS 2027 | The Defining Moment to Build on AWS Cloud',
    description: '48 Hours Non-Stop • ₹1,75,000 Pure Cash Prize Pool • 100 Elite Teams • Sathyabama Institute of Science and Technology, Chennai.',
    url: 'https://kairos.sathyabama.ac.in',
    siteName: 'Kairos 2027 Hackathon',
    images: [
      {
        url: '/assets/kairos-wordmark.png',
        width: 1200,
        height: 630,
        alt: 'Kairos 2027 Grand Edition Banner',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KAIROS 2027 — Build the Future in 48 Hours',
    description: '100% Free National Hackathon. ₹1,75,000 Pure Cash. Free Meals, Swag, and Travel Support.',
    creator: '@awssbg_sist',
  },
  icons: {
    icon: '/assets/kairos-hourglass.png',
    shortcut: '/assets/kairos-hourglass.png',
    apple: '/assets/kairos-hourglass.png',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Hackathon',
  name: 'KAIROS 2027 | Grand Edition',
  description: 'Where Architecture Meets Execution. 48-Hour National Technical Hackathon at Sathyabama Institute of Science and Technology, Chennai.',
  startDate: '2027-01-22T09:30:00+05:30',
  endDate: '2027-01-24T17:00:00+05:30',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Central Library & Campus Bays, Sathyabama Institute of Science and Technology',
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
    description: 'Zero registration fee. 100% free merit-based qualification.'
  },
  organizer: {
    '@type': 'Organization',
    name: 'AWS Student Builder Group — SIST Chapter',
    url: 'https://kairos.sathyabama.ac.in',
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
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-aws-canvas text-aws-snow font-sans antialiased min-h-screen ambient-cosmic-bg selection:bg-aws-orange selection:text-white">
        {children}
      </body>
    </html>
  );
}
