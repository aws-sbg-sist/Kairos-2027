'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Camera, LayoutGrid, SlidersHorizontal, Maximize2, MapPin, Eye, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/lib/audio';
import { SpotlightCard } from '@/components/animation/SpotlightCard';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { GalleryLightbox, GalleryItem } from '@/components/animation/GalleryLightbox';

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'venue-main',
    title: 'The Arena: Indoor Auditorium',
    caption: 'Air-conditioned stadium with dedicated gigabit LAN drops, 24/7 power backups, and private team cubicles.',
    category: 'Arena',
    src: '/assets/visuals/arena-stage.jpg',
  },
  {
    id: 'coding-pits',
    title: '48-Hour Continuous Engineering Pits',
    caption: '100 elite student teams authoring, testing, and stress-profiling cloud distributed systems under real conditions.',
    category: 'Engineering',
    src: '/assets/coding-workspace.png',
  },
  {
    id: 'collaboration-lounge',
    title: 'Rest Lounges & Team Rotations',
    caption: 'Designated chill-out zones, continuous hydration stations, and 7 hot meals prepared on campus.',
    category: 'Community',
    src: '/assets/collaborate.png',
  },
  {
    id: 'applied-engineering',
    title: 'Distributed Cloud Architecture & CI/CD',
    caption: 'Builders deploying event meshes, AI swarms, and zero-knowledge rails on AWS Cloud infra.',
    category: 'Engineering',
    src: '/assets/innov.png',
  },
  {
    id: 'podium-honors',
    title: 'Grand Champion & National Honors',
    caption: '₹1,75,000 total prize pool, institutional trophies, and VC pitch fast-tracking.',
    category: 'Awards',
    src: '/assets/visuals/trophy-pass.jpg',
  },
  {
    id: 'jury-pitches',
    title: 'Transparent Architectural Jury',
    caption: 'Live architecture defense before senior enterprise architects, faculty, and industry leaders.',
    category: 'Jury',
    src: '/assets/judges.png',
  },
  {
    id: 'aws-mentorship',
    title: 'AWS Cloud Clinic & Technical Mentors',
    caption: 'Solutions Architects walking the floor to review IAM policies, VPC peerings, and Lambda concurrency limits.',
    category: 'Community',
    src: '/assets/mentors.png',
  },
  {
    id: 'national-cohort',
    title: '100 Elite National Teams Cohort',
    caption: 'Over 400 builders representing premier technological institutes across all Indian states.',
    category: 'Community',
    src: '/assets/teams.png',
  },
];

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'masonry' | 'carousel'>('carousel');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const categories = ['All', 'Arena', 'Engineering', 'Community', 'Awards', 'Jury'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  // Keep carouselIndex within bounds when filteredItems change
  useEffect(() => {
    setCarouselIndex(0);
  }, [selectedCategory]);

  // Auto-advance Card Art Carousel
  useEffect(() => {
    if (!isAutoPlaying || viewMode !== 'carousel' || filteredItems.length <= 1) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % filteredItems.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isAutoPlaying, viewMode, filteredItems.length]);

  const handleOpenLightbox = (index: number) => {
    sound?.playClick();
    setLightboxIndex(index);
  };

  const handleNextCard = () => {
    sound?.playClick();
    setCarouselIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrevCard = () => {
    sound?.playClick();
    setCarouselIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="gallery" className="relative py-24 lg:py-32 overflow-hidden bg-aws-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <ScrollReveal direction="down" distance={16}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30 shadow-md backdrop-blur-md">
              <Camera className="w-3.5 h-3.5 text-purple-400" />
              <span>Event Atmosphere & Arena Preview</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              The KAIROS <span className="gradient-text-kairos">Experience</span> Gallery
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.2}>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
              Inspect the hackathon floor, high-density coding bays, live stage presentations, and builder community environment at Sathyabama University.
            </p>
          </ScrollReveal>

          {/* Controls: Category Filter Pills + View Mode Switcher */}
          <ScrollReveal direction="up" distance={16} delay={0.25}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        sound?.playClick();
                        setSelectedCategory(cat);
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-colors ${isActive
                          ? 'bg-gradient-to-r from-purple-700 to-purple-900 text-white font-bold shadow-md shadow-purple-900/30 scale-105'
                          : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                        }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* View Mode Toggle (Masonry vs Carousel) */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                <button
                  onClick={() => {
                    sound?.playClick();
                    setViewMode('masonry');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${viewMode === 'masonry'
                      ? 'bg-purple-950 text-purple-200 border border-purple-500/40 font-bold'
                      : 'text-slate-400 hover:text-white'
                    }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Masonry Grid</span>
                </button>

                <button
                  onClick={() => {
                    sound?.playClick();
                    setViewMode('carousel');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${viewMode === 'carousel'
                      ? 'bg-purple-950 text-purple-200 border border-purple-500/40 font-bold'
                      : 'text-slate-400 hover:text-white'
                    }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Horizontal Strip</span>
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* View Mode: Masonry Grid */}
        {viewMode === 'masonry' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <ScrollReveal
                key={item.id}
                direction="up"
                distance={20}
                delay={idx * 0.06}
                className="h-full"
              >
                <SpotlightCard
                  enableTilt={true}
                  maxTilt={6}
                  spotlightColor="rgba(238, 5, 242, 0.2)"
                  borderColor="rgba(238, 5, 242, 0.4)"
                  onClick={() => handleOpenLightbox(idx)}
                  className="p-5 rounded-2xl bg-aws-card/80 border border-slate-700/60 hover:border-purple-500/40 transition-colors flex flex-col justify-between h-full group cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="relative w-full h-48 sm:h-52 rounded-xl bg-slate-950/80 overflow-hidden flex items-center justify-center border border-white/5">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 filter drop-shadow-md"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-3">
                        <span className="p-2 rounded-lg bg-gradient-to-r from-purple-700 to-purple-900 text-white shadow-md">
                          <Maximize2 className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                        <span className="text-purple-300 font-semibold">{item.category}</span>
                        <span>Full HD Illustration</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-white group-hover:text-purple-200 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                        {item.caption}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-purple-300">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Click to expand</span>
                    </span>
                    <span className="text-slate-500">KAIROS 2027</span>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          /* View Mode: Card Art Carousel (Animation #6) */
          <div className="space-y-6">
            {/* Carousel Navigation Toolbar */}
            <div className="flex items-center justify-between px-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title={isAutoPlaying ? 'Pause automatic slideshow' : 'Start automatic slideshow'}
                >
                  {isAutoPlaying ? <Pause className="w-3 h-3 text-purple-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                  <span>{isAutoPlaying ? 'Auto-Advancing' : 'Paused'}</span>
                </button>
                <span className="text-slate-500">|</span>
                <span className="text-purple-300 font-bold">
                  Card Art {String(carouselIndex + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevCard}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500/40 transition-colors cursor-pointer"
                  title="Previous Card Art"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextCard}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500/40 transition-colors cursor-pointer"
                  title="Next Card Art"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Carousel Main Stage with Responsive Snap & Active Card Scaling */}
            <div className="overflow-x-auto pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin">
              <div className="flex items-stretch gap-5 min-w-max">
                {filteredItems.map((item, idx) => {
                  const isActive = idx === carouselIndex;
                  return (
                    <motion.div
                      key={item.id}
                      initial={false}
                      animate={{
                        scale: isActive ? 1.03 : 0.96,
                        opacity: isActive ? 1 : 0.7,
                      }}
                      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                      onClick={() => {
                        if (isActive) {
                          handleOpenLightbox(idx);
                        } else {
                          sound?.playClick();
                          setCarouselIndex(idx);
                        }
                      }}
                      className={`w-[82vw] max-w-[340px] sm:w-[370px] p-5 rounded-2xl transition-colors duration-300 flex flex-col justify-between shrink-0 cursor-pointer ${isActive
                          ? 'bg-aws-card/95 border-2 border-purple-500 shadow-2xl shadow-purple-900/40'
                          : 'bg-aws-card/70 border border-slate-700/60 hover:border-purple-500/40 hover:bg-slate-900/90'
                        }`}
                    >
                      <div className="space-y-4">
                        <div className="relative w-full h-52 rounded-xl bg-slate-950/80 overflow-hidden flex items-center justify-center border border-white/5">
                          <Image
                            src={item.src}
                            alt={item.title}
                            fill
                            className="object-contain p-4 transition-transform duration-500 hover:scale-105"
                          />
                          {isActive && (
                            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-950/90 text-purple-200 border border-purple-500/40 shadow-sm">
                              FEATURED ART
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                              {item.category}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400">
                              Art #0{idx + 1}
                            </span>
                          </div>
                          <h3 className="font-display font-bold text-base text-white mt-1 group-hover:text-purple-200 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                            {item.caption}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-purple-300">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{isActive ? 'Click to Enlarge' : 'Select Card'}</span>
                        </span>
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Pip Dots */}
            <div className="flex items-center justify-center gap-2 pt-2">
              {filteredItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound?.playClick();
                    setCarouselIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-[width,background-color] cursor-pointer ${idx === carouselIndex
                      ? 'w-8 bg-gradient-to-r from-purple-500 to-aws-orange shadow-md shadow-purple-900/50'
                      : 'w-2 bg-slate-800 hover:bg-slate-700'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <GalleryLightbox
        items={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </section>
  );
};
