'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DUAL_PHASE_PIPELINE } from '@/lib/config';
import { CheckCircle2, ArrowRight, Laptop, Video, Users, Shield, Calendar } from 'lucide-react';

export const DualPhasePipelineVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const icons = [Laptop, Video, Users];

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-aws-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-amber-300 bg-aws-squidInk border border-aws-orange/30">
            <Shield className="w-3.5 h-3.5 text-aws-orange" />
            <span>Dual-Phase Merit Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            How You Reach the <span className="gradient-text-kairos">Grand Finale</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            From 2,000+ national applicants to 100 on-campus finalists. A transparent, two-tier screening process engineered to reward genuine technical depth.
          </p>
        </div>

        {/* 3 Step Interactive Stepper */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {DUAL_PHASE_PIPELINE.map((stage, idx) => {
            const Icon = icons[idx];
            const isSelected = activeStep === idx;
            return (
              <div
                key={stage.step}
                onClick={() => setActiveStep(idx)}
                className={`p-6 sm:p-7 rounded-2xl cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-aws-squidInk border-2 border-aws-orange shadow-xl shadow-aws-orange/20 scale-[1.02]'
                    : 'bg-aws-card border border-slate-700/60 hover:border-aws-orange/40 hover:bg-slate-900/80'
                }`}
              >
                {stage.status === 'ACTIVE_NOW' && (
                  <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ACTIVE NOW</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
                      isSelected ? 'bg-aws-orange text-slate-950' : 'bg-white/5 text-aws-orange border border-white/10'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-amber-300 block uppercase">
                        {stage.step}
                      </span>
                      <h3 className="text-base font-bold text-white leading-tight">
                        {stage.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-aws-orange" />
                      {stage.dates}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-amber-300 font-semibold">
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
                      className="text-amber-300 font-bold hover:text-white flex items-center gap-1"
                    >
                      <span>Apply Free</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                  {idx === 1 && (
                    <Link
                      href="/online-qualifier"
                      className="text-amber-300 font-bold hover:text-white flex items-center gap-1"
                    >
                      <span>Round 1 Bay</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                  {idx === 2 && (
                    <Link
                      href="/on-campus"
                      className="text-amber-300 font-bold hover:text-white flex items-center gap-1"
                    >
                      <span>Venue Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
