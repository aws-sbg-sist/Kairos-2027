'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Crown, 
  ShieldCheck, 
  Award, 
  Building2, 
  GraduationCap, 
  Mail, 
  Phone, 
  Linkedin, 
  ExternalLink,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { HIGHER_MANAGEMENT, EVENT_CONFIG } from '@/lib/config';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';

export default function LeadershipPage() {
  const apex = HIGHER_MANAGEMENT.apexLeader;

  return (
    <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow">
      <Navbar />
      <main className="flex-grow pt-28 pb-24 relative">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[550px] bg-gradient-to-b from-purple-950/20 via-indigo-950/10 to-transparent blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-xs text-slate-400">
          <Link href="/" className="hover:text-slate-200">Home</Link>
          <span>/</span>
          <Link href="/members" className="hover:text-slate-200">Organizing Cadre</Link>
          <span>/</span>
          <span className="text-purple-400 font-mono">Higher Management (Batch of 26–27)</span>
        </div>

        {/* Header Title */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-400 text-xs font-mono font-bold tracking-wider uppercase mb-5">
            <Crown className="w-3.5 h-3.5" />
            Executive Directorate & Higher Management
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
            Higher Management Roster <br />
            <span className="gradient-text-kairos bg-clip-text text-transparent">
              {HIGHER_MANAGEMENT.batchTitle}
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            The executive committee guiding institutional governance, corporate partnerships, high-density cloud infrastructure, and 100% student IP protection.
          </p>
        </div>

        {/* Apex Leader: President & SBGL Thenappan T */}
        <div className="max-w-5xl mx-auto mb-20 rounded-3xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-indigo-950/30 border-2 border-purple-500/50 p-8 sm:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Crown className="w-64 h-64 text-purple-400" />
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-12 relative z-10">
            {/* Avatar Badge */}
            <div className="shrink-0 text-center">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-600 p-1 shadow-2xl shadow-purple-900/40">
                <div className="w-full h-full rounded-[22px] bg-slate-950 flex flex-col items-center justify-center text-center p-4">
                  <div className="text-5xl font-black text-white font-mono mb-1">TT</div>
                  <div className="text-[10px] font-mono text-purple-400 uppercase font-bold tracking-widest">
                    Apex Leader
                  </div>
                </div>
              </div>
              <div className="mt-4 inline-block px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-400 text-xs font-mono font-bold">
                Reg: {apex.registerNo}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-gradient-to-r from-purple-600 to-indigo-600 text-white uppercase">
                  President & SBGL
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {apex.chapter}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
                {apex.name}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed mb-6 italic">
                "{apex.quote}"
              </p>

              <div className="mb-6 space-y-2 text-xs text-slate-300">
                <div><strong className="text-white">Executive Mandate:</strong> {apex.mandate}</div>
                <div><strong className="text-white">Credentials:</strong> {apex.credentials.join(' • ')}</div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 border-t border-slate-800">
                <a
                  href={`mailto:${apex.contact.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
                >
                  <Mail className="w-3.5 h-3.5 text-purple-400" />
                  {apex.contact.email}
                </a>
                <a
                  href={`tel:${apex.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
                >
                  <Phone className="w-3.5 h-3.5 text-[#10B981]" />
                  {apex.contact.phone}
                </a>
                <Link
                  href="/members/thenappan-t"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold hover:bg-purple-600 transition"
                >
                  View Full Portfolio Dossier →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Faculty Coordinators & Institutional Leadership */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              Academic Mentors & Faculty Patrons
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Institutional Oversight & Deans</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {HIGHER_MANAGEMENT.facultyCoordinators.map((fac, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-300 font-bold font-mono flex items-center justify-center shrink-0">
                  FC
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">{fac.name}</h4>
                  <div className="text-xs text-purple-400 font-mono mb-2">{fac.role}</div>
                  <p className="text-xs text-slate-400">{fac.department}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-center max-w-3xl mx-auto text-xs text-slate-400 space-y-1 font-mono">
            <div><strong className="text-slate-300">Dean Computing & HoD CSE:</strong> {HIGHER_MANAGEMENT.institutionalDeans.deanComputing}</div>
            <div><strong className="text-slate-300">Vice Chancellor:</strong> {HIGHER_MANAGEMENT.institutionalDeans.viceChancellor}</div>
          </div>
        </div>

        {/* The 6 Divisional Super Heads */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              The 6 Operational Pillars
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Divisional Super Heads</h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Each Super Head directs a specialized student division ensuring 100% precision execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HIGHER_MANAGEMENT.superHeads.map((head, idx) => (
              <div 
                key={idx}
                className="p-7 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-sky-400/50 transition shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-sky-500/20 text-sky-300 uppercase">
                      {head.code.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Reg: {head.registerNo}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-1">{head.title}</h4>
                  <div className="text-sm font-semibold text-purple-400 mb-3">{head.leadName}</div>
                  
                  <div className="text-xs font-mono text-slate-400 mb-3 pb-3 border-b border-slate-800">
                    {head.division}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {head.mandate}
                  </p>
                </div>

                <Link
                  href="/members"
                  className="text-xs font-semibold text-slate-400 hover:text-white flex items-center justify-between pt-4 border-t border-slate-800/80 group"
                >
                  <span>Explore Cadre Division</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-400 group-hover:translate-x-1 transition" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="text-center max-w-3xl mx-auto pt-8 border-t border-slate-800/60">
          <p className="text-xs text-slate-400 leading-relaxed">
            {EVENT_CONFIG.disclaimer.aws}
          </p>
        </div>

      </div>
      </main>
      <Footer />
    </div>
  );
}
