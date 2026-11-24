'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { TECHNICAL_TRACKS } from '@/lib/config';
import { EVALUATION_CRITERIA, PROBLEM_STATEMENTS } from '@/lib/problem-statements';

export default function TracksPage() {
  const [trackId, setTrackId] = useState(TECHNICAL_TRACKS[0].id);
  const track = TECHNICAL_TRACKS.find((item) => item.id === trackId) || TECHNICAL_TRACKS[0];
  const statements = PROBLEM_STATEMENTS.filter((item) => item.trackId === track.id);

  return <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow">
    <Navbar />
    <main className="flex-grow pt-32 pb-24">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
        <p className="text-xs font-mono tracking-widest uppercase text-purple-300 mb-4">48-hour hackathon · Official challenges</p>
        <h1 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight max-w-4xl">Find the problem <span className="gradient-text-kairos">worth building for.</span></h1>
        <p className="mt-5 text-slate-300 text-lg max-w-2xl">Explore 15 official problem statements across five tracks. Select a track to see its three challenges.</p>
        <div className="mt-7 flex flex-wrap gap-2 text-xs font-mono text-slate-300">{['5 tracks', '15 problem statements', '48 hours', 'Software + hybrid'].map((label) => <span key={label} className="rounded-full border border-purple-400/25 bg-purple-400/10 px-3 py-1.5">{label}</span>)}</div>
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6" aria-labelledby="track-selector-heading">
        <div className="rounded-3xl border border-slate-700/70 bg-aws-card p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">
            <div><h2 id="track-selector-heading" className="text-2xl font-display font-bold text-white">Select a track</h2><p className="text-sm text-slate-400 mt-1">The statements below update with your selection.</p></div>
            <div className="relative w-full sm:w-96"><label htmlFor="track-select" className="sr-only">Technical track</label><select id="track-select" value={trackId} onChange={(event) => setTrackId(event.target.value)} className="w-full appearance-none rounded-xl border border-purple-400/50 bg-slate-950 px-4 py-3.5 pr-10 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-purple-400">{TECHNICAL_TRACKS.map((item) => <option key={item.id} value={item.id}>Track {item.number} — {item.title}</option>)}</select><ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-4 w-4 h-4 text-purple-300" /></div>
          </div>
          <div className="border-t border-white/10 pt-7"><p className="text-xs font-mono text-purple-300">TRACK {track.number} / 05</p><h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-2">{track.title}</h3><p className="mt-3 max-w-3xl text-slate-300">{track.shortDescription}</p>
            <div className="grid md:grid-cols-3 gap-4 mt-8">{statements.map((statement) => <article key={statement.id} className="flex flex-col rounded-2xl border border-slate-700/70 bg-slate-950/60 p-5 hover:border-purple-400/50 transition-colors"><div className="flex items-center justify-between gap-3"><span className="font-mono text-sm font-bold text-purple-300">{statement.id}</span><span className="text-[11px] text-slate-300 rounded-full border border-slate-600 px-2 py-1">{statement.category === 'Software' ? 'Software' : 'Hardware + Software'}</span></div><h4 className="text-lg font-bold text-white leading-snug mt-5">{statement.title}</h4><p className="text-xs text-purple-300 mt-3">{statement.domain}</p><p className="text-sm text-slate-300 leading-relaxed mt-4 flex-grow">{statement.challenge}</p><Link href={`/tracks/${statement.id.toLowerCase()}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-purple-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400 rounded" aria-label={`View problem statement ${statement.id}: ${statement.title}`}>View Problem Statement <ArrowRight className="w-4 h-4" /></Link></article>)}</div>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-10"><div className="rounded-2xl border border-slate-700/70 bg-aws-card p-6 sm:p-8"><h2 className="text-xl font-display font-bold text-white">Common evaluation criteria</h2><p className="text-sm text-slate-400 mt-2">Applies to all 15 statements · 100 marks total</p><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">{EVALUATION_CRITERIA.map((item) => <div key={item.label} className="flex justify-between gap-3 rounded-xl bg-slate-950/60 border border-slate-700/60 px-4 py-3 text-sm"><span className="text-slate-200">{item.label}</span><strong className="text-purple-300">{item.points}</strong></div>)}</div></div></section>
    </main><Footer />
  </div>;
}
