'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, RotateCcw, Home } from 'lucide-react';

export default function RootGlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#07070b] text-slate-100 flex items-center justify-center p-6 font-sans antialiased">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#0d0d13] border border-rose-500/30 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-rose-950/60 border border-rose-500/40 flex items-center justify-center mx-auto text-rose-400">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold">
              Critical Shell Recovery
            </span>
            <h2 className="text-2xl font-bold text-white">KAIROS Application Recovered</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              An unexpected error occurred while rendering the application root. Reload or return to the homepage.
            </p>
            {error?.digest && (
              <p className="text-[11px] font-mono text-slate-500">Digest: {error.digest}</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => reset()}
              className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry</span>
            </button>
            <Link
              href="/"
              className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
