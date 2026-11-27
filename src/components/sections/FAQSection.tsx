'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS } from '@/lib/config';
import { ChevronDown, Bot, ArrowRight } from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/config';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const topFaqs = FAQS.slice(0, 6);

  const handleOpenAiChat = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-kairos-chatbot'));
    }
  };

  return (
    <section id="faq" className="relative py-16 lg:py-24 overflow-hidden bg-[#09090d] border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block">
              Essential Builder Reference
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Frequently Asked <span className="gradient-text-kairos">Questions</span>
            </h2>
          </div>

          <Link
            href="/rules"
            className="text-xs font-mono font-semibold text-purple-300 hover:text-white inline-flex items-center gap-1.5"
          >
            <span>Complete Rules &amp; All FAQs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Hairline Minimalist Accordion */}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {topFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="transition-colors">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full py-5 px-2 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-xs font-mono text-slate-500 font-bold shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white leading-snug">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : ''}`}
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
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                    >
                      <div className="pl-9 pr-4 pb-5 text-sm text-slate-300 leading-relaxed">
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
              onClick={handleOpenAiChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-slate-200 font-semibold transition-colors"
            >
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              <span>Ask Kairos AI</span>
            </button>
            <span>or reach us on</span>
            <a href={EVENT_CONFIG.socialHandles.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-white underline font-mono">
              Instagram ({EVENT_CONFIG.socialHandles.instagram})
            </a>
            <span>·</span>
            <a href={EVENT_CONFIG.socialHandles.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-white underline font-mono">
              LinkedIn
            </a>
            <span>·</span>
            <a href="mailto:sistawscc@gmail.com" className="text-slate-200 hover:text-white underline font-mono">
              sistawscc@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
