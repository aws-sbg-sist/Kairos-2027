'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TECHNICAL_TRACKS } from '@/lib/config';
import { Cpu, Server, ShieldCheck, Leaf, ArrowRight, Layers, Code, CheckCircle2, Trophy, ExternalLink } from 'lucide-react';

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
    <section id="tracks" className="relative py-20 lg:py-28 overflow-hidden bg-aws-canvas/80">
      
      {/* Background illumination */}
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-aws-orange/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono text-amber-300 bg-aws-squidInk border border-aws-orange/30 shadow-md">
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
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            The Five Innovation <span className="gradient-text-kairos">Tracks</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Engineered around AWS Cloud frontiers. Build high-concurrency event meshes, multi-agent swarms, edge IoT telemetries, and zero-knowledge financial rails.
          </p>
          <div className="pt-2">
            <Link
              href="/tracks"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white px-4 py-2 rounded-xl bg-aws-squidInk border border-aws-orange/30 hover:border-aws-orange transition-all"
            >
              <span>Explore Complete Architectural Blueprints & Rubrics</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Tracks Selector Navigation (Pills) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {TECHNICAL_TRACKS.map((track) => {
            const Icon = getIcon(track.iconName);
            const isActive = track.id === activeTrackId;
            return (
              <button
                key={track.id}
                onClick={() => setActiveTrackId(track.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-aws-orange text-slate-950 shadow-lg shadow-aws-orange/30 border border-amber-400 font-bold scale-105'
                    : 'bg-aws-card text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-aws-orange'}`} />
                <span>{track.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Track Highlighted Showcase Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-aws-card border border-slate-700/60 relative overflow-hidden transition-all duration-300">
          
          {/* Track Number Watermark */}
          <div className="absolute top-4 right-8 font-display font-black text-7xl sm:text-9xl text-aws-orange/5 select-none pointer-events-none">
            {activeTrack.number}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-aws-orange/15 text-aws-orange flex items-center justify-center border border-aws-orange/30">
                  <ActiveIcon className="w-6 h-6 text-aws-orange" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-amber-300 font-bold">TRACK {activeTrack.number}</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      ₹7,000 Cash Bounty
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                    {activeTrack.title}
                  </h3>
                </div>
              </div>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
                {activeTrack.shortDescription}
              </p>

              <p className="text-sm text-slate-300 leading-relaxed">
                {activeTrack.longDescription}
              </p>

              {/* Sample Themes */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold">
                  Key Architectural Themes & Focus Areas
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeTrack.themes.map((theme, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300 p-2.5 rounded-lg bg-slate-900/80 border border-slate-700/60">
                      <CheckCircle2 className="w-3.5 h-3.5 text-aws-orange flex-shrink-0 mt-0.5" />
                      <span>{theme}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Stacks & Action Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 lg:pl-6 lg:border-l lg:border-slate-700/60">
              
              {/* Recommended Toolchains */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5" />
                  <span>Recommended AWS & Developer Stacks</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeTrack.recommendedStacks.map((stack, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 border border-slate-700 text-slate-200"
                    >
                      {stack}
                    </span>
                  ))}
                </div>
              </div>

              {/* Track Award Note */}
              <div className="p-4 rounded-xl bg-aws-squidInk/80 border border-aws-orange/30 text-xs text-amber-200 space-y-1">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-aws-orange flex-shrink-0" />
                  <span className="font-bold text-white">₹7,000 Dedicated Track Bounty</span>
                </div>
                <span className="text-slate-300 block">
                  Top performing team in this track earns direct jury recognition, dedicated memento, and API partner bounties.
                </span>
              </div>

              {/* Submit CTA */}
              <div className="space-y-2">
                <Link
                  href="/register"
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-aws-orange via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-aws-orange shadow-lg shadow-aws-orange/20 transition-all flex items-center justify-center gap-2 group active:scale-95"
                >
                  <span>Submit Round 0 Abstract for {activeTrack.title.split('&')[0]} (Free)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/tracks"
                  className="w-full py-2.5 rounded-xl font-semibold text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>View Full Architectural Blueprint</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Track Grid Cards (Overview) */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {TECHNICAL_TRACKS.map((t) => {
            const Icon = getIcon(t.iconName);
            const isSelected = t.id === activeTrackId;
            return (
              <div
                key={t.id}
                onClick={() => setActiveTrackId(t.id)}
                className={`p-5 rounded-2xl cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-aws-squidInk border-2 border-aws-orange shadow-lg shadow-aws-orange/20'
                    : 'bg-aws-card border border-slate-700/60 hover:bg-slate-900/90 hover:border-aws-orange/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-aws-orange font-bold">
                    TRACK {t.number}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">
                    ₹7K
                  </span>
                </div>
                <Icon className="w-5 h-5 text-amber-300 mb-2" />
                <h4 className="text-sm font-bold text-white line-clamp-2 mb-2">
                  {t.title}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {t.shortDescription}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
