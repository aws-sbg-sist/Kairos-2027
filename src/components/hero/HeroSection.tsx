'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Logo25DAnimation } from './Logo25DAnimation';
import { sound } from '@/lib/audio';
import { CosmicBackground } from '@/components/animation/CosmicBackground';
import { LayeredParallax } from '@/components/animation/LayeredParallax';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-20 sm:pt-28 pb-12 sm:pb-16 overflow-hidden">
      <LayeredParallax />
      <CosmicBackground particleCount={50} interactive={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 min-w-0 space-y-4 text-center lg:text-left">
            <p className="text-xs sm:text-sm font-mono text-purple-300">
              AWS Student Builder Group SIST · National Hackathon
            </p>
            <div className="relative w-full max-w-[240px] sm:max-w-[300px] mx-auto lg:mx-0 h-14 sm:h-16">
              <Image
                src="/assets/kairos-wordmark.png"
                alt="KAIROS 2027"
                fill
                sizes="(min-width: 640px) 300px, 240px"
                priority
                className="object-contain object-center lg:object-left drop-shadow-2xl"
              />
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white leading-[1.1]">
              Build your next big idea.<br />
              <span className="gradient-text-kairos">Live on AWS.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-200 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              A 48-hour cloud hackathon. Five innovation tracks. Your team, building what comes next.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-1">
              <Link
                href="/register"
                onClick={() => sound?.playClick()}
                className="w-full sm:w-auto min-w-0 px-6 py-3.5 rounded-xl text-base font-bold text-white btn-primary-themed shadow-xl shadow-purple-900/40 flex items-center justify-center gap-2 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400"
              >
                <span>Apply for Round 0</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
              <Link href="#tracks" className="px-4 py-3 text-sm font-semibold text-purple-300 hover:text-white text-center">
                Explore the five tracks
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 text-xs sm:text-sm text-slate-300">
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400 shrink-0" />
                January 22–24, 2027
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                Sathyabama, Chennai
              </span>
            </div>
          </div>
          <div aria-hidden="true" className="hidden lg:flex lg:col-span-5 min-w-0 items-center justify-center">
            <div className="relative w-full aspect-square max-w-[400px]">
              <Logo25DAnimation />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
