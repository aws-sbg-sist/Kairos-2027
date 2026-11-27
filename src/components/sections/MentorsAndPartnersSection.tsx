'use client';

import React from 'react';
import Link from 'next/link';
import { EVENT_CONFIG, JURY_AND_MENTORS_SHOWCASE, ECOSYSTEM_LOCKUPS } from '@/lib/config';
import { ArrowRight, GraduationCap, Cloud, Users, Building2, Sparkles } from 'lucide-react';

export const MentorsAndPartnersSection: React.FC = () => {
  return (
    <section id="mentors" className="relative py-16 lg:py-24 overflow-hidden bg-[#07070b] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block">
              Jury, Cloud Mentors &amp; Institutional Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
              Mentored by Faculty &amp; <span className="gradient-text-kairos">Cloud Builders</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Pre-event technical clinics, table-side architecture reviews, and Z-Score final jury evaluation hosted at Sathyabama IST.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto shrink-0">
            <Link
              href="/schedule#clinics"
              className="text-xs font-mono font-semibold text-slate-200 hover:text-white inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/15 hover:border-white/30 transition-colors"
            >
              <span>Pre-Hack Clinics</span>
              <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
            </Link>
            <Link
              href="/members/leadership"
              className="text-xs font-mono font-semibold text-purple-300 hover:text-white inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/40 border border-purple-500/30 hover:border-purple-400/50 transition-colors"
            >
              <span>Full Committee</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3-Column Mentors & Jury Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Column 1: Faculty Mentors */}
          <div className="p-6 rounded-2xl bg-[#0d0d13] border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider">
                  Faculty Coordinators · CSE
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">CONFIRMED</span>
            </div>

            <div className="divide-y divide-white/10">
              {JURY_AND_MENTORS_SHOWCASE.facultyMentors.map((m) => (
                <div key={m.name} className="py-3 first:pt-1 last:pb-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-white">{m.name}</span>
                    <span className="text-[11px] font-mono text-slate-400">{m.role}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{m.focus}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Cloud Chapter Mentors */}
          <div className="p-6 rounded-2xl bg-[#0d0d13] border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider">
                  AWS SBG Technical Mentors
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">CONFIRMED</span>
            </div>

            <div className="divide-y divide-white/10">
              {JURY_AND_MENTORS_SHOWCASE.chapterMentors.map((m) => (
                <div key={m.name} className="py-3 first:pt-1 last:pb-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-white">{m.name}</span>
                    <span className="text-[11px] font-mono text-sky-300/90">{m.role}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{m.focus}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Visiting AWS & Industry Jury */}
          <div className="p-6 rounded-2xl bg-[#0d0d13] border border-white/15 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider">
                    External Jury Panel
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-400/25">
                  {JURY_AND_MENTORS_SHOWCASE.externalPanelNote.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">
                {JURY_AND_MENTORS_SHOWCASE.externalPanelNote.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {JURY_AND_MENTORS_SHOWCASE.externalPanelNote.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <Link
                href="/sponsors"
                className="text-white hover:text-amber-300 font-semibold inline-flex items-center gap-1.5"
              >
                <span>Join Jury / Sponsor a Track</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
              </Link>
              <a
                href={`mailto:${EVENT_CONFIG.organizer.contactEmail}`}
                className="text-slate-400 hover:text-white inline-flex items-center gap-1"
              >
                <span>Contact Partnerships Desk</span>
              </a>
            </div>
          </div>
        </div>

        {/* Institutional & Community Ecosystem Strip */}
        <div className="pt-4 border-t border-white/10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Building2 className="w-3.5 h-3.5 text-purple-400" />
              <span>HOST ECOSYSTEM &amp; GOVERNANCE AFFILIATIONS</span>
            </div>
            <Link
              href="/sponsors"
              className="text-xs font-mono text-purple-300 hover:text-white inline-flex items-center gap-1"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Corporate &amp; Community Partners Welcome</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {ECOSYSTEM_LOCKUPS.map((item) => (
              <div
                key={item.name}
                className="p-4 rounded-xl bg-[#0d0d13] border border-white/10 flex flex-col justify-between"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300/90 block mb-1">
                  {item.type}
                </span>
                <div className="text-sm font-bold text-white">{item.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
