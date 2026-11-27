'use client';

import React from 'react';
import Link from 'next/link';
import { EVENT_CONFIG, JURY_AND_MENTORS_SHOWCASE, ECOSYSTEM_LOCKUPS } from '@/lib/config';
import { ArrowRight, GraduationCap, Cloud, Users, Building2, Award } from 'lucide-react';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { KineticText } from '@/components/animation/KineticText';
import { SpotlightCard } from '@/components/animation/SpotlightCard';
import { sound } from '@/lib/audio';
import { haptics } from '@/lib/haptics';

export const MentorsAndPartnersSection: React.FC = () => {
  return (
    <section id="mentors" className="relative py-16 lg:py-24 overflow-hidden bg-[#07070b] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header */}
        <ScrollReveal direction="up" distance={16}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-300/90 block">
                Jury, Cloud Mentors &amp; Institutional Ecosystem
              </span>
              <KineticText
                text="Mentored by Faculty & Cloud Builders"
                highlightWords={['Cloud', 'Builders']}
                className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight"
              />
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Pre-event technical clinics, table-side architecture reviews, and Z-Score final jury evaluation hosted at Sathyabama IST.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto shrink-0">
              <Link
                href="/schedule#clinics"
                data-cursor-label="CLINICS"
                onClick={() => {
                  sound?.playClick();
                  haptics?.light();
                }}
                className="min-h-[44px] text-xs font-mono font-semibold text-slate-200 hover:text-white inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-purple-500/45 transition-colors active:scale-[0.96] shine-hover group"
              >
                <span>Pre-Hack Clinics</span>
                <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/members/leadership"
                data-cursor-label="CADRE"
                onClick={() => {
                  sound?.playClick();
                  haptics?.light();
                }}
                className="min-h-[44px] text-xs font-mono font-semibold text-purple-200 hover:text-white inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/35 hover:border-purple-400/60 transition-colors active:scale-[0.96] shine-hover group"
              >
                <span>Full Committee</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* 3-Column Mentors & Jury Spotlight Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Column 1: Faculty Mentors */}
          <ScrollReveal direction="up" distance={18} delay={0.05} className="h-full">
            <SpotlightCard
              enableTilt={true}
              maxTilt={3.5}
              spotlightColor="rgba(168, 85, 247, 0.16)"
              borderColor="rgba(168, 85, 247, 0.4)"
              className="p-6 bg-[#0d0d13] border border-white/10 space-y-4 h-full"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider">
                    Faculty Coordinators · CSE
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-beacon" />
                  CONFIRMED
                </span>
              </div>

              <div className="divide-y divide-white/10">
                {JURY_AND_MENTORS_SHOWCASE.facultyMentors.map((m) => (
                  <div
                    key={m.name}
                    className="py-3 px-2 -mx-2 rounded-lg transition-colors duration-200 hover:bg-white/[0.03] group/m first:pt-2 last:pb-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-white group-hover/m:text-purple-200 transition-colors">{m.name}</span>
                      <span className="text-[11px] font-mono text-slate-400">{m.role}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{m.focus}</p>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </ScrollReveal>

          {/* Column 2: Cloud Chapter Mentors */}
          <ScrollReveal direction="up" distance={18} delay={0.12} className="h-full">
            <SpotlightCard
              enableTilt={true}
              maxTilt={3.5}
              spotlightColor="rgba(56, 189, 248, 0.16)"
              borderColor="rgba(56, 189, 248, 0.42)"
              className="p-6 bg-[#0d0d13] border border-white/10 space-y-4 h-full"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider">
                    AWS SBG Technical Mentors
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-beacon" />
                  CONFIRMED
                </span>
              </div>

              <div className="divide-y divide-white/10">
                {JURY_AND_MENTORS_SHOWCASE.chapterMentors.map((m) => (
                  <div
                    key={m.name}
                    className="py-3 px-2 -mx-2 rounded-lg transition-colors duration-200 hover:bg-sky-500/[0.04] group/m first:pt-2 last:pb-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-white group-hover/m:text-sky-200 transition-colors">{m.name}</span>
                      <span className="text-[11px] font-mono text-sky-300/90">{m.role}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{m.focus}</p>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </ScrollReveal>

          {/* Column 3: Visiting AWS & Industry Jury */}
          <ScrollReveal direction="up" distance={18} delay={0.18} className="h-full">
            <SpotlightCard
              enableTilt={true}
              maxTilt={3.5}
              spotlightColor="rgba(245, 158, 11, 0.16)"
              borderColor="rgba(251, 191, 36, 0.4)"
              className="p-6 bg-[#0d0d13] border border-white/15 h-full"
            >
              <div className="flex flex-col justify-between h-full space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-300" />
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
                    data-cursor-label="PARTNER"
                    className="min-h-[44px] px-1 text-white hover:text-amber-300 font-semibold inline-flex items-center gap-1.5 group link-underline-sweep"
                  >
                    <span>Join Jury / Sponsor a Track</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <a
                    href={`mailto:${EVENT_CONFIG.organizer.contactEmail}`}
                    className="min-h-[44px] px-1 text-slate-400 hover:text-white inline-flex items-center gap-1 link-underline-sweep"
                  >
                    <span>Contact Partnerships Desk</span>
                  </a>
                </div>
              </div>
            </SpotlightCard>
          </ScrollReveal>
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
              className="min-h-[44px] px-1 text-xs font-mono text-purple-300 hover:text-white inline-flex items-center gap-1.5 group link-underline-sweep"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Corporate &amp; Community Partners Welcome</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {ECOSYSTEM_LOCKUPS.map((item) => (
              <div
                key={item.name}
                className="p-4 rounded-xl bg-[#0d0d13] border border-white/10 cyber-edge-card flex flex-col justify-between group"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300/90 block mb-1">
                  {item.type}
                </span>
                <div className="text-sm font-bold text-white group-hover:text-purple-200 transition-colors">{item.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
