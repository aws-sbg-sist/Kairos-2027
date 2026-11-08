'use client';

import React from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/config';
import { sound } from '@/lib/audio';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

export const CommitteeSection: React.FC = () => {
  return (
    <section id="committee" className="relative py-16 lg:py-20 overflow-hidden bg-aws-canvas">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-purple-950/40 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <ScrollReveal direction="up" distance={20}>
          <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-purple-500/20 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-center gap-3">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src="/assets/aws-sbg-logo.png"
                  alt="AWS Student Builder Group"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-mono font-bold text-purple-400 ">
                Official Organizing Student Community
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight">
                AWS Student Builder Group :  <span className="gradient-text-kairos">SIST Chapter</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                KAIROS 2027 is conceptualized, architected, and executed by the student leadership and organizing cadre of the AWS Student Builder Group at Sathyabama Institute of Science and Technology.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <a
                href={EVENT_CONFIG.organizer.meetupUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound?.playClick()}
                onMouseEnter={() => sound?.playHover()}
                className="px-6 py-3.5 rounded-xl text-sm font-bold btn-primary-themed text-white flex items-center gap-2 shadow-lg shadow-purple-900/30 hover:scale-105 active:scale-[0.97] transition-colors"
              >
                <span>View Club Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
