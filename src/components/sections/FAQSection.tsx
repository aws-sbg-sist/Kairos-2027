'use client';

import React, { useState } from 'react';
import { FAQS } from '@/lib/config';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQS.filter(
    f => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="relative py-20 lg:py-28 overflow-hidden bg-kairos-darkest">
      
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-950/20 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>Answers for Builders</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Frequently Asked <span className="gradient-text-kairos">Questions</span>
          </h2>
          <p className="text-base text-slate-300">
            Everything you need to know about eligibility, team size, venue arrangements, and 48-hour competition rules.
          </p>

          {/* Quick Search */}
          <div className="pt-2 relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search logistics, rules, meals, or hardware..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm">
              No matching questions found for "{searchQuery}". Email <a href="mailto:sistawscc@gmail.com" className="text-purple-400 underline">sistawscc@gmail.com</a> for direct assistance.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl glass-panel border border-purple-500/15 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-purple-400"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-white leading-snug">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-purple-400 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-purple-300' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-purple-500/10 pt-3 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Direct Contact Prompt */}
        <div className="mt-12 text-center text-xs text-slate-400">
          Have an unanswered question? Reach our team directly at{' '}
          <a href="mailto:sistawscc@gmail.com" className="text-purple-400 hover:text-purple-300 underline font-medium">
            sistawscc@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};
