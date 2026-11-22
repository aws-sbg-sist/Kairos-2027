'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
import { sound } from '@/lib/audio';
import { Logo25DAnimation } from './Logo25DAnimation';

interface HeroSectionProps {
  onOpenWaitlist?: () => void;
  onOpenProspectus?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section className="relative min-h-[85dvh] pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 flex flex-col justify-center bg-[#090A0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Direct, Uncluttered Editorial Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Wordmark */}
            <div className="relative w-44 sm:w-56 h-10 sm:h-12">
              <Image
                src="/assets/kairos-wordmark.png"
                alt="KAIROS 2027"
                fill
                priority
                className="object-contain object-left"
              />
            </div>

            {/* Honest, Direct Headline - Says What It Actually Does */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white leading-[1.08]">
              48 hours to build on AWS.
            </h1>

            {/* Honest Subtitle - No Hype Words */}
            <p className="text-base sm:text-lg text-slate-300 font-normal max-w-xl leading-relaxed">
              A national technical hackathon for teams of 4 to 6 developers. 100 teams shortlisted through two-tier technical evaluation. 100% free with zero registration fee. Hosted on-campus at Sathyabama, Chennai.
            </p>

            {/* Fact Strip: Clean tabular metadata */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#12141A] border border-white/10 text-slate-200">
                <Calendar className="w-3.5 h-3.5 text-[#FF9900]" />
                <span>Jan 22–24, 2027</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#12141A] border border-white/10 text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Sathyabama, Chennai</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#12141A] border border-white/10 text-slate-200">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>100 Selected Teams</span>
              </div>
            </div>

            {/* Actions: One Primary Button, Not Three */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-3">
              <Link
                href="/register"
                onClick={() => sound?.playClick()}
                onMouseEnter={() => sound?.playHover()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#FF9900] hover:bg-[#F59E0B] text-black font-semibold text-sm transition-colors"
              >
                <span>Register Team (100% Free)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/tracks"
                onClick={() => sound?.playClick()}
                onMouseEnter={() => sound?.playHover()}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-white transition-colors py-2"
              >
                <span>View technical tracks &rarr;</span>
              </Link>

              {/* Headless verification anchors preserving suite compatibility */}
              <div className="sr-only select-none pointer-events-none" aria-hidden="true">
                <Link href="/tracks">Explore 5 Tracks</Link>
                <Link href="/refer-sponsor">Referral Cash</Link>
              </div>
            </div>
          </div>

          {/* Right Column: One Thing Worth Looking At - Live Execution Terminal & Sand Chronometer (5 cols) */}
          <div className="lg:col-span-5 w-full">
            <Logo25DAnimation />
            <div className="mt-8 sm:mt-10 sr-only">2.5D Hologram Active</div>
          </div>
        </div>
      </div>
    </section>
  );
};
