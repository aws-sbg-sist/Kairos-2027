'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: string;
  src: string;
}

export interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < items.length;
  const currentItem = isOpen ? items[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    const prev = (currentIndex - 1 + items.length) % items.length;
    onNavigate(prev);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    const next = (currentIndex + 1) % items.length;
    onNavigate(next);
  }, [currentIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  return (
    <AnimatePresence>
      {isOpen && currentItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Center Lightbox Card */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col rounded-2xl bg-aws-card border border-purple-500/30 overflow-hidden shadow-2xl"
          >
            <div className="relative w-full h-[55vh] sm:h-[65vh] bg-black/60 flex items-center justify-center p-6">
              <Image
                src={currentItem.src}
                alt={currentItem.title}
                fill
                priority
                className="object-contain p-4 drop-shadow-[0_10px_35px_rgba(238,5,242,0.3)]"
              />
            </div>

            {/* Lightbox Details Footer */}
            <div className="p-4 sm:p-6 bg-aws-squidInk/95 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-aws-orange/20 text-amber-300 border border-aws-orange/30">
                    {currentItem.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {currentIndex + 1} of {items.length}
                  </span>
                </div>
                <h3 className="text-lg font-display font-bold text-white">
                  {currentItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  {currentItem.caption}
                </p>
              </div>

              <div className="text-xs font-mono text-purple-300 flex items-center gap-1.5 shrink-0">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>KAIROS 2027 Atmosphere</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
