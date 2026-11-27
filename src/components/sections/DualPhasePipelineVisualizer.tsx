'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DUAL_PHASE_PIPELINE } from '@/lib/config';
import { ArrowRight, Laptop, Video, Users, Calendar } from 'lucide-react';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { sound } from '@/lib/audio';
import { haptics } from '@/lib/haptics';

export const DualPhasePipelineVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const icons = [Laptop, Video, Users];

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-[#09090d] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Clean Left-Aligned + Stats Header */}
        <ScrollReveal direction="up" distance={16}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2.5 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block">
                Dual-Phase Merit Pipeline
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
                How You Reach the <span className="gradient-text-kairos">Grand Finale</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Two-tier technical screening evaluated strictly on working repositories, architecture clarity, and live demonstrations.
              </p>
            </div>

            <Link
              href="/schedule"
              onClick={() => sound?.playClick()}
              className="min-h-[44px] text-xs font-mono font-semibold text-slate-200 hover:text-white inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-purple-500/40 transition-colors self-start md:self-auto shrink-0 active:scale-[0.96]"
            >
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>Full 48H Timeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Clean Monochrome Stepper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {DUAL_PHASE_PIPELINE.map((stage, idx) => {
            const Icon = icons[idx];
            const isSelected = activeStep === idx;
            const isLive = stage.status === 'ACTIVE_NOW';

            return (
              <div
                key={stage.step}
                onClick={() => {
                  sound?.playClick();
                  haptics?.light();
                  setActiveStep(idx);
                }}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between h-full group select-none ${
                  isSelected
                    ? 'bg-[#13131b] border-purple-500/50 shadow-2xl shadow-purple-950/50 scale-[1.01]'
                    : 'bg-[#0d0d13] border-white/10 hover:border-white/25 hover:bg-[#101017]'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                          isSelected
                            ? 'bg-white text-slate-950 border-white shadow-md shadow-white/20'
                            : 'bg-white/[0.04] text-slate-300 border-white/10 group-hover:text-white group-hover:border-purple-500/30'
                        }`}
                      >
                        <Icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-slate-400 block">
                          {stage.step} · {stage.dates}
                        </span>
                        <h3 className="text-base font-bold text-white leading-tight">
                          {stage.title}
                        </h3>
                      </div>
                    </div>

                    {isLive && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/35 flex items-center gap-1.5 shrink-0">
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
                  <span className="text-slate-400">{stage.scale}</span>
                  {idx === 0 && (
                    <Link
                      href="/register"
                      onClick={(e) => {
                        e.stopPropagation();
                        sound?.playClick();
                      }}
                      className="min-h-[44px] px-2 text-white font-semibold hover:text-purple-300 inline-flex items-center gap-1 group/btn"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  )}
                  {idx === 1 && (
                    <Link
                      href="/online-qualifier"
                      onClick={(e) => {
                        e.stopPropagation();
                        sound?.playClick();
                      }}
                      className="min-h-[44px] px-2 text-slate-200 font-semibold hover:text-white inline-flex items-center gap-1 group/btn"
                    >
                      <span>Qualifier Spec</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  )}
                  {idx === 2 && (
                    <Link
                      href="/on-campus"
                      onClick={(e) => {
                        e.stopPropagation();
                        sound?.playClick();
                      }}
                      className="min-h-[44px] px-2 text-slate-200 font-semibold hover:text-white inline-flex items-center gap-1 group/btn"
                    >
                      <span>Venue Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
