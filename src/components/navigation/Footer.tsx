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
    <footer className="relative bg-[#07070b] border-t border-white/10 pt-16 pb-28 sm:pb-36 overflow-hidden text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Institutional Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-white p-1 shrink-0 overflow-hidden shadow-sm">
                <Image
                  src="/assets/sist-logo.png"
                  alt="Sathyabama Institute of Science and Technology"
                  fill
                  sizes="40px"
                  className="object-contain p-0.5"
                  loading="eager"
                />
              </div>
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src="/assets/kairos-hourglass.png"
                  alt="KAIROS 2027 Logo"
                  fill
                  sizes="40px"
                  className="object-contain filter drop-shadow-md"
                  loading="eager"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl tracking-wider text-white">
                  KAIROS <span className="text-sm font-mono text-purple-400 font-normal">2027</span>
                </span>
                <span className="text-xs text-slate-400 font-medium">Sathyabama IST · NAAC A++ (Category-1 University)</span>
              </div>
            </div>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              {EVENT_CONFIG.tagline} {EVENT_CONFIG.subtitle}
            </p>

            <div className="pt-1 text-xs text-slate-300 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span>
                    {EVENT_CONFIG.venue.name}, {EVENT_CONFIG.venue.campus}, Chennai
                  </span>
                  <a
                    href={EVENT_CONFIG.venue.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-[11px] font-mono text-sky-400 hover:text-sky-300 underline inline-flex items-center gap-0.5"
                  >
                    Map <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <a href={`mailto:${EVENT_CONFIG.organizer.contactEmail}`} className="hover:text-purple-300 underline decoration-purple-500/40">
                  {EVENT_CONFIG.organizer.contactEmail}
                </a>
              </div>
            </div>

            {/* Verified Community Channels */}
            <div className="pt-1 flex flex-wrap gap-2 text-[11px] font-mono">
              <a
                href={EVENT_CONFIG.socialHandles.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[36px] px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-slate-200 hover:text-white inline-flex items-center gap-1 transition-colors"
              >
                Instagram <ExternalLink className="w-2.5 h-2.5 text-purple-400" />
              </a>
              <a
                href={EVENT_CONFIG.socialHandles.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[36px] px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-slate-200 hover:text-white inline-flex items-center gap-1 transition-colors"
              >
                LinkedIn <ExternalLink className="w-2.5 h-2.5 text-sky-400" />
              </a>
              <a
                href={EVENT_CONFIG.socialHandles.meetup}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[36px] px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-slate-200 hover:text-white inline-flex items-center gap-1 transition-colors"
              >
                Meetup <ExternalLink className="w-2.5 h-2.5 text-emerald-400" />
              </a>
              <a
                href={EVENT_CONFIG.socialHandles.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[36px] px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-slate-200 hover:text-white inline-flex items-center gap-1 transition-colors"
              >
                X <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
              </a>
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
            <h4 className="text-xs font-mono  text-purple-300 font-semibold mb-4 flex items-center gap-1.5">
              <span>Main Journey</span>
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/tracks" className="hover:text-white transition-colors">5 Enterprise Tracks</Link></li>
              <li><Link href="/schedule" className="hover:text-white transition-colors">48-Hour Agenda</Link></li>
              <li><Link href="/radar" className="hover:text-white transition-colors">Builder Radar</Link></li>
              <li><Link href="/online-qualifier" className="hover:text-white transition-colors">Round 1 Online Qualifier</Link></li>
              <li><Link href="/on-campus" className="hover:text-white transition-colors">Round 2 On-Campus Guide</Link></li>
              <li><Link href="/leaderboard" className="hover:text-white transition-colors">Live Leaderboard &amp; Z-Score</Link></li>
              <li><Link href="/stage" className="hover:text-white transition-colors">Auditorium Stage Screen</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources & Partnerships */}
          <div>
            <h4 className="text-xs font-mono  text-purple-300 font-semibold mb-4">
              Resources & Partnerships
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/resources" className="hover:text-white transition-colors text-sky-400">AWS SBG Learning Library</Link></li>
              <li><Link href="/sponsors" className="hover:text-white transition-colors">Sponsorship Prospectus</Link></li>
              <li><Link href="/rules" className="hover:text-white transition-colors">100% Student IP &amp; Rules</Link></li>
              <li>
                <a
                  href={EVENT_CONFIG.downloads.brochurePdf}
                  download="KAIROS_2027_Official_Brochure.pdf"
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300"
                >
                  <Download className="w-3.5 h-3.5 text-purple-400" />
                  <span>Official Brochure (PDF)</span>
                </a>
              </li>
              <li>
                <a
                  href={EVENT_CONFIG.downloads.pitchTemplatePptx}
                  download="KAIROS_2027_Round0_Pitch_Template.pptx"
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300"
                >
                  <Download className="w-3.5 h-3.5 text-sky-400" />
                  <span>Round 0 Pitch Deck (.pptx)</span>
                </a>
              </li>
              <li>
                <a
                  href="/api/calendar"
                  download="KAIROS_2027_Schedule.ics"
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-400"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .ICS Calendar</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Community & Leadership */}
          <div>
            <h4 className="text-xs font-mono  text-purple-300 font-semibold mb-4">
              AWS SBGL Governance
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/15 flex-shrink-0">
                  <Image
                    src="/assets/aws-sbg-logo.png"
                    alt="AWS Student Builder Group"
                    fill
                    sizes="32px"
                    className="object-cover"
                    loading="eager"
                  />
                </div>
                <span className="text-xs text-slate-200 font-medium">
                  AWS Student Builder Group<br />
                  <span className="text-purple-300 font-semibold">SIST Chapter</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                President Thenappan T - Executive Leadership - Faculty Patrons
              </p>
            <div className="pt-1 flex flex-col gap-2">
                <Link
                  href="/members/leadership"
                  className="min-h-[40px] inline-flex items-center gap-1.5 text-xs text-purple-300 hover:text-white px-3 py-2 rounded bg-purple-950/50 border border-purple-500/30 transition-colors"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>2026 to 27 Leadership Gallery</span>
                </Link>
                <Link
                  href="/members"
                  className="min-h-[40px] inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-2 rounded bg-white/5 border border-white/10 transition-colors"
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
              <strong className="text-purple-400 font-semibold ">Mandatory AWS Co-Branding Disclaimer:</strong>{' '}
              {EVENT_CONFIG.disclaimer.aws}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs">
            <p>© 2026–2027 KAIROS Hackathon. AWS Student Builder Group · SIST Chapter, Sathyabama Institute of Science and Technology.</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
              <Link href="/rules" className="hover:text-white">IP &amp; Conduct</Link>
              {onOpenTerms && (
                <>
                  <span>|</span>
                  <button type="button" onClick={onOpenTerms} className="hover:text-white">
                    Terms &amp; Policy
                  </button>
                </>
              )}
              <span>|</span>
              <a href="https://www.meetup.com/aws-sbg-at-sathyabama-inst-science-and-tech-chennai-campus/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Official Meetup Chapter ↗
              </a>
              <span>|</span>
              <Link href="/admin/login" className="hover:text-purple-300 font-mono text-[11px]">
                Organizer Console
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
