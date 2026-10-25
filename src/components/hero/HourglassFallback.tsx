'use client';

import React from 'react';
import Image from 'next/image';

export const HourglassFallback: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[340px] sm:min-h-[420px] flex items-center justify-center">
      {/* Outer Glow Halo */}
      <div className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-purple-600/25 rounded-full blur-3xl animate-pulse-glow" />

      {/* Orbit Ring CSS Animation */}
      <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-purple-500/30 border-dashed animate-orbit-spin pointer-events-none" />

      {/* Central Hourglass Logo Asset */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 animate-float-slow">
        <Image
          src="/assets/kairos-hourglass.png"
          alt="KAIROS Hourglass Emblem"
          fill
          priority
          sizes="(max-width: 768px) 256px, 320px"
          className="object-contain filter drop-shadow-[0_0_35px_rgba(168,85,247,0.7)]"
        />
      </div>

      {/* Floating Sparkle Badges */}
      <div className="absolute -top-2 right-12 px-2.5 py-1 rounded-full text-[11px] font-mono bg-purple-950/80 border border-purple-500/40 text-purple-200 shadow-md">
        48h Sand In Motion
      </div>
      <div className="absolute -bottom-2 left-8 px-2.5 py-1 rounded-full text-[11px] font-mono bg-sky-950/80 border border-sky-500/40 text-sky-200 shadow-md">
        IST Calibrated
      </div>
    </div>
  );
};
