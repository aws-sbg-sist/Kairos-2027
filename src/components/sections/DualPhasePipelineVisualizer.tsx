'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { DUAL_PHASE_PIPELINE } from '@/lib/config';
import { CheckCircle2, ArrowRight, Laptop, Video, Users, Shield, Calendar, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { sound } from '@/lib/audio';
import { SpotlightCard } from '@/components/animation/SpotlightCard';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

export const DualPhasePipelineVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const icons = [Laptop, Video, Users];

  const handleNext = () => {
    sound?.playClick();
    setActiveStep((prev) => (prev + 1) % DUAL_PHASE_PIPELINE.length);
  };

  const handlePrev = () => {
    sound?.playClick();
    setActiveStep((prev) => (prev - 1 + DUAL_PHASE_PIPELINE.length) % DUAL_PHASE_PIPELINE.length);
  };

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-aws-canvas">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[350px] bg-purple-950/20 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={24}>
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-purple-300 bg-aws-squidInk/90 border border-purple-500/30 shadow-md">
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>Dual-Phase Merit Pipeline</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              How You Reach the <span className="gradient-text-kairos">Grand Finale</span>
            </h2>
            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              From 2,000+ national applicants to 100 on-campus finalists. A transparent, two-tier screening process evaluated on working code, architecture schemas, and live system demos.
            </p>
          </div>
        </ScrollReveal>

        {/* Focus Frame Stage Selector (Animation #8) */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-slate-950/80 border border-purple-500/30 backdrop-blur-md">
            {DUAL_PHASE_PIPELINE.map((stage, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={stage.step}
                  onClick={() => {
                    sound?.playClick();
                    setActiveStep(idx);
                  }}
                  className={`py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs font-mono font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 cursor-pointer min-w-0 ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-700 to-purple-900 text-white shadow-lg shadow-purple-950/50 scale-[1.02]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-[10px] opacity-75 shrink-0">{stage.step}:</span>
                  <span className="truncate w-full min-w-0 hidden sm:inline">{stage.title.split('(')[0].trim()}</span>
                  <span className="truncate w-full min-w-0 sm:hidden inline text-center">{idx === 0 ? 'Abstract' : idx === 1 ? 'Qualifier' : 'Finale'}</span>
                </button>
              );
            })}
          </div>

          {/* Stepper Navigation Arrows */}
          <div className="flex items-center justify-between px-2 pt-3 text-xs font-mono text-slate-400">
            <button
              onClick={handlePrev}
              className="inline-flex items-center gap-1 hover:text-purple-300 transition-colors p-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Stage</span>
            </button>
            <span className="text-purple-300 font-bold">
              Focus Stage 0{activeStep + 1} of 0{DUAL_PHASE_PIPELINE.length}
            </span>
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1 hover:text-purple-300 transition-colors p-1"
            >
              <span>Next Stage</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stacking Cards Focus Frame Slider Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
          style={{ perspective: '1200px' }}
        >
          {DUAL_PHASE_PIPELINE.map((stage, idx) => {
            const Icon = icons[idx];
            const isSelected = activeStep === idx;
            const distance = Math.abs(idx - activeStep);

            return (
              <motion.div
                key={stage.step}
                layout="position"
                initial={false}
                animate={{
                  scale: isSelected ? 1.03 : 0.96,
                  y: isSelected ? -8 : 4,
                  opacity: isSelected ? 1 : 0.75,
                  zIndex: isSelected ? 10 : 10 - distance,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                onClick={() => {
                  sound?.playClick();
                  setActiveStep(idx);
                }}
                className={`relative cursor-pointer transition-all ${
                  isSelected ? 'ring-2 ring-purple-500/80 rounded-2xl' : ''
                }`}
              >
                {/* Cybernetic Focus Frame Brackets on the Active Card */}
                {isSelected && (
                  <>
                    <span className="absolute -top-2.5 -left-2.5 w-5 h-5 border-t-2 border-l-2 border-purple-400 pointer-events-none z-20" />
                    <span className="absolute -top-2.5 -right-2.5 w-5 h-5 border-t-2 border-r-2 border-purple-400 pointer-events-none z-20" />
                    <span className="absolute -bottom-2.5 -left-2.5 w-5 h-5 border-b-2 border-l-2 border-purple-400 pointer-events-none z-20" />
                    <span className="absolute -bottom-2.5 -right-2.5 w-5 h-5 border-b-2 border-r-2 border-purple-400 pointer-events-none z-20" />
                  </>
                )}

                <SpotlightCard
                  enableTilt={true}
                  maxTilt={isSelected ? 6 : 3}
                  spotlightColor={isSelected ? 'rgba(238, 5, 242, 0.3)' : 'rgba(118, 48, 217, 0.12)'}
                  borderColor={isSelected ? 'rgba(238, 5, 242, 0.8)' : 'rgba(118, 48, 217, 0.25)'}
                  className={`p-6 sm:p-7 rounded-2xl transition-colors duration-300 relative flex flex-col justify-between h-full ${
                    isSelected
                      ? 'bg-aws-squidInk/95 border-2 border-purple-500 shadow-2xl shadow-purple-950/50'
                      : 'bg-aws-card/75 border border-slate-700/60 hover:border-purple-500/40 hover:bg-slate-900/90'
                  }`}
                >
                  {stage.status === 'ACTIVE_NOW' && (
                    <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 shadow-md shadow-emerald-950/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>ACTIVE NOW</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center gap-3.5 pr-24">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-colors duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-r from-purple-700 to-purple-900 text-slate-950 shadow-lg shadow-purple-900/40'
                            : 'bg-white/5 text-purple-400 border border-white/10'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span role="status" className="text-[11px] font-mono font-medium text-purple-300 block">
                          {stage.step}
                        </span>
                        <h3 className="text-base font-bold text-white leading-tight">
                          {stage.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-950/90 border border-slate-800 text-slate-300 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-purple-400" />
                        {stage.dates}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-slate-950/90 border border-slate-800 text-purple-300 font-semibold">
                        {stage.scale}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-400">
                      {stage.badge}
                    </span>
                    {idx === 0 && (
                      <Link
                        href="/register"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound?.playClick();
                        }}
                        className="text-purple-300 font-bold hover:text-white flex items-center gap-1.5 group/btn"
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    )}
                    {idx === 1 && (
                      <Link
                        href="/online-qualifier"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound?.playClick();
                        }}
                        className="text-purple-300 font-bold hover:text-white flex items-center gap-1.5 group/btn"
                      >
                        <span>Phase Details</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    )}
                    {idx === 2 && (
                      <Link
                        href="/on-campus"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound?.playClick();
                        }}
                        className="text-purple-300 font-bold hover:text-white flex items-center gap-1.5 group/btn"
                      >
                        <span>Venue Dossier</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
