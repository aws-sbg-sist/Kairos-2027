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
    <section id="tracks" className="relative py-16 lg:py-24 bg-[#090A0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Left-Aligned */}
        <div className="max-w-2xl mb-12 space-y-3 text-left">
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            Five technical tracks.
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Built around real-world cloud architectures. Teams engineer scalable systems using Amazon Bedrock, serverless event fabrics, distributed storage, and edge computing.
          </p>
        </div>

        {/* 5 Track Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {TECHNICAL_TRACKS.map((track) => {
            const isActive = track.id === activeTrackId;
            return (
              <div
                key={track.id}
                onClick={() => {
                  sound?.playClick();
                  setActiveTrackId(track.id);
                }}
                className={`p-4 rounded-lg cursor-pointer transition-colors duration-150 h-full flex flex-col justify-between select-none border ${
                  isActive
                    ? 'bg-[#181B23] border-[#FF9900]'
                    : 'bg-[#12141A] border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2 text-xs font-mono text-slate-400">
                    <span className="font-semibold text-white">TRACK {track.number}</span>
                    <span>48H BUILD</span>
                  </div>

                  <h3 className="font-bold text-sm text-white mb-2 leading-snug">
                    {track.title}
                  </h3>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className={isActive ? 'text-[#FF9900] font-semibold' : 'text-slate-500'}>
                    {isActive ? 'SELECTED' : 'VIEW DETAILS'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Track Highlighted Showcase Card */}
        <div className="p-6 sm:p-8 rounded-lg bg-[#12141A] border border-white/10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-xs font-mono text-[#FF9900] font-semibold block mb-1">
                  TRACK {activeTrack.number} ARCHITECTURAL SPECIFICATION
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                  {activeTrack.title}
                </h3>
              </div>

              <p className="text-base text-slate-300 leading-relaxed">
                {activeTrack.longDescription}
              </p>

              {/* Architecture & Tech Stack Tags */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400 block font-semibold">
                  Suggested AWS Primitives & Tools
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeTrack.recommendedStacks.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-md text-xs font-mono bg-[#181B23] border border-white/10 text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Row */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
                <button
                  onClick={() => {
                    sound?.playClick();
                    onSelectTrack?.(activeTrack.title);
                  }}
                  className="px-5 py-2.5 rounded-md text-sm font-semibold bg-[#FF9900] hover:bg-[#F59E0B] text-black flex items-center gap-2 transition-colors"
                >
                  <span>Select track for registration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  href="/tracks"
                  onClick={() => sound?.playClick()}
                  className="px-4 py-2.5 rounded-md text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  View full rubric &rarr;
                </Link>
              </div>
            </div>

            {/* Right Column: Challenge Showcase (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-md bg-[#181B23] border border-white/10 space-y-2">
                <div className="text-xs font-mono text-slate-400 font-semibold">
                  DELIVERABLE SPECIFICATION
                </div>
                <div className="text-sm font-bold text-white">
                  Production Architecture & Defense
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  Teams must deploy live on AWS, maintain a clean commit history on GitHub, and defend architecture choices during jury defense.
                </div>
              </div>

              <div className="p-4 rounded-md bg-[#181B23] border border-white/10 space-y-2">
                <div className="text-xs font-mono text-slate-400 font-semibold">
                  EVALUATION CRITERIA
                </div>
                <div className="text-xs font-mono text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Architecture Design:</span>
                    <span className="text-white">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Implementation & Code:</span>
                    <span className="text-white">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Technical Innovation:</span>
                    <span className="text-white">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Presentation & Defense:</span>
                    <span className="text-white">20%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
