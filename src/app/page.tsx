'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { HeroSection } from '@/components/hero/HeroSection';
import { DualPhasePipelineVisualizer } from '@/components/sections/DualPhasePipelineVisualizer';
import { MissionSection } from '@/components/sections/MissionSection';
import { TracksSection } from '@/components/sections/TracksSection';
import { AwardsSection } from '@/components/sections/AwardsSection';
import { MentorsAndPartnersSection } from '@/components/sections/MentorsAndPartnersSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';
import { TermsModal } from '@/components/modals/TermsModal';

export default function HomePage() {
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  const [flags, setFlags] = useState<{
    registrationOpen: boolean;
    prizePoolConfirmed: boolean;
    demoSandboxMode: boolean;
    announcementBanner: string;
  }>({
    registrationOpen: true,
    prizePoolConfirmed: true,
    demoSandboxMode: true,
    announcementBanner: 'NATIONAL APPLICATIONS OPEN NOW • ₹1,75,000 TOTAL PRIZE POOL • SATHYABAMA CHENNAI',
  });

  useEffect(() => {
    fetch('/api/v1/flags')
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data?.success && data.flags) {
          setFlags(data.flags);
        }
      })
      .catch(err => console.error('[FeatureFlags Fetch Error]:', err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow relative overflow-x-hidden">
      <Navbar />

      <main id="main-content" className="flex-grow">
        <HeroSection />
        <DualPhasePipelineVisualizer />
        <MissionSection />
        <TracksSection />
        <AwardsSection prizePoolConfirmed={flags.prizePoolConfirmed} />
        <MentorsAndPartnersSection />
        <FAQSection />
        <FinalCTASection />
      </main>

      <Footer onOpenTerms={() => setTermsModalOpen(true)} />

      <TermsModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
      />
    </div>
  );
}
