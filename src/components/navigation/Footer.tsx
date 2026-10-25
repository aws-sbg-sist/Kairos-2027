'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Calendar, Download, ShieldCheck, Heart, ExternalLink, Award, Users } from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/config';

interface FooterProps {
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerms }) => {
  return (
    <footer className="relative bg-aws-squidInk/95 border-t border-aws-orange/20 pt-16 pb-12 overflow-hidden text-slate-300">
      {/* Background soft glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-aws-orange/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-700/60">
          
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/assets/kairos-hourglass.png"
                  alt="KAIROS 2027 Logo"
                  fill
                  className="object-contain filter drop-shadow-[0_0_15px_rgba(255,153,0,0.5)]"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-2xl tracking-wider text-white">
                  KAIROS <span className="text-sm font-mono text-aws-orange font-normal">2027</span>
                </span>
                <span className="text-xs text-slate-400 font-medium">Grand Edition · National Technical Hackathon</span>
              </div>
            </div>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              {EVENT_CONFIG.tagline} {EVENT_CONFIG.subtitle}
            </p>

            <div className="pt-1 text-xs text-slate-300 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-aws-orange flex-shrink-0 mt-0.5" />
                <span>
                  {EVENT_CONFIG.venue.name}, {EVENT_CONFIG.venue.campus}, Chennai - 600119
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-aws-orange flex-shrink-0" />
                <a href={`mailto:${EVENT_CONFIG.organizer.contactEmail}`} className="hover:text-amber-300 underline decoration-aws-orange/40">
                  {EVENT_CONFIG.organizer.contactEmail}
                </a>
              </div>
            </div>

            {/* Official Hashtags */}
            <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] font-mono text-slate-400">
              {EVENT_CONFIG.hashtags.slice(0, 4).map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: Event Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold mb-4 flex items-center gap-1.5">
              <span>Main Journey</span>
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/tracks" className="hover:text-white transition-colors">5 Enterprise Tracks</Link></li>
              <li><Link href="/#schedule" className="hover:text-white transition-colors">48-Hour Agenda</Link></li>
              <li><Link href="/online-qualifier" className="hover:text-white transition-colors">Round 1 Online Qualifier</Link></li>
              <li><Link href="/on-campus" className="hover:text-white transition-colors">Round 2 On-Campus Guide</Link></li>
              <li><Link href="/leaderboard" className="hover:text-white transition-colors">Live Leaderboard & Z-Score</Link></li>
              <li><Link href="/stage" className="hover:text-white transition-colors">Auditorium Stage Screen</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources & Referrals */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold mb-4">
              Resources & Partner
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/resources" className="hover:text-white transition-colors text-sky-400">AWS SBG Learning Library</Link></li>
              <li><Link href="/refer-sponsor" className="hover:text-white transition-colors text-emerald-400 font-semibold">Earn 10%–15% Referral Cash</Link></li>
              <li><Link href="/sponsors" className="hover:text-white transition-colors">Sponsorship Prospectus</Link></li>
              <li><Link href="/rules" className="hover:text-white transition-colors">100% Student IP & Rules</Link></li>
              <li><Link href="/csat" className="hover:text-white transition-colors">Post-Event CSAT Survey</Link></li>
              <li>
                <a
                  href="/api/calendar"
                  download="KAIROS_2027_Schedule.ics"
                  className="hover:text-white transition-colors flex items-center gap-1 text-slate-400"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .ICS Calendar</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Community & Leadership */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold mb-4">
              AWS SBGL Governance
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="relative w-7 h-7 flex-shrink-0">
                  <Image
                    src="/assets/aws-sbg-logo.png"
                    alt="AWS Student Builder Group"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs text-slate-200 font-medium">
                  AWS Student Builder Group<br />
                  <span className="text-amber-300 font-semibold">SIST Chapter</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                President Thenappan T (Reg: 44110855) · Super Heads · Faculty Patrons
              </p>
              <div className="pt-1 flex flex-col gap-2">
                <Link
                  href="/members/leadership"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white px-2.5 py-1.5 rounded bg-aws-orange/15 border border-aws-orange/30 transition-colors"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>2026–27 Leadership Gallery</span>
                </Link>
                <Link
                  href="/members"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded bg-white/5 border border-white/10 transition-colors"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>106-Member Recognition Wall</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Legal & Co-Branding Disclaimers */}
        <div className="pt-8 text-[11px] text-slate-400 leading-relaxed space-y-3">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/50">
            <p className="text-slate-300">
              <strong className="text-amber-400 font-semibold uppercase tracking-wider">Mandatory AWS Co-Branding Disclaimer:</strong>{' '}
              {EVENT_CONFIG.disclaimer.aws}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs">
            <p>© 2026–2027 KAIROS Hackathon. AWS Student Builder Group — SIST Chapter. Sathyabama Institute of Science and Technology.</p>
            <div className="flex items-center gap-4 text-slate-400">
              <Link href="/rules" className="hover:text-white">IP & Conduct</Link>
              <span>•</span>
              <a href="https://meetup.com/aws-student-builder-group-sist" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Official Meetup Chapter ↗
              </a>
              <span>•</span>
              <span className="text-emerald-400 font-mono">100% Free · ₹0 Fee</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
