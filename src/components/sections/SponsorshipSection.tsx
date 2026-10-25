'use client';

import React, { useState } from 'react';
import { PROPOSED_SPONSOR_TIERS, EVENT_CONFIG } from '@/lib/config';
import { Briefcase, Download, CheckCircle, ArrowRight, ShieldAlert, Send, Building, User, Mail, Phone, MessageSquare } from 'lucide-react';

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
    interestedTier: 'title' as any,
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
    } catch (err: any) {
      setErrorMessage(err.message || 'Error recording inquiry. Please email sistawscc@gmail.com.');
    } finally {
      setSubmitting(false);
    }
  };

  const currentTier = PROPOSED_SPONSOR_TIERS.find(t => t.id === selectedTier) || PROPOSED_SPONSOR_TIERS[0];

  return (
    <section id="sponsors" className="relative py-20 lg:py-28 overflow-hidden bg-kairos-darkest">
      
      {/* Background illumination */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-950/20 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30">
            <Briefcase className="w-3.5 h-3.5 text-purple-400" />
            <span>Corporate Collaboration & Talent Discovery</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Sponsorship & <span className="gradient-text-kairos">Partnerships</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Connect your brand with 400+ elite student software engineers, artificial intelligence builders, and founders at the national arena.
          </p>

          {/* Legal / Proposed Notice */}
          <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/25 max-w-2xl mx-auto flex items-center justify-center gap-2 text-xs text-purple-300">
            <ShieldAlert className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <span>
              <strong>Note for Prospective Partners:</strong> All package amounts and deliverables listed below represent proposed frameworks and remain subject to mutual review and formal agreement.
            </span>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/docs/KAIROS_2027_Sponsorship_Prospectus.pdf"
              download="KAIROS_2027_Sponsorship_Prospectus.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-purple-900/40 hover:bg-purple-800/50 border border-purple-500/30 text-purple-200 transition-all shadow-md"
            >
              <Download className="w-4 h-4 text-purple-400" />
              <span>Download Official Prospectus PDF</span>
            </a>

            <button
              onClick={onOpenProspectusModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white/5 hover:bg-white/10 border border-purple-500/20 text-slate-300 transition-all"
            >
              <span>Custom Scope Generator</span>
            </button>
          </div>
        </div>

        {/* Tier Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {PROPOSED_SPONSOR_TIERS.map((tier) => {
            const isSelected = tier.id === selectedTier;
            return (
              <button
                key={tier.id}
                onClick={() => {
                  setSelectedTier(tier.id);
                  setSponsorForm(prev => ({ ...prev, interestedTier: tier.id as any }));
                }}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/50 border border-purple-400/40 scale-105'
                    : 'glass-panel text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span>{tier.name}</span>
                <span className="ml-2 text-xs font-mono opacity-80">({tier.amount})</span>
              </button>
            );
          })}
        </div>

        {/* Selected Tier Spotlight & Deliverables Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left: Tier Details (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl glass-panel-glow border border-purple-500/30 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase font-semibold">
                  {currentTier.statusBadge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
                  {currentTier.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Proposed Support</span>
                <span className="text-2xl font-display font-extrabold text-amber-400">
                  {currentTier.amount}
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
              {currentTier.description}
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold">
                Tier Deliverables & Strategic Benefits
              </h4>
              <div className="space-y-2.5">
                {currentTier.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 p-2.5 rounded-xl bg-slate-950/60 border border-purple-500/15">
                    <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200">
              <strong>Ideal Profile:</strong> {currentTier.recommendedFor}
            </div>
          </div>

          {/* Right: Instant Partner Inquiry Form (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass-panel border border-purple-500/20 space-y-6">
            <div>
              <h3 className="text-xl font-display font-bold text-white">
                Initiate a Partnership
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Direct channel to our Sponsorship & Finance lead (Nangaiyar M).
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3 animate-fadeIn">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Inquiry Received</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Thank you! We have logged your interest in the <strong>{currentTier.name}</strong> tier. An official partnership prospectus and scheduling note will be sent to <strong>{sponsorForm.contactEmail}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSponsorSubmit} className="space-y-3.5">
                {errorMessage && (
                  <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
                    {errorMessage}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-300">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={sponsorForm.companyName}
                    onChange={(e) => setSponsorForm({ ...sponsorForm, companyName: e.target.value })}
                    placeholder="e.g. Acme Cloud Corp"
                    className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-300">Contact Person Name *</label>
                  <input
                    type="text"
                    required
                    value={sponsorForm.contactPerson}
                    onChange={(e) => setSponsorForm({ ...sponsorForm, contactPerson: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-300">Corporate Email *</label>
                  <input
                    type="email"
                    required
                    value={sponsorForm.contactEmail}
                    onChange={(e) => setSponsorForm({ ...sponsorForm, contactEmail: e.target.value })}
                    placeholder="rahul@acme.com"
                    className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-300">Contact Phone (Optional)</label>
                  <input
                    type="tel"
                    value={sponsorForm.contactPhone}
                    onChange={(e) => setSponsorForm({ ...sponsorForm, contactPhone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-300">Target Objectives / Notes</label>
                  <textarea
                    rows={2}
                    value={sponsorForm.customRequirements}
                    onChange={(e) => setSponsorForm({ ...sponsorForm, customRequirements: e.target.value })}
                    placeholder="Tell us about your developer relations, recruitment, or technology goals..."
                    className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-950 transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <span>Request Formal Partnership Scope</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
