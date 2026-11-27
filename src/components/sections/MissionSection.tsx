'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Maximize2, X, Building2, FileText, Download } from 'lucide-react';

export const MissionSection: React.FC = () => {
  const [activeVisual, setActiveVisual] = useState<'arena' | 'brochure'>('arena');
  const [brochureZoomed, setBrochureZoomed] = useState(false);

  const specs = [
    { key: '01 · Format', val: '48 Hours Non-Stop On-Campus Sprint' },
    { key: '02 · Venue', val: 'Indoor Stadium, Sathyabama IST (Chennai)' },
    { key: '03 · Squad Cap', val: '100 National Teams · 3 to 6 Builders Each' },
    { key: '04 · Entry Fee', val: 'Free Round 0 & R1 · Nominal Fee for R2 Finalists' },
    { key: '05 · Welfare', val: '7 Catered Meals, Midnight Drops & Bus Fleet' },
    { key: '06 · IP Charter', val: '100% Student Ownership · Zero Equity Claimed' },
  ];

  return (
    <section id="mission" className="relative py-16 lg:py-24 overflow-hidden bg-[#07070b] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Clean Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2.5 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block">
              Official Campus Edition · Category-1 University (NAAC A++)
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
              Built for Working Systems. <br className="hidden sm:block" />
              <span className="text-slate-400">Engineered at Sathyabama.</span>
            </h2>
          </div>

          {/* Minimalist View Switcher: Arena Photo vs Official Brochure */}
          <div className="inline-flex p-1 rounded-xl bg-[#0d0d13] border border-white/10 text-xs font-mono self-start md:self-auto shrink-0">
            <button
              onClick={() => setActiveVisual('arena')}
              className={`min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-colors ${
                activeVisual === 'arena'
                  ? 'bg-white text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Arena Floor</span>
            </button>
            <button
              onClick={() => setActiveVisual('brochure')}
              className={`min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-colors ${
                activeVisual === 'brochure'
                  ? 'bg-white text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Official Brochure</span>
            </button>
          </div>
        </div>

        {/* Asymmetric Visual Showcase (7 cols) + Hairline Technical Spec Sheet (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: High-Contrast Photograph / Official Event Brochure */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 bg-black group">
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  activeVisual === 'arena' ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                }`}
              >
                <Image
                  key="arena-floor-img"
                  src="/assets/visuals/arena-stage.jpg"
                  alt="Sathyabama Indoor Stadium Hackathon Floor"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>

              <div
                className={`absolute inset-0 transition-opacity duration-300 bg-black ${
                  activeVisual === 'brochure' ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                }`}
              >
                <Image
                  key="official-brochure-img"
                  src="/assets/kairos-brochure.jpg"
                  alt="Official KAIROS 2027 Hackathon Brochure"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain bg-black p-1"
                />
                <button
                  onClick={() => setBrochureZoomed(true)}
                  className="min-h-[44px] absolute bottom-3 right-3 px-3.5 py-2 rounded-lg bg-black/85 hover:bg-white text-white hover:text-slate-950 border border-white/25 text-xs font-mono font-semibold inline-flex items-center gap-1.5 transition-colors z-20"
                  aria-label="Inspect full resolution brochure"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Expand Brochure</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Hairline Spec Rows (High Info Density, Zero Heavy Card Boxes) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="divide-y divide-white/10 border-y border-white/10">
              {specs.map((row) => (
                <div key={row.key} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                  <span className="text-xs font-mono text-slate-400 shrink-0">
                    {row.key}
                  </span>
                  <span className="text-sm font-medium text-white sm:text-right">
                    {row.val}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-mono">
              <a
                href="/assets/downloads/KAIROS_2027_Official_Brochure.pdf"
                download="KAIROS_2027_Official_Brochure.pdf"
                className="min-h-[44px] px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white text-white hover:text-slate-950 border border-white/15 inline-flex items-center gap-1.5 font-semibold transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Brochure &amp; OD Guide (PDF)</span>
              </a>
              <a
                href="/assets/downloads/KAIROS_2027_Round0_Pitch_Template.pptx"
                download="KAIROS_2027_Round0_Pitch_Template.pptx"
                className="min-h-[44px] px-3.5 py-2 rounded-xl bg-purple-950/50 hover:bg-purple-900/70 text-purple-200 hover:text-white border border-purple-500/30 inline-flex items-center gap-1.5 font-semibold transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-purple-300" />
                <span>Round 0 PPT Template (.pptx)</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-1 text-xs font-mono">
              <Link
                href="/on-campus"
                className="min-h-[44px] px-1 text-slate-200 hover:text-white inline-flex items-center gap-1.5 font-semibold"
              >
                <span>Venue Map, Bus Fleet &amp; OD Checklist</span>
                <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
              </Link>
              <Link
                href="/rules"
                className="min-h-[44px] px-1 text-slate-400 hover:text-white inline-flex items-center gap-1.5"
              >
                <span>Rules &amp; Governance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Full Brochure Lightbox */}
      {brochureZoomed && (
        <div
          className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setBrochureZoomed(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Official KAIROS Event Brochure"
        >
          <button
            onClick={() => setBrochureZoomed(false)}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-slate-950 transition-colors"
            aria-label="Close brochure preview"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative w-full max-w-5xl aspect-[16/9]" onClick={(e) => e.stopPropagation()}>
            <Image
              src="/assets/kairos-brochure.jpg"
              alt="Official KAIROS Event Brochure Full Resolution"
              fill
              className="object-contain rounded-xl border border-white/15"
            />
          </div>
        </div>
      )}
    </section>
  );
};
