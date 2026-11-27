'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DUAL_PHASE_PIPELINE } from '@/lib/config';
import { ArrowRight, Laptop, Video, Users, Calendar } from 'lucide-react';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { KineticText } from '@/components/animation/KineticText';
import { SpotlightCard } from '@/components/animation/SpotlightCard';
import { sound } from '@/lib/audio';
import { haptics } from '@/lib/haptics';

export const DualPhasePipelineVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const icons = [Laptop, Video, Users];

  return (
    <section id="pipeline" className="relative py-16 lg:py-24 overflow-hidden bg-[#09090d] border-t border-white/10">
      {/* Subtle Ambient Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Clean Left-Aligned + Stats Header */}
        <ScrollReveal direction="up" distance={16}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2.5 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-300/90 block">
                Dual-Phase Merit Pipeline
              </span>
              <KineticText
                text="How You Reach the Grand Finale"
                highlightWords={['Grand', 'Finale']}
                className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight"
              />
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Two-tier technical screening evaluated strictly on working repositories, architecture clarity, and live demonstrations.
              </p>
            </div>

            <Link
              href="/schedule"
              data-cursor-label="AGENDA"
              onClick={() => sound?.playClick()}
              className="min-h-[44px] text-xs font-mono font-semibold text-slate-200 hover:text-white inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-purple-500/45 transition-colors self-start md:self-auto shrink-0 active:scale-[0.96] shine-hover group"
            >
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>Full 48H Timeline</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Animated Horizontal Flow Connector (Desktop Only) */}
        <div className="hidden md:block relative mb-6 px-12" aria-hidden="true">
          <div className="h-[2px] w-full bg-white/10 rounded-full relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-cyber-magenta to-sky-400 animate-data-packet" />
          </div>
          <div className="grid grid-cols-3 absolute inset-x-12 -top-[5px]">
            {DUAL_PHASE_PIPELINE.map((stage, idx) => (
              <div key={stage.step} className="flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    sound?.playClick();
                    setActiveStep(idx);
                  }}
                  aria-label={`Select ${stage.step}`}
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    activeStep === idx
                      ? 'bg-cyber-magenta border-white scale-125 shadow-[0_0_12px_#ee05f2]'
                      : 'bg-[#09090d] border-purple-500/50 hover:border-purple-300'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Spotlight Stepper Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {DUAL_PHASE_PIPELINE.map((stage, idx) => {
            const Icon = icons[idx];
            const isSelected = activeStep === idx;
            const isLive = stage.status === 'ACTIVE_NOW';

            return (
              <ScrollReveal key={stage.step} direction="up" distance={18} delay={idx * 0.08} className="h-full">
                <SpotlightCard
                  enableTilt={true}
                  maxTilt={4}
                  spotlightColor={isSelected ? 'rgba(238, 5, 242, 0.18)' : 'rgba(118, 48, 217, 0.14)'}
                  borderColor={isSelected ? 'rgba(238, 5, 242, 0.55)' : 'rgba(255, 255, 255, 0.16)'}
                  cursorLabel={isSelected ? 'ACTIVE' : 'SELECT'}
                  onClick={() => {
                    sound?.playClick();
                    haptics?.light();
                    setActiveStep(idx);
                  }}
                  className={`p-6 border cursor-pointer flex flex-col justify-between h-full group select-none transition-colors duration-300 ${
                    isSelected
                      ? 'bg-[#141221] border-purple-500/55 shadow-2xl shadow-purple-950/50'
                      : 'bg-[#0d0d13] border-white/10 hover:bg-[#101017]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="pipeline-active-border"
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                      className="pointer-events-none absolute top-0 inset-x-6 h-[2px] rounded-full bg-gradient-to-r from-cyber-magenta via-purple-400 to-sky-400"
                    />
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                            isSelected
                              ? 'bg-gradient-to-br from-white to-purple-100 text-slate-950 border-white shadow-md shadow-purple-500/30'
                              : 'bg-white/[0.04] text-slate-300 border-white/10 group-hover:text-white group-hover:border-purple-500/40'
                          }`}
                        >
                          <Icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                        </div>
                        <div>
                          <span className="text-[11px] font-mono text-purple-300/90 block">
                            {stage.step} · {stage.dates}
                          </span>
                          <h3 className="text-base font-bold text-white leading-tight group-hover:text-purple-100 transition-colors">
                            {stage.title}
                          </h3>
                        </div>
                      </div>

                      {isLive && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-beacon" />
                          LIVE
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 group-hover:text-slate-300 transition-colors">{stage.scale}</span>
                    {idx === 0 && (
                      <Link
                        href="/register"
                        data-cursor-label="APPLY"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound?.playClick();
                        }}
                        className="min-h-[44px] px-2 text-white font-semibold hover:text-purple-300 inline-flex items-center gap-1 group/btn link-underline-sweep"
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    )}
                    {idx === 1 && (
                      <Link
                        href="/online-qualifier"
                        data-cursor-label="SPEC"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound?.playClick();
                        }}
                        className="min-h-[44px] px-2 text-slate-200 font-semibold hover:text-white inline-flex items-center gap-1 group/btn link-underline-sweep"
                      >
                        <span>Qualifier Spec</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    )}
                    {idx === 2 && (
                      <Link
                        href="/on-campus"
                        data-cursor-label="GUIDE"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound?.playClick();
                        }}
                        className="min-h-[44px] px-2 text-slate-200 font-semibold hover:text-white inline-flex items-center gap-1 group/btn link-underline-sweep"
                      >
                        <span>Venue Guide</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
