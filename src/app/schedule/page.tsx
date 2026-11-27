'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { ScheduleSection } from '@/components/sections/ScheduleSection';

export default function SchedulePage() {
  return (
    <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow">
      <Navbar />

      <main id="main-content" className="flex-grow pt-24 sm:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="flex items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Link href="/" className="hover:text-slate-200">Home</Link>
              <span>/</span>
              <span className="text-purple-400 font-mono">48-Hour Schedule</span>
            </div>
            <Link
              href="/on-campus"
              className="hidden sm:inline-flex items-center gap-1.5 text-purple-300 hover:text-white font-mono transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>View Venue &amp; Bus Fleet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <ScheduleSection />
      </main>

      <Footer />
    </div>
  );
}
