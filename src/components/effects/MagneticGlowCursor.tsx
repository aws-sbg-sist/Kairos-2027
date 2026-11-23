'use client';

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function MagneticGlowCursor() {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (prefersReducedMotion || typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setPosition({ x: e.clientX, y: e.clientY });
          if (!isVisible) setIsVisible(true);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, prefersReducedMotion]);

  if (prefersReducedMotion || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-300">
      {/* Primary Soft Ambient Neon Cursor Glow */}
      <motion.div
        className="absolute w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(238, 5, 242, 0.45) 0%, rgba(118, 48, 217, 0.25) 45%, transparent 75%)',
        }}
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 250,
          mass: 0.2,
        }}
      />
    </div>
  );
}
