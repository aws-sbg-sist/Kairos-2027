'use client';

import React, { useState } from 'react';
import { TECHNICAL_TRACKS } from '@/lib/config';
import { Cpu, Server, ShieldCheck, TrendingUp, Leaf, ArrowRight, Layers, Code, CheckCircle2 } from 'lucide-react';

interface TracksSectionProps {
  onSelectTrack: (trackTitle: string) => void;
}

export const TracksSection: React.FC<TracksSectionProps> = ({ onSelectTrack }) => {
  const [activeTrackId, setActiveTrackId] = useState<string>(TECHNICAL_TRACKS[0].id);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu': return Cpu;
      case 'Server': return Server;
      case 'ShieldCheck': return ShieldCheck;
      case 'TrendingUp': return TrendingUp;
      case 'Leaf': return Leaf;
      default: return Layers;
    }
  };

  const activeTrack = TECHNICAL_TRACKS.find(t => t.id === activeTrackId) || TECHNICAL_TRACKS[0];
  const ActiveIcon = getIcon(activeTrack.iconName);

  return (
    <section id="tracks" className="relative py-20 lg:py-28 overflow-hidden bg-kairos-bg/50">
      
      {/* Background illumination */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-purple-900/15 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>National Engineering Challenges</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Five Technical <span className="gradient-text-kairos">Tracks</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Engineered around critical frontiers in computer science. Select your focus area, architect scalable prototypes, and solve real-world problems.
          </p>
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
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/40 border border-purple-400/30 scale-105'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-purple-500/15'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-400'}`} />
                <span>{track.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Track Highlighted Showcase Card */}
        <div className="p-6 sm:p-10 rounded-3xl glass-panel-glow border border-purple-500/30 relative overflow-hidden transition-all duration-300">
          
          {/* Subtle Top-Right Track Number Watermark */}
          <div className="absolute top-4 right-8 font-display font-extrabold text-7xl sm:text-9xl text-purple-500/5 select-none pointer-events-none">
            {activeTrack.number}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-900/50 text-purple-300 flex items-center justify-center border border-purple-500/30">
                  <ActiveIcon className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <span className="text-xs font-mono text-purple-400 block">TRACK {activeTrack.number}</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    {activeTrack.title}
                  </h3>
                </div>
              </div>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
                {activeTrack.shortDescription}
              </p>

              <p className="text-sm text-slate-400 leading-relaxed">
                {activeTrack.longDescription}
              </p>

              {/* Sample Themes */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold">
                  Key Architectural Themes & Focus Areas
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeTrack.themes.map((theme, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300 p-2.5 rounded-lg bg-slate-950/50 border border-purple-500/15">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>{theme}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Stacks & Action Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 lg:pl-6 lg:border-l lg:border-purple-500/20">
              
              {/* Recommended Toolchains */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5" />
                  <span>Recommended Technology Stacks</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeTrack.recommendedStacks.map((stack, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-purple-950/50 border border-purple-500/25 text-purple-200"
                    >
                      {stack}
                    </span>
                  ))}
                </div>
              </div>

              {/* Track Award Note */}
              <div className="p-4 rounded-xl bg-purple-900/20 border border-purple-500/25 text-xs text-purple-200 space-y-1">
                <span className="font-semibold block text-white">Dedicated Track Excellence Award</span>
                <span className="text-slate-300 block">
                  Top performing team in this track earns direct jury recognition, track trophy, and verified winner credentials.
                </span>
              </div>

              {/* Apply / Reserve Track CTA */}
              <div>
                <button
                  onClick={() => onSelectTrack(activeTrack.title)}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-sky-500 hover:from-purple-500 hover:to-sky-400 shadow-md shadow-purple-950 transition-all flex items-center justify-center gap-2 group active:scale-95"
                >
                  <span>Register Priority for {activeTrack.title}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
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
                    ? 'bg-purple-900/30 border-2 border-purple-500 shadow-lg shadow-purple-950/50'
                    : 'glass-panel hover:bg-slate-900/90'
                }`}
              >
                <span className="text-[11px] font-mono text-purple-400 font-semibold block mb-2">
                  TRACK {t.number}
                </span>
                <Icon className="w-5 h-5 text-purple-300 mb-2" />
                <h4 className="text-sm font-bold text-white line-clamp-2 mb-2">
                  {t.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
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
