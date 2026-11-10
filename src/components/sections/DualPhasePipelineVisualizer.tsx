'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DUAL_PHASE_PIPELINE } from '@/lib/config';
import { CheckCircle2, ArrowRight, Laptop, Video, Users, Shield, Calendar, Sparkles } from 'lucide-react';
import { sound } from '@/lib/audio';
import { SpotlightCard } from '@/components/animation/SpotlightCard';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

export const DualPhasePipelineVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const icons = [Laptop, Video, Users];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-aws-canvas">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[350px] bg-purple-950/20 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={24}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-purple-300 bg-aws-squidInk/90 border border-purple-500/30 shadow-md">
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>Dual-Phase Merit Pipeline</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              How You Reach the <span className="gradient-text-kairos">Grand Finale</span>
            </h2>
            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              From 2,000+ national applicants to 100 on-campus finalists. A transparent, two-tier screening process engineered to reward genuine technical depth.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Step Interactive Stepper */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {DUAL_PHASE_PIPELINE.map((stage, idx) => {
            const Icon = icons[idx];
            const isSelected = activeStep === idx;
            return (
              <ScrollReveal
                key={stage.step}
                direction="up"
                distance={24}
                delay={idx * 0.1}
                className="h-full"
              >
                <SpotlightCard
                  enableTilt={true}
                  maxTilt={6}
                  spotlightColor={isSelected ? 'rgba(238, 5, 242, 0.25)' : 'rgba(118, 48, 217, 0.15)'}
                  borderColor={isSelected ? 'rgba(238, 5, 242, 0.6)' : 'rgba(118, 48, 217, 0.25)'}
                  onClick={() => {
                    sound?.playClick();
                    setActiveStep(idx);
                  }}
                  className={`p-6 sm:p-7 rounded-2xl cursor-pointer transition-all duration-300 relative flex flex-col justify-between h-full ${
                    isSelected
                      ? 'bg-aws-squidInk/95 border-2 border-purple-500 shadow-2xl shadow-purple-900/30 scale-[1.02]'
                      : 'bg-aws-card/80 border border-slate-700/60 hover:border-purple-500/40 hover:bg-slate-900/90'
                  }`}
                >
                  {stage.status === 'ACTIVE_NOW' && (
                    <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>ACTIVE NOW</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/40'
                            : 'bg-white/5 text-purple-400 border border-white/10'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono font-bold text-purple-300 block uppercase">
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
                        <span>Apply Free</span>
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
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
