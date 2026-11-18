import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow">
      <Navbar />

      <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-aws-card border border-slate-700/60 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center mx-auto text-purple-400">
            <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '10s' }} />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
              HTTP 404 • Resource Not In Orbit
            </span>
            <h1 className="text-3xl font-display font-black text-white">
              Coordinates Unmapped
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The requested pathway or team dossier does not exist or has been shifted in the event mesh schedule.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 transition shadow-lg shadow-purple-900/30"
            >
              <Home className="w-4 h-4" />
              <span>Back to KAIROS 2027 Mainframe</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
