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
import { GallerySection } from '@/components/sections/GallerySection';
import { JudgingSection } from '@/components/sections/JudgingSection';
import { AwardsSection } from '@/components/sections/AwardsSection';
import { PathwaySection } from '@/components/sections/PathwaySection';
import { SponsorshipSection } from '@/components/sections/SponsorshipSection';
import { CommitteeSection } from '@/components/sections/CommitteeSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';
import { EntranceVideoReveal } from '@/components/animation/EntranceVideoReveal';
import { MagneticGlowCursor } from '@/components/effects/MagneticGlowCursor';
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
    announcementBanner: '★ NATIONAL APPLICATIONS OPEN NOW • 100% FREE (ZERO ENTRY FEE) • ₹1,75,000 TOTAL PRIZE POOL',
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
    <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow relative overflow-x-hidden">
      {/* Desktop Ambient Magnetic Glow Cursor */}
      <MagneticGlowCursor />

      {/* Site Entrance Animation (KAIROS Logo Reveal) */}
      <EntranceVideoReveal />
      
      {/* Sticky Navigation Bar */}
      <Navbar onOpenWaitlist={() => setWaitlistModalOpen(true)} />

      {/* Main Single-Page Journey */}
      <main id="main-content" className="flex-grow">
        
        {/* Hero Section */}
        <HeroSection
          onOpenWaitlist={() => setWaitlistModalOpen(true)}
          onOpenProspectus={() => setProspectusModalOpen(true)}
        />

        {/* Facts Strip */}
        <FactsStrip />

        {/* Dual-Phase Merit Pipeline Visualizer */}
        <DualPhasePipelineVisualizer />

        {/* Why KAIROS / Mission (About) */}
        <MissionSection />

        {/* Five Technical Tracks (Interactive Bento Grid) */}
        <TracksSection onSelectTrack={handleOpenWaitlistWithTrack} />

        {/* 48-Hour Experience & Timetable (Horizontal Timeline) */}
        <ScheduleSection />

        {/* Atmosphere & Arena Preview Gallery (Masonry + Carousel + Lightbox) */}
        <GallerySection />

        {/* Multilateral Judging Rubrics (Classified Weighting) */}
        <JudgingSection />

        {/* Awards & Honors (₹1,75,000 Total Prize Pool) */}
        <AwardsSection prizePoolConfirmed={flags.prizePoolConfirmed} />

        {/* Builder Journey & Early-Interest Registration Form */}
        <PathwaySection
          initialTrack={selectedTrackForWaitlist}
          registrationOpen={flags.registrationOpen}
        />

        {/* Sponsorship & Partnerships Matrix (with Logo Marquee) */}
        <SponsorshipSection onOpenProspectusModal={() => setProspectusModalOpen(true)} />

        {/* Organizing Cadre & Leadership */}
        <CommitteeSection />

        {/* FAQs (Categorized Tabs & Animated Accordion) */}
        <FAQSection />

        {/* Final CTA (Distinctive Closing Section with Cosmic Hourglass) */}
        <FinalCTASection />
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
