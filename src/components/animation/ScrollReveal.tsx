'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  scale?: number;
  threshold?: number;
  once?: boolean;
  immediate?: boolean; // When true, animates immediately on mount (for above-the-fold hero content)
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.55,
  direction = 'up',
  distance = 24,
  scale = 1,
  threshold = 0.05,
  once = true,
  immediate = false,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [forceVisible, setForceVisible] = useState(false);

  // Safety guard: guarantee content is 100% visible even if IntersectionObserver fails or is delayed
  useEffect(() => {
    const timer = setTimeout(() => {
      setForceVisible(true);
    }, 1200 + delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  if (prefersReducedMotion || forceVisible) {
    return <div className={className}>{children}</div>;
  }

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialPos = getInitialPosition();

  // Above-the-fold or immediate entrance: animate on mount without waiting for scroll
  if (immediate) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          scale: scale !== 1 ? scale : 1,
        }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration,
          delay,
          ease: [0.21, 0.47, 0.32, 0.98], // Apple/Stripe-style fluid ease-out
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  // Below-the-fold components: animate smoothly when scrolled into view
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: initialPos.x,
        y: initialPos.y,
        scale: scale !== 1 ? scale : 1,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once,
        amount: threshold,
        margin: '0px 0px -20px 0px',
      }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
