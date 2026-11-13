'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { TECHNICAL_TRACKS } from '@/lib/config';
import { Cpu, Server, ShieldCheck, Leaf, ArrowRight, Layers, Code, CheckCircle2, Trophy, ExternalLink, Sparkles } from 'lucide-react';
import { sound } from '@/lib/audio';
import { haptics } from '@/lib/haptics';
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
    <section id="tracks" className="relative py-16 lg:py-24 overflow-hidden bg-aws-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <ScrollReveal direction="down" distance={16}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono text-purple-300 bg-aws-squidInk/90 border border-purple-500/30 shadow-md">
              <div className="relative w-5 h-5 rounded overflow-hidden">
                <Image
                  src="/assets/tracks.png"
                  alt="Tracks Badge"
                  fill
                  className="object-contain"
                />
              </div>
              <span>5 AWS-Native Technical Tracks • Industry Architectures</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              The Five Technical <span className="gradient-text-kairos">Tracks</span>
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
                className="inline-flex items-center gap-2 text-xs font-bold text-purple-300 hover:text-white px-4 py-2.5 rounded-xl bg-aws-squidInk/80 border border-purple-500/30 hover:border-purple-500 transition-all shadow-md group"
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
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  aria-label={`Inspect Track ${track.number}: ${track.title}`}
                  onClick={() => {
                    sound?.playClick();
                    haptics?.selection();
                    setActiveTrackId(track.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      sound?.playClick();
                      haptics?.selection();
                      setActiveTrackId(track.id);
                    }
                  }}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 h-full flex flex-col justify-between relative overflow-hidden group select-none active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-aws-orange focus-visible:outline-none ${
                    isActive
                      ? 'bg-aws-squidInk/95 border-2 border-purple-500 shadow-xl shadow-purple-900/30 scale-[1.02]'
                      : 'bg-aws-card/70 border border-slate-700/60 hover:border-purple-500/40 hover:bg-slate-900/80'
                  }`}
                >
                  {/* Subtle top indicator bar */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 ${
                      isActive ? 'bg-gradient-to-r from-purple-600 to-indigo-600 opacity-100' : 'bg-transparent opacity-0 group-hover:opacity-60 group-hover:bg-gradient-to-r from-purple-600 to-indigo-600/50'
                    }`}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold'
                            : 'bg-white/5 text-slate-300 group-hover:text-purple-400 border border-white/10'
                        }`}
                      >
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-purple-300 transition-colors">
                        {track.number}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-sm text-white mb-2 leading-snug group-hover:text-purple-200 transition-colors">
                      {track.shortTitle || track.title}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-purple-300 font-bold">
                      48H Build
                    </span>
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded-full transition-colors ${
                        isActive
                          ? 'bg-purple-950/60 text-white border border-purple-500/40'
                          : 'text-slate-300 group-hover:text-white'
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
            <div className="double-bezel shadow-2xl">
              <div className="double-bezel-inner p-6 sm:p-10 relative overflow-hidden">
                {/* Track Number Watermark */}
                <div className="absolute top-4 right-8 font-display font-black text-7xl sm:text-9xl text-purple-400/5 select-none pointer-events-none">
                  {activeTrack.number}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                  {/* Left Content Column (7 cols) */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-purple-950/60 text-purple-400 border border-purple-500/40 flex items-center justify-center font-bold">
                        <ActiveIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-purple-300 block uppercase tracking-wider">
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
                            className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900/80 border border-slate-700/70 text-slate-200 hover:border-purple-500/40 transition-colors"
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
                          haptics?.medium();
                          onSelectTrack?.(activeTrack.title);
                        }}
                        className="island-btn px-5 py-3 text-xs sm:text-sm font-bold btn-primary-themed text-white shadow-lg shadow-purple-900/30 group active:scale-[0.97]"
                      >
                        <span>Choose Track for Application</span>
                        <span className="island-btn-icon w-6 h-6 rounded-full bg-white/20">
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </button>

                      <Link
                        href="/tracks"
                        onClick={() => {
                          sound?.playClick();
                          haptics?.selection();
                        }}
                        className="island-btn px-4 py-3 text-xs sm:text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 transition-colors active:scale-[0.97]"
                      >
                        <span>View Rubric & Challenges</span>
                        <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Aerospace Evaluation Blueprint (5 cols) */}
                  <div className="lg:col-span-5 space-y-4">
                    {/* Track Bounty Card */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-purple-950/40 to-slate-950 border border-emerald-500/30 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block font-semibold">
                          TRACK CASH BOUNTY
                        </span>
                        <span className="text-xl font-black text-white font-mono">
                          ₹25,000 CASH
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        + AWS Credits
                      </span>
                    </div>

                    {/* Scoring Distribution Telemetry */}
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400 uppercase font-semibold">Live Rubric Weights</span>
                        <span className="text-purple-400 font-bold">100% TOTAL</span>
                      </div>

                      <div className="space-y-1.5 text-xs font-mono">
                        <div className="flex items-center justify-between text-slate-300 text-[11px]">
                          <span>Architecture & Concurrency</span>
                          <span className="text-white font-bold">35%</span>
                        </div>
                        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-purple-500 h-full rounded-full" style={{ width: '35%' }} />
                        </div>

                        <div className="flex items-center justify-between text-slate-300 text-[11px]">
                          <span>Working Implementation</span>
                          <span className="text-white font-bold">25%</span>
                        </div>
                        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-indigo-500 h-full rounded-full" style={{ width: '25%' }} />
                        </div>

                        <div className="flex items-center justify-between text-slate-300 text-[11px]">
                          <span>AWS Cloud Primitives Depth</span>
                          <span className="text-white font-bold">20%</span>
                        </div>
                        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-sky-500 h-full rounded-full" style={{ width: '20%' }} />
                        </div>

                        <div className="flex items-center justify-between text-slate-300 text-[11px]">
                          <span>Architecture Defense & Q&A</span>
                          <span className="text-white font-bold">20%</span>
                        </div>
                        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: '20%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
