'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { TECHNICAL_TRACKS } from '@/lib/config';
import { Cpu, Server, ShieldCheck, Leaf, ArrowRight, Layers, Code, CheckCircle2, Trophy, ExternalLink, Sparkles } from 'lucide-react';
import { sound } from '@/lib/audio';
import { SpotlightCard } from '@/components/animation/SpotlightCard';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

interface TracksSectionProps {
  onSelectTrack?: (trackTitle: string) => void;
}

export const TracksSection: React.FC<TracksSectionProps> = ({ onSelectTrack }) => {
  const [activeTrackId, setActiveTrackId] = useState<string>(TECHNICAL_TRACKS[0].id);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu': return Cpu;
      case 'Server': return Server;
      case 'ShieldCheck': return ShieldCheck;
      case 'Leaf': return Leaf;
      case 'Layers': return Layers;
      default: return Layers;
    }
  };

  const activeTrack = TECHNICAL_TRACKS.find(t => t.id === activeTrackId) || TECHNICAL_TRACKS[0];
  const ActiveIcon = getIcon(activeTrack.iconName);

  return (
    <section id="tracks" className="relative py-24 lg:py-32 overflow-hidden bg-aws-canvas">
      {/* Background illumination */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-aws-orange/10 blur-[170px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-purple-950/20 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <ScrollReveal direction="down" distance={16}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono text-amber-300 bg-aws-squidInk/90 border border-aws-orange/30 shadow-md backdrop-blur-md">
              <div className="relative w-5 h-5 rounded overflow-hidden">
                <Image
                  src="/assets/tracks.png"
                  alt="Tracks Badge"
                  fill
                  className="object-contain"
                />
              </div>
              <span>5 Enterprise Innovation Tracks • ₹7,000 Cash Bounty Each</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              The Five Innovation <span className="gradient-text-kairos">Tracks</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.2}>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
              Engineered around AWS Cloud frontiers. Build high-concurrency event meshes, multi-agent swarms, edge IoT telemetries, and zero-knowledge financial rails.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={16} delay={0.25}>
            <div className="pt-2">
              <Link
                href="/tracks"
                onClick={() => sound?.playClick()}
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 hover:text-white px-4 py-2.5 rounded-xl bg-aws-squidInk/80 border border-aws-orange/30 hover:border-aws-orange transition-all shadow-md group"
              >
                <span>Explore Complete Architectural Blueprints & Rubrics</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Interactive Bento Grid of Track Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {TECHNICAL_TRACKS.map((track, idx) => {
            const Icon = getIcon(track.iconName);
            const isActive = track.id === activeTrackId;
            return (
              <ScrollReveal
                key={track.id}
                direction="up"
                distance={20}
                delay={idx * 0.07}
                className="h-full"
              >
                <div
                  onClick={() => {
                    sound?.playClick();
                    setActiveTrackId(track.id);
                  }}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 h-full flex flex-col justify-between relative overflow-hidden group select-none ${
                    isActive
                      ? 'bg-aws-squidInk/95 border-2 border-aws-orange shadow-xl shadow-aws-orange/20 scale-[1.02]'
                      : 'bg-aws-card/70 border border-slate-700/60 hover:border-aws-orange/40 hover:bg-slate-900/80'
                  }`}
                >
                  {/* Subtle top indicator bar */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 ${
                      isActive ? 'bg-aws-orange opacity-100' : 'bg-transparent opacity-0 group-hover:opacity-60 group-hover:bg-aws-orange/50'
                    }`}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-aws-orange text-slate-950 font-bold'
                            : 'bg-white/5 text-slate-300 group-hover:text-aws-orange border border-white/10'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-amber-300 transition-colors">
                        {track.number}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-sm text-white mb-2 line-clamp-2 group-hover:text-amber-200 transition-colors">
                      {track.title}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-amber-300 font-bold">
                      ₹7,000 Bounty
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full transition-colors ${
                        isActive
                          ? 'bg-aws-orange/20 text-white border border-aws-orange/40'
                          : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                    >
                      {isActive ? 'Active Inspect' : 'Select'}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Active Track Highlighted Showcase Card with Bento Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTrack.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <SpotlightCard
              spotlightColor="rgba(238, 5, 242, 0.2)"
              borderColor="rgba(238, 5, 242, 0.4)"
              enableTilt={false}
              className="p-6 sm:p-10 rounded-3xl bg-aws-card/90 border border-slate-700/60 relative overflow-hidden shadow-2xl backdrop-blur-xl"
            >
              {/* Track Number Watermark */}
              <div className="absolute top-4 right-8 font-display font-black text-7xl sm:text-9xl text-aws-orange/5 select-none pointer-events-none">
                {activeTrack.number}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                {/* Left Content Column (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-aws-orange/20 text-aws-orange border border-aws-orange/40 flex items-center justify-center font-bold">
                      <ActiveIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-amber-300 block uppercase tracking-wider">
                        TRACK {activeTrack.number} ARCHITECTURAL BLUEPRINT
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                        {activeTrack.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {activeTrack.longDescription}
                  </p>

                  {/* Architecture & Tech Stack Tags */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono uppercase text-slate-400 block tracking-wider font-semibold">
                      Suggested AWS Primitives & Tools
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeTrack.recommendedStacks.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900/80 border border-slate-700/70 text-slate-200 hover:border-aws-orange/40 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                    <button
                      onClick={() => {
                        sound?.playClick();
                        onSelectTrack?.(activeTrack.title);
                      }}
                      className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold btn-primary-themed text-slate-950 flex items-center gap-2 group shadow-lg shadow-aws-orange/20"
                    >
                      <span>Choose Track for Application</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <Link
                      href="/tracks"
                      onClick={() => sound?.playClick()}
                      className="px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 flex items-center gap-1.5 transition-colors"
                    >
                      <span>View Rubric & Challenges</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Challenge Showcase & Cash Bounty (5 cols) */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Cash Bounty Card */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-aws-squidInk to-purple-950/60 border border-aws-orange/40 shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-amber-300 font-bold uppercase flex items-center gap-1.5">
                        <Trophy className="w-3.5 h-3.5 text-aws-orange" />
                        Dedicated Track Cash Bounty
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        GUARANTEED
                      </span>
                    </div>
                    <div className="text-3xl font-display font-black text-white">
                      ₹7,000 <span className="text-xs font-mono font-normal text-slate-300">Pure Cash</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      Awarded directly to the best architectural implementation in this track, independent of the Grand Champion cash prize.
                    </p>
                  </div>

                  {/* Core Architectural Challenges */}
                  <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3">
                    <span className="text-xs font-mono uppercase text-slate-400 block tracking-wider font-semibold">
                      Key Engineering Criteria
                    </span>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Resilience under simulated fault injection & high load.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Security baseline: IAM least privilege and encrypted state.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Live demonstrable working code with automated CI/CD pipeline.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
