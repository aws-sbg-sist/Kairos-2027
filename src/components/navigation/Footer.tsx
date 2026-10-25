'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Calendar, Download, ShieldCheck, Heart, ExternalLink } from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/config';

interface FooterProps {
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerms }) => {
  return (
    <footer className="relative bg-kairos-darkest border-t border-purple-500/15 pt-16 pb-12 overflow-hidden text-slate-400">
      {/* Background soft glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-purple-950/20 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/assets/kairos-hourglass.png"
                  alt="KAIROS 2027 Logo"
                  fill
                  className="object-contain filter drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-wider text-white">
                KAIROS <span className="text-sm font-mono text-purple-400 font-normal">2027</span>
              </span>
            </div>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              {EVENT_CONFIG.tagline} {EVENT_CONFIG.subtitle}
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>
                  {EVENT_CONFIG.venue.name}, {EVENT_CONFIG.venue.campus}, {EVENT_CONFIG.venue.city} - 600119
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <a href={`mailto:${EVENT_CONFIG.organizer.contactEmail}`} className="hover:text-purple-300 underline decoration-purple-500/30">
                  {EVENT_CONFIG.organizer.contactEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold mb-4">
              Event Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#tracks" className="hover:text-white transition-colors">Technical Tracks</a></li>
              <li><a href="#schedule" className="hover:text-white transition-colors">48-Hour Timetable</a></li>
              <li><a href="#judging" className="hover:text-white transition-colors">Judging Criteria</a></li>
              <li><a href="#awards" className="hover:text-white transition-colors">Awards & Prizes</a></li>
              <li><a href="#sponsors" className="hover:text-white transition-colors">Sponsorship Tiers</a></li>
              <li><a href="#committee" className="hover:text-white transition-colors">Organizing Cadre</a></li>
            </ul>
          </div>

          {/* Column 3: Builder Resources */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold mb-4">
              Resources & Downloads
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/api/calendar"
                  download="KAIROS_2027_Schedule.ics"
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-sky-400"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .ICS Calendar</span>
                </a>
              </li>
              <li>
                <a
                  href="/docs/KAIROS_2027_Sponsorship_Prospectus.pdf"
                  download
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Sponsorship Prospectus</span>
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-white transition-colors text-left"
                >
                  Code of Conduct & Rules
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Notice
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Organizing Community */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold mb-4">
              Organized By
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="relative w-7 h-7">
                  <Image
                    src="/assets/aws-sbg-logo.png"
                    alt="AWS Student Builder Group"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs text-slate-300 font-medium">
                  AWS Student Builder Group<br />
                  <span className="text-slate-400">SIST Chapter</span>
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Department of Computer Science & Engineering, School of Computing
              </p>
              <div className="pt-1">
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 px-2.5 py-1 rounded bg-purple-950/40 border border-purple-500/20"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Organizer Console</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Legal & Institutional Disclaimers */}
        <div className="pt-8 text-[11px] text-slate-400 leading-relaxed space-y-3">
          <p>
            <strong className="text-slate-400">Official Disclaimer:</strong> {EVENT_CONFIG.disclaimer.aws}
          </p>
          <p>
            <strong className="text-slate-400">Proposal Notice:</strong> {EVENT_CONFIG.disclaimer.proposals}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-900 text-xs">
            <p>© 2026–2027 KAIROS Hackathon. AWS Student Builder Group — SIST Chapter. All rights reserved.</p>
            <p className="flex items-center gap-1 text-slate-400">
              Built with precision for builders across India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
