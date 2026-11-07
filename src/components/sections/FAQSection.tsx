'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS } from '@/lib/config';
import { HelpCircle, ChevronDown, Search, Sparkles, MessageCircle, Mail } from 'lucide-react';
import { sound } from '@/lib/audio';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Categorize questions
  const faqsWithCategories = useMemo(() => {
    return FAQS.map((faq, idx) => {
      let category = 'General';
      const qLower = faq.q.toLowerCase();
      if (qLower.includes('fee') || qLower.includes('qualifier') || qLower.includes('meetup')) {
        category = 'Eligibility & Fees';
      } else if (qLower.includes('venue') || qLower.includes('transit') || qLower.includes('food') || qLower.includes('hardware')) {
        category = 'Venue & Logistics';
      } else if (qLower.includes('ip') || qLower.includes('pre-built') || qLower.includes('credits')) {
        category = 'Rules & Cloud';
      } else if (qLower.includes('evaluated') || qLower.includes('sponsorship') || qLower.includes('referral')) {
        category = 'Judging & Rewards';
      }
      return { ...faq, category, originalIdx: idx };
    });
  }, []);

  const categories = ['All', 'Eligibility & Fees', 'Venue & Logistics', 'Rules & Cloud', 'Judging & Rewards'];

  const filteredFaqs = faqsWithCategories.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="relative py-24 lg:py-32 overflow-hidden bg-kairos-darkest">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[400px] bg-purple-950/20 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <ScrollReveal direction="down" distance={16}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30 shadow-md backdrop-blur-md">
              <div className="relative w-5 h-5 rounded overflow-hidden">
                <Image
                  src="/assets/FAQ.png"
                  alt="FAQ"
                  fill
                  className="object-contain"
                />
              </div>
              <span>Answers for Builders • 24/7 Technical Support</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Frequently Asked <span className="gradient-text-kairos">Questions</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.2}>
            <p className="text-base text-slate-300">
              Everything you need to know about eligibility, team rosters, venue arrangements, and 48-hour competition rules.
            </p>
          </ScrollReveal>

          {/* Quick Search Input */}
          <ScrollReveal direction="up" distance={16} delay={0.25}>
            <div className="pt-2 relative max-w-md mx-auto">
              <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search logistics, rules, meals, or hardware..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl glass-input text-xs sm:text-sm focus:border-aws-orange transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </ScrollReveal>

          {/* Categorized Filter Tabs */}
          <ScrollReveal direction="up" distance={16} delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      sound?.playClick();
                      setActiveCategory(cat);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                      isActive
                        ? 'bg-purple-950 text-purple-200 border border-purple-500/50 font-bold shadow-md'
                        : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        {/* Results Count Footnote */}
        {searchQuery && (
          <div className="text-xs font-mono text-slate-400 mb-4 px-2">
            Showing {filteredFaqs.length} matching result{filteredFaqs.length === 1 ? '' : 's'} for &ldquo;{searchQuery}&rdquo;
          </div>
        )}

        {/* Accordion List with Framer Motion */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 p-8 rounded-2xl bg-aws-card/50 border border-white/10 text-slate-400 text-sm space-y-3">
              <p>No matching questions found for &ldquo;{searchQuery}&rdquo;.</p>
              <p className="text-xs">
                Email{' '}
                <a href="mailto:sistawscc@gmail.com" className="text-purple-400 underline font-mono">
                  sistawscc@gmail.com
                </a>{' '}
                for instant assistance from the KAIROS team.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl glass-panel border transition-all duration-200 overflow-hidden ${
                    isOpen ? 'border-purple-500/40 bg-aws-squidInk/80 shadow-lg' : 'border-purple-500/15 hover:border-purple-500/30'
                  }`}
                >
                  <button
                    onClick={() => {
                      sound?.playClick();
                      setOpenIdx(isOpen ? null : idx);
                    }}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-aws-orange"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-purple-400 font-bold shrink-0">
                        Q{String(faq.originalIdx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-white leading-snug">
                        {faq.q}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-purple-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-aws-orange' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-purple-500/10 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Direct Contact Prompt */}
        <ScrollReveal direction="up" distance={16} delay={0.2}>
          <div className="mt-14 p-6 rounded-2xl bg-aws-card/60 border border-purple-500/20 text-center space-y-2 backdrop-blur-md">
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-purple-300">
              <MessageCircle className="w-4 h-4 text-purple-400" />
              <span>Have an inquiry not answered above?</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Reach our organizing secretariat directly at{' '}
              <a
                href="mailto:sistawscc@gmail.com"
                className="text-amber-300 hover:text-white underline font-semibold font-mono"
              >
                sistawscc@gmail.com
              </a>
              {' '}or connect via our Discord & WhatsApp community channels.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
