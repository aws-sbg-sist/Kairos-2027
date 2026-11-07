'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

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

  return (
    <div
      className={`relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] ${className}`}
    >
      <motion.div
        className="flex w-max shrink-0 items-center gap-10 sm:gap-14"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
              }
        }
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
        whileHover={pauseOnHover ? { animationPlayState: 'paused' } : undefined}
      >
        <div className="flex shrink-0 items-center gap-10 sm:gap-14">{children}</div>
        <div className="flex shrink-0 items-center gap-10 sm:gap-14" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
