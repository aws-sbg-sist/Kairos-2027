'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DUAL_PHASE_PIPELINE } from '@/lib/config';
import { Calendar, ArrowRight } from 'lucide-react';
import { sound } from '@/lib/audio';

export const DualPhasePipelineVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="relative py-16 lg:py-24 bg-[#090A0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Left-Aligned & Direct */}
        <div className="max-w-2xl mb-12 space-y-3 text-left">
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            How you reach the grand finale.
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            From initial abstract screening to 100 on-campus finalists. A two-tier technical selection process evaluated on architecture diagrams, code repositories, and working demos.
          </p>
        </div>

        {/* 3 Step Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {DUAL_PHASE_PIPELINE.map((stage, idx) => {
            const isSelected = activeStep === idx;
            return (
              <div
                key={stage.step}
                onClick={() => {
                  sound?.playClick();
                  setActiveStep(idx);
                }}
                className={`p-6 rounded-lg cursor-pointer transition-colors duration-150 flex flex-col justify-between h-full border ${
                  isSelected
                    ? 'bg-[#181B23] border-[#FF9900]/50'
                    : 'bg-[#12141A] border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
                    <span>{stage.step}</span>
                    {stage.status === 'ACTIVE_NOW' && (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        ACTIVE
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {stage.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#FF9900]" />
                      {stage.dates}
                    </span>
                    <span>•</span>
                    <span>{stage.scale}</span>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400">
                    {idx === 0 ? 'Online Submission' : idx === 1 ? 'Live Video Review' : 'Sathyabama Campus'}
                  </span>
                  <span className="font-mono text-[#FF9900] font-semibold">
                    {stage.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
