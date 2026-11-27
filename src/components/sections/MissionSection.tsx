'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Maximize2, X, Building2, FileText, Download } from 'lucide-react';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { KineticText } from '@/components/animation/KineticText';
import { SpotlightCard } from '@/components/animation/SpotlightCard';
import { sound } from '@/lib/audio';
import { haptics } from '@/lib/haptics';

export const MissionSection: React.FC = () => {
  const [activeVisual, setActiveVisual] = useState<'arena' | 'brochure'>('arena');
  const [brochureZoomed, setBrochureZoomed] = useState(false);

  const specs = [
    { key: '01 · Format', val: '48 Hours Non-Stop On-Campus Sprint' },
    { key: '02 · Venue', val: 'Indoor Stadium, Sathyabama IST (Chennai)' },
    { key: '03 · Squad Cap', val: '100 National Teams · 3 to 6 Builders Each' },
    { key: '04 · Entry Fee', val: 'Free Round 0 & R1 · Nominal Fee for R2 Finalists' },
    { key: '05 · Welfare', val: '7 Catered Meals, Midnight Drops & Bus Fleet' },
    { key: '06 · IP Charter', val: '100% Student Ownership · Zero Equity Claimed' },
  ];

  return (
    <section id="mission" className="relative py-16 lg:py-24 overflow-hidden bg-[#07070b] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Clean Editorial Header */}
        <ScrollReveal direction="up" distance={16}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2.5 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-300/90 block">
                Official Campus Edition · Category-1 University (NAAC A++)
              </span>
              <KineticText
                text="Built for Working Systems. Engineered at Sathyabama."
                highlightWords={['Sathyabama.']}
                className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight"
              />
            </div>

            {/* Sliding Layout-Animated View Switcher: Arena Photo vs Official Brochure */}
            <div className="inline-flex p-1 rounded-xl bg-[#0d0d13] border border-white/15 text-xs font-mono self-start md:self-auto shrink-0 relative">
              {[
                { id: 'arena' as const, label: 'Arena Floor', icon: Building2 },
                { id: 'brochure' as const, label: 'Official Brochure', icon: FileText },
              ].map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeVisual === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      sound?.playClick();
                      haptics?.light();
                      setActiveVisual(tab.id);
                    }}
                    className={`relative min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-colors z-10 ${
                      isActive ? 'text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="mission-tab-pill"
                        transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                        className="absolute inset-0 rounded-lg bg-white shadow-md -z-10"
                      />
                    )}
                    <TabIcon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Asymmetric Visual Showcase (7 cols) + Hairline Technical Spec Sheet (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: High-Contrast Spotlight Photograph / Official Event Brochure */}
          <ScrollReveal direction="left" distance={20} className="lg:col-span-7">
            <SpotlightCard
              enableTilt={true}
              maxTilt={3}
              spotlightColor="rgba(238, 5, 242, 0.14)"
              borderColor="rgba(238, 5, 242, 0.38)"
              cursorLabel={activeVisual === 'brochure' ? 'EXPAND' : 'ARENA'}
              className="border border-white/15 bg-black group"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                {/* HUD Frame Overlay Reticles */}
                <div className="pointer-events-none absolute top-3 left-3 z-20 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-slate-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-beacon" />
                  <span>{activeVisual === 'arena' ? 'SATHYABAMA INDOOR STADIUM · LIVE FLOOR' : 'OFFICIAL BROCHURE BRIEF'}</span>
                </div>

                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    activeVisual === 'arena' ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                  }`}
                >
                  <Image
                    key="arena-floor-img"
                    src="/assets/visuals/arena-stage.jpg"
                    alt="Sathyabama Indoor Stadium Hackathon Floor"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                <div
                  className={`absolute inset-0 transition-opacity duration-300 bg-black ${
                    activeVisual === 'brochure' ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                  }`}
                >
                  <Image
                    key="official-brochure-img"
                    src="/assets/kairos-brochure.jpg"
                    alt="Official KAIROS 2027 Hackathon Brochure"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-contain bg-black p-1"
                  />
                  <button
                    type="button"
                    data-cursor-label="ZOOM"
                    onClick={() => {
                      sound?.playClick();
                      setBrochureZoomed(true);
                    }}
                    className="min-h-[44px] absolute bottom-3 right-3 px-3.5 py-2 rounded-lg bg-black/85 hover:bg-white text-white hover:text-slate-950 border border-white/25 text-xs font-mono font-semibold inline-flex items-center gap-1.5 transition-colors z-20 shine-hover"
                    aria-label="Inspect full resolution brochure"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Expand Brochure</span>
                  </button>
                </div>
              </div>
            </SpotlightCard>
          </ScrollReveal>

          {/* Right: Interactive Spec Rows */}
          <ScrollReveal direction="right" distance={20} delay={0.08} className="lg:col-span-5 space-y-6">
            <div className="divide-y divide-white/10 border-y border-white/10">
              {specs.map((row) => (
                <div
                  key={row.key}
                  className="py-3.5 px-2 -mx-2 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 transition-colors duration-200 hover:bg-white/[0.03] group/row"
                >
                  <span className="text-xs font-mono text-slate-400 group-hover/row:text-purple-300 transition-colors shrink-0">
                    {row.key}
                  </span>
                  <span className="text-sm font-medium text-white sm:text-right">
                    {row.val}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-mono">
              <a
                href="/assets/downloads/KAIROS_2027_Official_Brochure.pdf"
                download="KAIROS_2027_Official_Brochure.pdf"
                data-cursor-label="PDF"
                onClick={() => sound?.playClick()}
                className="min-h-[44px] px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white text-white hover:text-slate-950 border border-white/15 inline-flex items-center gap-1.5 font-semibold transition-colors active:scale-[0.96] shine-hover"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Brochure &amp; OD Guide (PDF)</span>
              </a>
              <a
                href="/assets/downloads/KAIROS_2027_Round0_Pitch_Template.pptx"
                download="KAIROS_2027_Round0_Pitch_Template.pptx"
                data-cursor-label="PPTX"
                onClick={() => sound?.playClick()}
                className="min-h-[44px] px-3.5 py-2 rounded-xl bg-purple-950/50 hover:bg-purple-900/75 text-purple-200 hover:text-white border border-purple-500/35 hover:border-purple-400/60 inline-flex items-center gap-1.5 font-semibold transition-colors active:scale-[0.96] shine-hover"
              >
                <Download className="w-3.5 h-3.5 text-purple-300" />
                <span>Round 0 PPT Template (.pptx)</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-1 text-xs font-mono">
              <Link
                href="/on-campus"
                className="min-h-[44px] px-1 text-slate-200 hover:text-white inline-flex items-center gap-1.5 font-semibold group link-underline-sweep"
              >
                <span>Venue Map, Bus Fleet &amp; OD Checklist</span>
                <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/rules"
                className="min-h-[44px] px-1 text-slate-400 hover:text-white inline-flex items-center gap-1.5 group link-underline-sweep"
              >
                <span>Rules &amp; Governance</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Expandable Full Brochure Lightbox with AnimatePresence */}
      <AnimatePresence>
        {brochureZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[120] bg-black/92 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setBrochureZoomed(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Official KAIROS Event Brochure"
          >
            <button
              type="button"
              onClick={() => setBrochureZoomed(false)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-slate-950 transition-colors"
              aria-label="Close brochure preview"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full max-w-5xl aspect-[16/9]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/assets/kairos-brochure.jpg"
                alt="Official KAIROS Event Brochure Full Resolution"
                fill
                className="object-contain rounded-xl border border-white/15"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
