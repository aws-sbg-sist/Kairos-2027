'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PROPOSED_SPONSOR_TIERS, EVENT_CONFIG } from '@/lib/config';
import { Briefcase, Download, CheckCircle, ArrowRight, ShieldAlert, Send, Building, User, Mail, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { sound } from '@/lib/audio';
import { SpotlightCard } from '@/components/animation/SpotlightCard';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { Marquee } from '@/components/animation/Marquee';
import { SponsorInquiry } from '@/types';

interface SponsorshipSectionProps {
  onOpenProspectusModal: () => void;
}

export const SponsorshipSection: React.FC<SponsorshipSectionProps> = ({ onOpenProspectusModal }) => {
  const [selectedTier, setSelectedTier] = useState<string>('title');
  const [sponsorForm, setSponsorForm] = useState({
    companyName: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    interestedTier: 'title' as SponsorInquiry['interestedTier'],
    customRequirements: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSponsorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/sponsor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sponsorForm),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSubmitted(true);
      sound?.playSuccess?.();
    } catch (err: any) {
      setErrorMessage(err.message || 'Error recording inquiry. Please email sistawscc@gmail.com.');
    } finally {
      setSubmitting(false);
    }
  };

  const currentTier = PROPOSED_SPONSOR_TIERS.find(t => t.id === selectedTier) || PROPOSED_SPONSOR_TIERS[0];

  const sponsorTechLogos = [
    { name: 'Amazon Web Services', tag: 'Cloud Platform', color: '#a855f7' },
    { name: 'Anthropic', tag: 'AI Research', color: '#d97706' },
    { name: 'MongoDB Atlas', tag: 'Multi-Cloud Data', color: '#10b981' },
    { name: 'GitHub Enterprise', tag: 'DevOps & Copilot', color: '#a855f7' },
    { name: 'Cloudflare', tag: 'Edge Security', color: '#f97316' },
    { name: 'Datadog', tag: 'Observability', color: '#6366f1' },
    { name: 'Red Hat', tag: 'Open Hybrid Cloud', color: '#ef4444' },
    { name: 'Stripe', tag: 'Financial Infrastructure', color: '#6366f1' },
  ];

  return (
    <section id="sponsors" className="relative py-16 lg:py-24 overflow-hidden bg-kairos-darkest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <ScrollReveal direction="down" distance={16}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30 shadow-md">
              <div className="relative w-5 h-5 rounded overflow-hidden">
                <Image
                  src="/assets/sponsors.png"
                  alt="Sponsors"
                  fill
                  className="object-contain"
                />
              </div>
              <span>Corporate Collaboration & Talent Discovery</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Sponsorship & <span className="gradient-text-kairos">Partnerships</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.2}>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
              Connect your brand with 400+ shortlisted student engineers, ML practitioners, and founders — screened through a two-tier technical qualifier.
            </p>
          </ScrollReveal>

          {/* Legal / Proposed Notice */}
          <ScrollReveal direction="up" distance={16} delay={0.25}>
            <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/25 max-w-2xl mx-auto flex items-center justify-center gap-2.5 text-xs text-purple-300 shadow-md">
              <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0" />
              <span>
                <strong>Note for Prospective Partners:</strong> All package amounts and deliverables listed below represent proposed frameworks subject to mutual review and formal agreement.
              </span>
            </div>
          </ScrollReveal>

          {/* Action CTAs */}
          <ScrollReveal direction="up" distance={16} delay={0.3}>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/docs/KAIROS_2027_Sponsorship_Prospectus.pdf"
                download="KAIROS_2027_Sponsorship_Prospectus.pdf"
                onClick={() => sound?.playClick()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-purple-900/40 hover:bg-purple-800/50 border border-purple-500/30 text-purple-200 transition-all shadow-md group"
              >
                <Download className="w-4 h-4 text-purple-400 group-hover:translate-y-0.5 transition-transform" />
                <span>Download Official Prospectus PDF</span>
              </a>

              <button
                onClick={() => {
                  sound?.playClick();
                  onOpenProspectusModal();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold btn-primary-themed text-white transition-all shadow-lg shadow-purple-900/30"
              >
                <Briefcase className="w-4 h-4" />
                <span>Instant Sponsorship Matrix & Inquiry</span>
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Continuous Partner Marquee */}
        <div className="mb-16 space-y-4">
          <div className="text-center text-xs font-mono uppercase tracking-widest text-slate-400">
            Enterprise & Cloud Ecosystem Alignment
          </div>
          <Marquee speed={24} pauseOnHover={true}>
            {sponsorTechLogos.map((logo, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-aws-card/60 border border-slate-700/50 hover:border-purple-500/50 transition-all backdrop-blur-md"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: logo.color }}
                />
                <span className="font-display font-bold text-sm text-white">
                  {logo.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                  {logo.tag}
                </span>
              </div>
            ))}
          </Marquee>
        </div>

        {/* Interactive Tier Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Tier Switcher (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase text-slate-400 block tracking-wider font-semibold mb-2">
              Select Sponsorship Tier
            </span>
            {PROPOSED_SPONSOR_TIERS.map((tier) => {
              const isSelected = tier.id === selectedTier;
              return (
                <button
                  key={tier.id}
                  onClick={() => {
                    sound?.playClick();
                    setSelectedTier(tier.id);
                  }}
                  className={`w-full p-4 rounded-2xl text-left transition-all duration-200 border flex items-center justify-between ${
                    isSelected
                      ? 'bg-purple-950/60 border-2 border-purple-500 text-white shadow-lg shadow-purple-900/30 scale-[1.02]'
                      : 'bg-aws-card/70 border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-mono text-purple-300 block uppercase font-bold">
                      {tier.statusBadge}
                    </span>
                    <span className="font-display font-bold text-base block text-white">
                      {tier.name}
                    </span>
                  </div>
                  <span className="font-display font-black text-sm sm:text-base text-white">
                    {tier.amount}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Tier Spotlight Details (8 cols) */}
          <div className="lg:col-span-8">
            <SpotlightCard
              spotlightColor="rgba(238, 5, 242, 0.2)"
              borderColor="rgba(238, 5, 242, 0.45)"
              className="p-6 sm:p-8 rounded-3xl bg-aws-card/90 border border-purple-500/30 shadow-2xl space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-purple-300 font-bold block uppercase tracking-wider mb-1">
                    {currentTier.statusBadge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                    {currentTier.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-3xl sm:text-4xl font-display font-black text-white block">
                    {currentTier.amount}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 block">
                    Proposed Investment
                  </span>
                </div>
              </div>

              {/* Tier Deliverables Checklist */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase text-slate-400 block tracking-wider font-semibold">
                  Key Partner Privileges & Deliverables
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentTier.highlights.map((del, i) => (
                    <div key={i} className="flex items-start gap-2.5 py-2.5 px-3 rounded-lg bg-white/[0.03] border-b border-white/5">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300 leading-snug">{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
                <span className="text-xs font-mono text-purple-300">
                  Custom activation packages and track sponsorships negotiable.
                </span>
                <button
                  onClick={() => {
                    sound?.playClick();
                    onOpenProspectusModal();
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold btn-primary-themed text-white shadow-md"
                >
                  Initiate Discussion for this Tier
                </button>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
};
