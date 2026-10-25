'use client';

import React from 'react';
import Image from 'next/image';
import { Target, Zap, Shield, HeartPulse, Compass } from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/config';

export const MissionSection: React.FC = () => {
  return (
    <section id="mission" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-950/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30">
            <Compass className="w-3.5 h-3.5 text-purple-400" />
            <span>The Decisive Moment</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Why <span className="gradient-text-kairos">KAIROS</span> Matters
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            In ancient philosophy, <em>Chronos</em> is quantitative, sequential clock time—but <strong>Kairos</strong> is the qualitative, decisive moment. The moment when knowledge, courage, and technology align to build what comes next.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1 */}
          <div className="p-8 rounded-2xl glass-panel border border-purple-500/20 hover:border-purple-500/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-purple-900/40 text-purple-300 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-display font-bold text-white">
              End-to-End Applied Engineering
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              We move far beyond superficial AI wrappers and trivial mockups. KAIROS challenges teams to design scalable distributed architectures, verify security primitives, and defend live working prototypes before industry juries.
            </p>
            <div className="pt-2 text-xs font-mono text-purple-400 flex items-center gap-1.5">
              <span>Verified Repositories & Working Code</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-2xl glass-panel border border-purple-500/20 hover:border-purple-500/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-sky-900/40 text-sky-300 flex items-center justify-center group-hover:scale-110 transition-transform">
              <HeartPulse className="w-6 h-6 text-sky-400" />
            </div>
            <h3 className="text-xl font-display font-bold text-white">
              Builder Welfare & Respect
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              We do not glorify sleep deprivation or reckless exhaustion. 48 hours of continuous operation is supported through structured team rest rotations, quiet relaxation zones, 7 principal meals, medical oversight, and continuous hydration.
            </p>
            <div className="pt-2 text-xs font-mono text-sky-400 flex items-center gap-1.5">
              <span>Voluntary Rest Rotations & Medical Care</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-2xl glass-panel border border-purple-500/20 hover:border-purple-500/40 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-indigo-900/40 text-indigo-300 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-display font-bold text-white">
              Transparent & Ethical Competition
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Zero participation fees. 100-point transparent scoring rubrics. No unannounced judging biases. Pre-event rules confirm that all code must be authored inside the 48-hour window, evaluated through rigorous checkpoints and human jury defense.
            </p>
            <div className="pt-2 text-xs font-mono text-indigo-400 flex items-center gap-1.5">
              <span>100% Merit-Based Selection</span>
            </div>
          </div>
        </div>

        {/* Institutional Host Ribbon */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900/80 to-purple-950/40 border border-purple-500/25 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src="/assets/aws-sbg-logo.png"
                alt="AWS SBG Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                AWS Student Builder Group — SIST Chapter
              </h4>
              <p className="text-xs text-slate-300">
                Department of Computer Science & Engineering · School of Computing · Sathyabama Institute of Science and Technology
              </p>
            </div>
          </div>
          <div className="text-xs font-mono text-purple-300 px-3.5 py-1.5 rounded-lg bg-purple-900/30 border border-purple-500/30 text-center">
            Approved National Event · January 2027
          </div>
        </div>
      </div>
    </section>
  );
};
