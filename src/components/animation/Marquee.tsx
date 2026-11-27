'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export interface MarqueeProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: number; // duration in seconds
  pauseOnHover?: boolean;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  direction = 'left',
  speed = 28,
  pauseOnHover = true,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`group relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_72px,_black_calc(100%-72px),transparent_100%)] ${className}`}
    >
      <div
        className={`flex w-max shrink-0 items-center gap-8 sm:gap-12 will-change-transform ${
          prefersReducedMotion
            ? ''
            : direction === 'left'
              ? 'kairos-marquee-left'
              : 'kairos-marquee-right'
        } ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: !prefersReducedMotion && isVisible ? 'running' : 'paused',
        }}
      >
        <div className="flex shrink-0 items-center gap-8 sm:gap-12">{children}</div>
        <div className="flex shrink-0 items-center gap-8 sm:gap-12" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};
