'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Layers, X } from 'lucide-react';
import { sound } from '@/lib/audio';
import { haptics } from '@/lib/haptics';

export const MobileFloatingBar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (dismissed) return;
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  if (!visible || dismissed) return null;

  return (
    <div
      role="region"
      aria-label="Mobile Quick Registration Dock"
      className="fixed bottom-3 left-3 right-3 z-[60] md:hidden pointer-events-auto animate-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-aws-squidInk/95 border border-purple-500/40 shadow-2xl shadow-black/80 backdrop-blur-xl">
        {/* Left: Event & Status Pill */}
        <Link
          href="/tracks"
          onClick={() => {
            sound?.playClick();
            haptics?.light();
          }}
          className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-purple-300 border border-white/10 transition active:scale-95 text-[11px] font-mono shrink-0"
        >
          <Layers className="w-3.5 h-3.5 text-purple-400" />
          <span>5 Tracks</span>
        </Link>

        {/* Center: Primary Register CTA */}
        <Link
          href="/register"
          onClick={() => {
            sound?.playClick();
            haptics?.heavy();
          }}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-aws-orange to-purple-600 text-white font-bold text-xs shadow-md shadow-purple-900/40 active:scale-[0.98] transition"
        >
          <span>Register Squad (₹0 Free)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {/* Right: Dismiss button */}
        <button
          onClick={() => {
            sound?.playClick();
            setDismissed(true);
          }}
          aria-label="Dismiss quick action dock"
          className="w-8 h-8 rounded-xl bg-white/5 text-slate-400 hover:text-white flex items-center justify-center border border-white/5 active:scale-90 transition shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

