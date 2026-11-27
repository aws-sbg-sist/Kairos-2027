'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { KineticText } from '@/components/animation/KineticText';
import { SpotlightCard } from '@/components/animation/SpotlightCard';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { TECHNICAL_TRACKS } from '@/lib/config';
import { EVALUATION_CRITERIA, PROBLEM_STATEMENTS } from '@/lib/problem-statements';
import { sound } from '@/lib/audio';
import { haptics } from '@/lib/haptics';

export default function TracksPage() {
  const [trackId, setTrackId] = useState(TECHNICAL_TRACKS[0].id);
  const track = TECHNICAL_TRACKS.find((item) => item.id === trackId) || TECHNICAL_TRACKS[0];
  const statements = PROBLEM_STATEMENTS.filter((item) => item.trackId === track.id);

  return (
    <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow relative overflow-x-hidden">
      <Navbar />
      <main id="main-content" className="flex-grow pt-32 pb-24 relative z-10">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
          <ScrollReveal direction="up" distance={14} immediate={true}>
            <p className="text-xs font-mono tracking-widest uppercase text-purple-300 mb-4">48-hour hackathon · Official challenges</p>
            <h1 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight max-w-4xl">
              <KineticText as="span" immediate={true} text="Find the problem worth building for." highlightWords={['worth', 'building', 'for.']} />
            </h1>
            <p className="mt-5 text-slate-300 text-lg max-w-2xl">
              Explore 15 official problem statements across five tracks. Select a track to inspect its three challenges.
            </p>
            <div className="mt-7 flex flex-wrap gap-2 text-xs font-mono text-slate-300">
              {['5 tracks', '15 problem statements', '48 hours', 'Software + hybrid'].map((label) => (
                <span key={label} className="rounded-full border border-purple-400/25 bg-purple-400/10 hover:border-purple-400/60 transition-colors px-3 py-1.5">
                  {label}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6" aria-labelledby="track-selector-heading">
          <div className="rounded-3xl border border-slate-700/70 bg-aws-card p-5 sm:p-8 shadow-2xl shadow-black/50">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">
              <div>
                <h2 id="track-selector-heading" className="text-2xl font-display font-bold text-white">Select a track</h2>
                <p className="text-sm text-slate-400 mt-1">The statements below update smoothly with your selection.</p>
              </div>
              <div className="relative w-full sm:w-96">
                <label htmlFor="track-select" className="sr-only">Technical track</label>
                <select
                  id="track-select"
                  value={trackId}
                  onChange={(event) => {
                    sound?.playClick();
                    haptics?.light();
                    setTrackId(event.target.value);
                  }}
                  className="w-full min-h-[48px] appearance-none rounded-xl border border-purple-400/50 bg-slate-950 px-4 py-3.5 pr-10 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors hover:border-purple-400"
                >
                  {TECHNICAL_TRACKS.map((item) => (
                    <option key={item.id} value={item.id}>Track {item.number} — {item.title}</option>
                  ))}
                </select>
                <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-4 w-4 h-4 text-purple-300" />
              </div>
            </div>

            {/* Quick desktop/mobile pill selector tabs */}
            <div className="flex flex-wrap gap-2 pb-6">
              {TECHNICAL_TRACKS.map((item) => {
                const isSelected = item.id === track.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      sound?.playClick();
                      haptics?.light();
                      setTrackId(item.id);
                    }}
                    className={`relative min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-colors ${
                      isSelected ? 'text-white' : 'text-slate-400 hover:text-white bg-white/[0.03] border border-white/10'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="tracks-page-pill"
                        transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                        className="absolute inset-0 rounded-xl bg-purple-950/80 border border-purple-500/50 shadow-sm shadow-purple-900/40 -z-10"
                      />
                    )}
                    <span className="relative z-10">TRACK {item.number} · {item.shortTitle}</span>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-white/10 pt-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                >
                  <p className="text-xs font-mono text-purple-300">TRACK {track.number} / 05</p>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-2">{track.title}</h3>
                  <p className="mt-3 max-w-3xl text-slate-300">{track.shortDescription}</p>

                  <div className="grid md:grid-cols-3 gap-4 mt-8">
                    {statements.map((statement) => (
                      <SpotlightCard
                        key={statement.id}
                        enableTilt={true}
                        maxTilt={4}
                        spotlightColor="rgba(238, 5, 242, 0.14)"
                        borderColor="rgba(238, 5, 242, 0.42)"
                        cursorLabel="SPEC"
                        className="border border-slate-700/70 bg-slate-950/75 p-5 group"
                      >
                        <article className="flex flex-col h-full">
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-mono text-sm font-bold px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/35 text-purple-300">
                              {statement.id}
                            </span>
                            <span className="text-[11px] text-slate-300 rounded-full border border-slate-600 px-2.5 py-0.5">
                              {statement.category === 'Software' ? 'Software' : 'Hardware + Software'}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-white leading-snug mt-5 group-hover:text-purple-200 transition-colors">
                            {statement.title}
                          </h4>
                          <p className="text-xs text-purple-300 mt-3">{statement.domain}</p>
                          <p className="text-sm text-slate-300 leading-relaxed mt-4 flex-grow">{statement.challenge}</p>
                          <Link
                            href={`/tracks/${statement.id.toLowerCase()}`}
                            onClick={() => sound?.playClick()}
                            className="min-h-[44px] mt-5 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-purple-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400 rounded link-underline-sweep self-start"
                            aria-label={`View problem statement ${statement.id}: ${statement.title}`}
                          >
                            <span>View Problem Statement</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </article>
                      </SpotlightCard>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
          <div className="rounded-2xl border border-slate-700/70 bg-aws-card p-6 sm:p-8 cyber-edge-card">
            <h2 className="text-xl font-display font-bold text-white">Common evaluation criteria</h2>
            <p className="text-sm text-slate-400 mt-2">Applies to all 15 statements · 100 marks total</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
              {EVALUATION_CRITERIA.map((item) => (
                <div key={item.label} className="flex justify-between gap-3 rounded-xl bg-slate-950/60 border border-slate-700/60 hover:border-purple-500/40 transition-colors px-4 py-3 text-sm">
                  <span className="text-slate-200">{item.label}</span>
                  <strong className="text-purple-300 tabular-nums">{item.points}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
