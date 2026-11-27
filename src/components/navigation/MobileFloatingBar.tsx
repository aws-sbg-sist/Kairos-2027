'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Layers, X } from 'lucide-react';
import { sound } from '@/lib/audio';
import { haptics } from '@/lib/haptics';

export const MobileFloatingBar: React.FC = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (dismissed) return;
      setVisible(window.scrollY > 280);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  const hiddenRoutes = ['/register', '/sponsors', '/admin', '/login', '/dashboard'];
  const isHiddenRoute = hiddenRoutes.some((route) => pathname?.startsWith(route));
  const shouldShow = !isHiddenRoute && visible && !dismissed;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          key="mobile-dock"
          role="region"
          aria-label="Mobile Quick Registration Dock"
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 32, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-3 right-3 z-[60] md:hidden pointer-events-auto"
        >
          <div className="relative overflow-hidden flex items-center justify-between gap-2 p-2 rounded-2xl bg-aws-squidInk/95 border border-purple-500/45 shadow-2xl shadow-black/85 backdrop-blur-xl">
            {/* Top Laser Edge */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-cyber-magenta/70 to-transparent"
            />

            {/* Left: Track Quick Link */}
            <Link
              href="/tracks"
              onClick={() => {
                sound?.playClick();
                haptics?.light();
              }}
              className="min-h-[44px] flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.06] hover:bg-white/10 text-purple-200 border border-white/10 transition active:scale-[0.96] text-[11px] font-mono font-semibold shrink-0"
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
              className="min-h-[44px] flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl btn-primary-themed text-white font-bold text-xs shadow-md shadow-purple-900/40 active:scale-[0.96] transition shine-hover"
            >
              <span>Register Squad</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Right: Dismiss button */}
            <button
              onClick={() => {
                sound?.playClick();
                haptics?.light();
                setDismissed(true);
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('kairos-dock-dismissed'));
                }
              }}
              aria-label="Dismiss quick action dock"
              className="min-h-[44px] min-w-[44px] rounded-xl bg-white/5 text-slate-400 hover:text-white flex items-center justify-center border border-white/5 active:scale-[0.96] transition shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
