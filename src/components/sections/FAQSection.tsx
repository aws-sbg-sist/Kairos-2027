'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS, EVENT_CONFIG } from '@/lib/config';
import { ChevronDown, Bot, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { KineticText } from '@/components/animation/KineticText';
import { sound } from '@/lib/audio';
import { haptics } from '@/lib/haptics';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const topFaqs = FAQS.slice(0, 6);

  const handleOpenAiChat = () => {
    sound?.playClick();
    haptics?.light();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-kairos-chatbot'));
    }
  };

  return (
    <section id="faq" className="relative py-16 lg:py-24 overflow-hidden bg-[#09090d] border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" distance={16}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-300/90 block">
                Essential Builder Reference
              </span>
              <KineticText
                text="Frequently Asked Questions"
                highlightWords={['Questions']}
                className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight"
              />
            </div>

            <Link
              href="/rules"
              data-cursor-label="RULES"
              onClick={() => sound?.playClick()}
              className="min-h-[44px] px-1 text-xs font-mono font-semibold text-purple-300 hover:text-white inline-flex items-center gap-1.5 transition-colors group link-underline-sweep"
            >
              <span>Complete Rules &amp; All FAQs</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Hairline Minimalist Accordion with Sliding Active Bar */}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {topFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`relative transition-colors duration-200 ${isOpen ? 'bg-white/[0.035]' : 'hover:bg-white/[0.015]'}`}
              >
                {isOpen && (
                  <motion.span
                    layoutId="faq-active-spine"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-gradient-to-b from-cyber-magenta via-purple-400 to-sky-400 pointer-events-none"
                  />
                )}
                <button
                  type="button"
                  onClick={() => {
                    sound?.playClick();
                    haptics?.light();
                    setOpenIdx(isOpen ? null : idx);
                  }}
                  className="w-full min-h-[54px] py-4 sm:py-5 px-3 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 transition-colors active:scale-[0.995]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`text-xs font-mono font-bold shrink-0 transition-colors ${isOpen ? 'text-cyber-magenta' : 'text-slate-500'}`}>
                      0{idx + 1}
                    </span>
                    <span className={`text-sm sm:text-base font-bold leading-snug transition-colors ${isOpen ? 'text-white' : 'text-slate-200'}`}>
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-purple-400' : 'text-slate-400'}`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${idx}`}
                      role="region"
                      aria-label={faq.q}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-10 pr-4 pb-5 text-sm text-slate-300 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-400">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              data-cursor-label="ASK AI"
              onClick={handleOpenAiChat}
              className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-purple-500/45 text-slate-200 font-semibold transition-colors active:scale-[0.96] shine-hover"
            >
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              <span>Ask Kairos AI</span>
            </button>
            <span>or reach us on</span>
            <a
              href={EVENT_CONFIG.socialHandles.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound?.playClick()}
              className="min-h-[44px] inline-flex items-center px-1 text-slate-200 hover:text-white font-mono link-underline-sweep"
            >
              Instagram ({EVENT_CONFIG.socialHandles.instagram})
            </a>
            <span>·</span>
            <a href={EVENT_CONFIG.socialHandles.linkedinUrl} target="_blank" rel="noopener noreferrer" className="min-h-[44px] inline-flex items-center px-1 text-slate-200 hover:text-white font-mono link-underline-sweep">
              LinkedIn
            </a>
            <span>·</span>
            <a href="mailto:sistawscc@gmail.com" className="min-h-[44px] inline-flex items-center px-1 text-slate-200 hover:text-white font-mono link-underline-sweep">
              sistawscc@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
