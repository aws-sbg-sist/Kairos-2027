'use client';

import React from 'react';
import Image from 'next/image';
import { Compass, Sparkles, Clock, Zap, ShieldCheck } from 'lucide-react';
import { SpotlightCard } from '@/components/animation/SpotlightCard';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { KineticText } from '@/components/animation/KineticText';

export const MissionSection: React.FC = () => {
  return (
    <section id="mission" className="relative py-24 lg:py-32 overflow-hidden bg-aws-canvas">
      {/* Decorative cosmic background glow */}
      <div className="absolute top-1/2 left-0 w-[550px] h-[550px] bg-purple-950/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-purple-950/40 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <ScrollReveal direction="down" distance={16}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30 shadow-md">
              <Compass className="w-3.5 h-3.5 text-purple-400" />
              <span>The Decisive Moment</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Why <span className="gradient-text-kairos">KAIROS</span> Matters
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.2}>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              In classical thought, <em>Chronos</em> is quantitative, passive clock time. <strong>Kairos</strong> is the qualitative, decisive moment where vision, courage, and engineering intersect.
            </p>
          </ScrollReveal>
        </div>

        {/* Editorial Split Storytelling Layout (Chronos vs Kairos) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-20">
          {/* Chronos Column (Left, 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <ScrollReveal direction="right" distance={30} className="h-full">
              <div className="p-8 sm:p-10 rounded-3xl bg-slate-950/70 border border-slate-800/80 h-full flex flex-col justify-between space-y-6 relative overflow-hidden group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold  text-slate-400 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>The Chronos Reality</span>
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                      Sequential Clock Time
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-slate-200">
                    Typical Hackathons: The Tired Hustle
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    Most events celebrate sleep deprivation over architecture, encourage unverified Figma prototypes, and reward presentation flair instead of functional systems. Clock ticks down, code breaks, and prototypes vanish into forgotten repositories.
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                    <span>Sleep deprivation glorified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                    <span>Shallow AI wrappers & vaporware</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                    <span>Opaque judging with zero feedback</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Kairos Column (Right, 7 cols - Elevated Heroic Card) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <ScrollReveal direction="left" distance={30} delay={0.15} className="h-full">
              <SpotlightCard
                spotlightColor="rgba(238, 5, 242, 0.22)"
                borderColor="rgba(238, 5, 242, 0.5)"
                className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-aws-squidInk/95 via-purple-950/40 to-slate-950 border-2 border-purple-500/40 h-full flex flex-col justify-between space-y-6 relative overflow-hidden shadow-2xl"
              >
                {/* Glowing Aura Motif */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-950/50 blur-3xl pointer-events-none rounded-full" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold  text-purple-400 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-400" />
                      <span>The Kairos Standard</span>
                    </span>
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/40 font-bold">
                      The Right Architectural Moment
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                    Where Systems Are Engineered to Withstand Reality
                  </h3>

                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    KAIROS 2027 turns the 48-hour pressure cooker into a showcase of real distributed systems, verified repositories, and live jury defenses. We support builders with dedicated rest areas, 7 chef-curated meals, and high-concurrency cloud environments.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-purple-500/20 text-xs font-mono relative z-10">
                  <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-500/30 text-purple-200">
                    <span className="block text-white font-bold mb-0.5">100% Free Entry</span>
                    <span className="text-[11px] text-slate-400">Zero entry or kit fees</span>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-500/30 text-purple-200">
                    <span className="block text-white font-bold mb-0.5">Total Prize Pool ₹1.75L</span>
                    <span className="text-[11px] text-slate-400">Direct wire transfers</span>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-500/30 text-purple-200">
                    <span className="block text-white font-bold mb-0.5">Builder Welfare</span>
                    <span className="text-[11px] text-slate-400">7 meals, rest rotations</span>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </div>

        {/* 3 Pillars Grid with 3D Spotlight Tilt & Visual Assets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1: Applied Engineering (innov.png) */}
          <ScrollReveal direction="up" distance={24} delay={0.1} className="h-full">
            <SpotlightCard
              spotlightColor="rgba(118, 48, 217, 0.25)"
              borderColor="rgba(118, 48, 217, 0.45)"
              className="p-8 rounded-2xl glass-panel border border-purple-500/20 hover:border-purple-500/50 transition-colors space-y-5 flex flex-col justify-between h-full group"
            >
              <div className="space-y-4">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src="/assets/innov.png"
                    alt="Applied Engineering Innovation"
                    fill
                    className="object-contain filter drop-shadow-md"
                  />
                </div>
                <h3 className="text-xl font-display font-bold text-white group-hover:text-purple-200 transition-colors">
                  End-to-End Applied Engineering
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  We move far beyond superficial AI wrappers and trivial mockups. KAIROS challenges teams to design scalable distributed architectures, verify security primitives, and defend live working prototypes before industry juries.
                </p>
              </div>
              <div className="pt-3 text-xs font-mono text-purple-400 flex items-center gap-1.5 border-t border-purple-500/20">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>Verified Repositories & Working Code</span>
              </div>
            </SpotlightCard>
          </ScrollReveal>

          {/* Pillar 2: Builder Welfare & Collaboration (collaborate.png) */}
          <ScrollReveal direction="up" distance={24} delay={0.2} className="h-full">
            <SpotlightCard
              spotlightColor="rgba(56, 189, 248, 0.25)"
              borderColor="rgba(56, 189, 248, 0.45)"
              className="p-8 rounded-2xl glass-panel border border-purple-500/20 hover:border-sky-500/50 transition-colors space-y-5 flex flex-col justify-between h-full group"
            >
              <div className="space-y-4">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src="/assets/collaborate.png"
                    alt="Builder Collaboration"
                    fill
                    className="object-contain filter drop-shadow-md"
                  />
                </div>
                <h3 className="text-xl font-display font-bold text-white group-hover:text-sky-200 transition-colors">
                  Builder Welfare & Respect
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  We do not glorify sleep deprivation or reckless exhaustion. 48 hours of continuous operation is supported through structured team rest rotations, quiet relaxation zones, 7 principal meals, medical oversight, and continuous hydration.
                </p>
              </div>
              <div className="pt-3 text-xs font-mono text-sky-400 flex items-center gap-1.5 border-t border-sky-500/20">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>Voluntary Rest Rotations & Medical Care</span>
              </div>
            </SpotlightCard>
          </ScrollReveal>

          {/* Pillar 3: Transparent Merit & Build (build.png) */}
          <ScrollReveal direction="up" distance={24} delay={0.3} className="h-full">
            <SpotlightCard
              spotlightColor="rgba(238, 5, 242, 0.25)"
              borderColor="rgba(238, 5, 242, 0.45)"
              className="p-8 rounded-2xl glass-panel border border-purple-500/20 hover:border-purple-500/50 transition-colors space-y-5 flex flex-col justify-between h-full group"
            >
              <div className="space-y-4">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src="/assets/build.png"
                    alt="Transparent Merit & Build"
                    fill
                    className="object-contain filter drop-shadow-md"
                  />
                </div>
                <h3 className="text-xl font-display font-bold text-white group-hover:text-purple-200 transition-colors">
                  Transparent & Ethical Competition
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Zero participation fees. 100-point transparent scoring rubrics. No unannounced judging biases. Pre-event rules confirm that all code must be authored inside the 48-hour window, evaluated through rigorous checkpoints and human jury defense.
                </p>
              </div>
              <div className="pt-3 text-xs font-mono text-purple-400 flex items-center gap-1.5 border-t border-purple-500/20">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>100% Merit-Based Selection</span>
              </div>
            </SpotlightCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
