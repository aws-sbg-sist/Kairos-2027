'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS } from '@/lib/config';
import { HelpCircle, ChevronDown, Sparkles, Bot, MessageCircle } from 'lucide-react';
import { sound } from '@/lib/audio';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const handleOpenAiChat = () => {
    sound?.playClick();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-kairos-chatbot'));
    }
  };

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
              Essential facts about eligibility, selection rounds, on-campus logistics, and competition guidelines.
            </p>
          </ScrollReveal>
        </div>

        {/* AI Assistant Highlight Card */}
        <ScrollReveal direction="up" distance={16} delay={0.25}>
          <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-950/60 via-aws-squidInk/90 to-aws-orange/15 border border-purple-500/30 shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-purple-400 flex items-center justify-center shrink-0 shadow-lg shadow-purple-900/30">
                <Bot className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-display font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
                  <span>Have More Questions?</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    24/7 Live AI
                  </span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                  Refer to the <strong className="text-white">Ask Kairos AI</strong> assistant in the <strong className="text-purple-400">bottom-right corner</strong> of your screen for instantaneous answers on rules, technical tracks, and venue facilities.
                </p>
              </div>
            </div>
            <button
              onClick={handleOpenAiChat}
              className="px-5 py-2.5 rounded-xl text-xs font-bold btn-primary-themed text-white flex items-center gap-2 shrink-0 shadow-md shadow-purple-900/30 hover:scale-105 active:scale-[0.97] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Kairos AI</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Streamlined Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl glass-panel border transition-colors duration-200 overflow-hidden ${
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
                      Q{String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white leading-snug">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-purple-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-purple-400' : ''
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
          })}
        </div>

        {/* AI Referral Footnote Prompt */}
        <ScrollReveal direction="up" distance={16} delay={0.2}>
          <div className="mt-12 p-6 rounded-2xl bg-aws-card/60 border border-purple-500/20 text-center space-y-2 backdrop-blur-md">
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-purple-300">
              <MessageCircle className="w-4 h-4 text-purple-400" />
              <span>Looking for something else?</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Click the <button onClick={handleOpenAiChat} className="text-purple-400 underline font-semibold hover:text-white transition">Ask Kairos AI</button> button in the bottom-right corner of the page, or email our student secretariat directly at{' '}
              <a
                href="mailto:sistawscc@gmail.com"
                className="text-purple-300 hover:text-white underline font-semibold font-mono"
              >
                sistawscc@gmail.com
              </a>.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
