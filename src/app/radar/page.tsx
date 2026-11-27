'use client';

import React from 'react';
import Link from 'next/link';
import { Users, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { TeamRadarSection } from '@/components/sections/TeamRadarSection';

export default function RadarPage() {
  return (
    <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow">
      <Navbar />

      <main id="main-content" className="flex-grow pt-24 sm:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Link href="/" className="hover:text-slate-200">Home</Link>
              <span>/</span>
              <span className="text-purple-400 font-mono">Builder Radar</span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/team/create"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-semibold transition-colors"
              >
                <Users className="w-3.5 h-3.5 text-purple-400" />
                <span>Create Squad</span>
              </Link>
              <Link
                href="/team/join"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/30 text-purple-200 font-semibold transition-colors"
              >
                <span>Join via Code</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <TeamRadarSection />
      </main>

      <Footer />
    </div>
  );
}
