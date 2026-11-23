'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

export const LayeredParallax: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafId.current = null;
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x: nx, y: ny });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [prefersReducedMotion]);

  // If reduced motion is requested or before hydration, render stable initial state
  const isParallaxActive = mounted && !prefersReducedMotion;

  const layer1Y = isParallaxActive ? scrollY * 0.08 : 0;
  const layer1MX = isParallaxActive ? mousePos.x * 8 : 0;
  const layer1MY = isParallaxActive ? mousePos.y * 8 : 0;

  const layer2Y = isParallaxActive ? scrollY * 0.18 : 0;
  const layer2MX = isParallaxActive ? mousePos.x * 16 : 0;
  const layer2MY = isParallaxActive ? mousePos.y * 16 : 0;

  const layer3Y = isParallaxActive ? scrollY * 0.32 : 0;
  const layer3MX = isParallaxActive ? mousePos.x * 24 : 0;
  const layer3MY = isParallaxActive ? mousePos.y * 24 : 0;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
    >
      {/* LAYER 1 (Deep Space: Hex Grid & Distant Stars) */}
      <div
        className="absolute inset-0 opacity-25 will-change-transform"
        style={{
          transform: `translate3d(${layer1MX}px, ${layer1Y + layer1MY}px, 0)`,
          backgroundImage: `radial-gradient(rgba(118, 48, 217, 0.18) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* LAYER 2 (Mid-Ground: Astrolabe Vector Rings & Coordinates) */}
      <div
        className="absolute top-1/4 right-5 sm:right-20 w-[420px] h-[420px] opacity-20 will-change-transform"
        style={{
          transform: `translate3d(${-layer2MX}px, ${layer2Y - layer2MY}px, 0)`,
        }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full text-purple-400 animate-orbit-spin">
          <circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="6 12"
          />
          <circle
            cx="200"
            cy="200"
            r="140"
            fill="none"
            stroke="rgba(238, 5, 242, 0.4)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <line
            x1="20"
            y1="200"
            x2="380"
            y2="200"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="0.8"
          />
          <line
            x1="200"
            y1="20"
            x2="200"
            y2="380"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="0.8"
          />
        </svg>
      </div>

      {/* LAYER 3 (Foreground: Ambient Relativistic Fog Clusters) */}
      <div
        className="absolute -top-20 left-10 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-aws-orange/15 via-purple-900/20 to-transparent blur-3xl opacity-60 will-change-transform"
        style={{
          transform: `translate3d(${layer3MX}px, ${layer3Y + layer3MY}px, 0)`,
        }}
      />

      <div
        className="absolute bottom-10 right-1/3 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-purple-950/30 via-sky-500/10 to-transparent blur-3xl opacity-50 will-change-transform"
        style={{
          transform: `translate3d(${-layer3MX}px, ${layer3Y * 0.8}px, 0)`,
        }}
      />
    </div>
  );
};
