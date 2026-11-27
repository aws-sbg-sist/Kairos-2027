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
import { Marquee } from '@/components/animation/Marquee';

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

        {/* Live Hackathon Telemetry Ticker */}
        <div className="relative border-y border-white/10 bg-[#07070c]/95 py-3 overflow-hidden select-none">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
          />
          <Marquee speed={30} pauseOnHover={true}>
            {[
              { tag: 'ROUND 0 OPEN', val: 'Submit Blueprint Free', dot: 'bg-emerald-400' },
              { tag: 'PRIZE POOL', val: '₹1,75,000 Cash + $50K AWS Credits', dot: 'bg-amber-400' },
              { tag: 'BUILD CLOCK', val: '48 Hours Non-Stop On-Campus', dot: 'bg-cyber-magenta' },
              { tag: 'TRACKS', val: '5 Enterprise Domains · 15 Challenges', dot: 'bg-sky-400' },
              { tag: 'SQUAD SIZE', val: '3–6 Builders per National Team', dot: 'bg-purple-400' },
              { tag: 'OWNERSHIP', val: '100% Student IP · Zero Equity', dot: 'bg-emerald-400' },
            ].map((item) => (
              <div
                key={item.tag}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-purple-400/50 transition-colors text-[11px] font-mono shrink-0"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
                <span className="text-purple-300 font-bold tracking-wider">{item.tag}</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-200">{item.val}</span>
              </div>
            ))}
          </Marquee>
        </div>

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
