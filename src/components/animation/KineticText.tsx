'use client';

import React, { useRef, useState, useEffect } from 'react';
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
  immediate?: boolean;
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.045,
  highlightWords = [],
  highlightClassName = 'gradient-text-kairos text-glow-kairos',
  as = 'h2',
  immediate = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReducedMotion = useReducedMotion();
  const [forceVisible, setForceVisible] = useState(immediate);

  useEffect(() => {
    const timer = setTimeout(() => {
      setForceVisible(true);
    }, 380 + delay * 400);
    return () => clearTimeout(timer);
  }, [delay]);

  const words = text.split(' ');
  const Tag = as as React.ElementType;

  if (prefersReducedMotion) {
    return (
      <Tag className={className}>
        {words.map((word, idx) => {
          const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
          const isHighlight = highlightWords.some(
            (hw) => hw.toLowerCase() === cleanWord.toLowerCase()
          );
          return (
            <span key={idx} className={`${isHighlight ? highlightClassName : ''} ${wordClassName}`}>
              {word}
              {idx < words.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </Tag>
    );
  }

  const visible = isInView || forceVisible;

  return (
    <Tag
      ref={ref}
      aria-label={text}
      className={`inline-flex flex-wrap gap-x-[0.26em] gap-y-0.5 ${className}`}
    >
      {words.map((word, idx) => {
        const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
        const isHighlight = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord.toLowerCase()
        );

        return (
          <span key={idx} aria-hidden="true" className="inline-block overflow-hidden py-0.5">
            <motion.span
              initial={immediate ? false : { opacity: 0, y: '85%' }}
              animate={
                visible
                  ? { opacity: 1, y: '0%' }
                  : { opacity: 0, y: '85%' }
              }
              transition={{
                duration: 0.48,
                delay: immediate ? 0 : delay + idx * stagger,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`inline-block transition-transform duration-200 hover:-translate-y-0.5 ${
                isHighlight ? highlightClassName : ''
              } ${wordClassName}`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
};
