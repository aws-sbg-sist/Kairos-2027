'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { HeroSection } from '@/components/hero/HeroSection';
import { FactsStrip } from '@/components/sections/FactsStrip';
import { DualPhasePipelineVisualizer } from '@/components/sections/DualPhasePipelineVisualizer';
import { MissionSection } from '@/components/sections/MissionSection';
import { TracksSection } from '@/components/sections/TracksSection';
import { ScheduleSection } from '@/components/sections/ScheduleSection';
import { TeamRadarSection } from '@/components/sections/TeamRadarSection';
import { JudgingSection } from '@/components/sections/JudgingSection';
import { AwardsSection } from '@/components/sections/AwardsSection';
import { PathwaySection } from '@/components/sections/PathwaySection';
import { SponsorshipSection } from '@/components/sections/SponsorshipSection';
import { CommitteeSection } from '@/components/sections/CommitteeSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { EntranceVideoReveal } from '@/components/animation/EntranceVideoReveal';
import { WaitlistModal } from '@/components/modals/WaitlistModal';
import { ProspectusModal } from '@/components/modals/ProspectusModal';
import { TermsModal } from '@/components/modals/TermsModal';

export default function HomePage() {
  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);
  const [prospectusModalOpen, setProspectusModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [selectedTrackForWaitlist, setSelectedTrackForWaitlist] = useState<string | undefined>(undefined);
  
  // Real-time feature flags loaded from backend
  const [flags, setFlags] = useState<{
    registrationOpen: boolean;
    prizePoolConfirmed: boolean;
    demoSandboxMode: boolean;
    announcementBanner: string;
  }>({
    registrationOpen: true,
    prizePoolConfirmed: true,
    demoSandboxMode: true,
    announcementBanner: '★ NATIONAL APPLICATIONS OPEN NOW • 100% FREE (ZERO ENTRY FEE) • ₹1,75,000 PURE CASH PRIZE POOL',
  });

  useEffect(() => {
    fetch('/api/admin/flags')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.flags) {
          setFlags(data.flags);
        }
      })
      .catch(err => console.error('[FeatureFlags Fetch Error]:', err));
  }, []);

  const handleOpenWaitlistWithTrack = (trackTitle: string) => {
    setSelectedTrackForWaitlist(trackTitle);
    setWaitlistModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow">
      {/* Site Entrance Animation (KAIROS Logo Reveal) */}
      <EntranceVideoReveal />
      
      {/* Sticky Navigation Bar */}
      <Navbar onOpenWaitlist={() => setWaitlistModalOpen(true)} />

      {/* Main Single-Page Journey */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <HeroSection
          onOpenWaitlist={() => setWaitlistModalOpen(true)}
          onOpenProspectus={() => setProspectusModalOpen(true)}
        />

        {/* Facts Strip */}
        <FactsStrip />

        {/* Dual-Phase Merit Pipeline Visualizer */}
        <DualPhasePipelineVisualizer />

        {/* Why KAIROS / Mission */}
        <MissionSection />

        {/* Five Technical Tracks */}
        <TracksSection onSelectTrack={handleOpenWaitlistWithTrack} />

        {/* 48-Hour Experience & Timetable */}
        <ScheduleSection />

        {/* Builder Squad Radar & Live Matching */}
        <TeamRadarSection />

        {/* 100-Point Judging Criteria */}
        <JudgingSection />

        {/* Awards & Honors (₹1,75,000 Pure Cash Pool) */}
        <AwardsSection prizePoolConfirmed={flags.prizePoolConfirmed} />

        {/* Builder Journey & Early-Interest Registration Form */}
        <PathwaySection
          initialTrack={selectedTrackForWaitlist}
          registrationOpen={flags.registrationOpen}
        />

        {/* Sponsorship & Partnerships Matrix */}
        <SponsorshipSection onOpenProspectusModal={() => setProspectusModalOpen(true)} />

        {/* Organizing Cadre & Leadership */}
        <CommitteeSection />

        {/* FAQs */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer onOpenTerms={() => setTermsModalOpen(true)} />

      {/* Interactive Modals */}
      <WaitlistModal
        isOpen={waitlistModalOpen}
        onClose={() => setWaitlistModalOpen(false)}
        preselectedTrack={selectedTrackForWaitlist}
      />

      <ProspectusModal
        isOpen={prospectusModalOpen}
        onClose={() => setProspectusModalOpen(false)}
      />

      <TermsModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
      />
    </div>
  );
}
