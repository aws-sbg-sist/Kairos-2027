'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface LineRevealProps {
  text?: string;
  lines?: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}

export const LineReveal: React.FC<LineRevealProps> = ({
  text,
  lines: providedLines,
  className = '',
  lineClassName = '',
  delay = 0.1,
  stagger = 0.12,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReducedMotion = useReducedMotion();
  const [forceVisible, setForceVisible] = useState(false);

  // Safety fallback: ensure text is 100% visible even if IntersectionObserver fails or is delayed
  useEffect(() => {
    const timer = setTimeout(() => {
      setForceVisible(true);
    }, 600 + delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  // Universal sentence splitting without lookbehind
  const computedLines =
    providedLines ||
    (text
      ? text
          .split(/([.!?]+\s+)/)
          .reduce<string[]>((acc, part, i) => {
            if (i % 2 === 0 && part.trim()) {
              acc.push(part.trim());
            } else if (acc.length > 0 && part.trim()) {
              acc[acc.length - 1] += ' ' + part.trim();
            }
            return acc;
          }, [])
          .filter(Boolean)
      : []);

  const shouldAnimate = !prefersReducedMotion && (isInView || forceVisible);

  return (
    <div ref={ref} className={className} style={{ perspective: 1000 }}>
      {computedLines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden py-0.5">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={
              shouldAnimate
                ? {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: delay + idx * stagger,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }
                : { opacity: 0, y: 14 }
            }
            className={`block ${lineClassName}`}
            style={{ transformOrigin: 'top center' }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </div>
  );
};
