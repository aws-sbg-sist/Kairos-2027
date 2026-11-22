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
      <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[#12141A] border border-white/10 shadow-2xl shadow-black/80">
        {/* Left: Tracks Link */}
        <Link
          href="/tracks"
          onClick={() => {
            sound?.playClick();
            haptics?.light();
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition active:scale-95 text-xs font-mono shrink-0"
        >
          <Layers className="w-3.5 h-3.5 text-[#FF9900]" />
          <span>5 Tracks</span>
        </Link>

        {/* Center: Primary Register CTA */}
        <Link
          href="/register"
          onClick={() => {
            sound?.playClick();
            haptics?.heavy();
          }}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-[#FF9900] hover:bg-[#F59E0B] text-black font-semibold text-xs transition"
        >
          <span>Register team (Free)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {/* Right: Dismiss button */}
        <button
          onClick={() => {
            sound?.playClick();
            setDismissed(true);
          }}
          aria-label="Dismiss quick action dock"
          className="w-8 h-8 rounded-md bg-white/5 text-slate-400 hover:text-white flex items-center justify-center border border-white/10 transition shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

