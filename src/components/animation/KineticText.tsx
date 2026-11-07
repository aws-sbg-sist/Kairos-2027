'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export interface KineticTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  highlightWords?: string[];
  highlightClassName?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.05,
  highlightWords = [],
  highlightClassName = 'gradient-text-kairos',
  as = 'h2',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const words = text.split(' ');
  const Tag = as as any;

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={ref} className={`inline-flex flex-wrap gap-x-[0.28em] gap-y-1 ${className}`}>
      {words.map((word, idx) => {
        const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
        const isHighlight = highlightWords.some(
          hw => hw.toLowerCase() === cleanWord.toLowerCase()
        );

        return (
          <span key={idx} className="inline-block overflow-hidden py-0.5">
            <motion.span
              initial={{
                opacity: 0,
                y: '100%',
                filter: 'blur(4px)',
              }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: '0%',
                      filter: 'blur(0px)',
                    }
                  : {
                      opacity: 0,
                      y: '100%',
                      filter: 'blur(4px)',
                    }
              }
              transition={{
                duration: 0.55,
                delay: delay + idx * stagger,
                ease: [0.16, 1, 0.3, 1], // snappy cubic bezier
              }}
              className={`inline-block ${isHighlight ? highlightClassName : ''} ${wordClassName}`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
};
