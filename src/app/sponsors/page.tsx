'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  Award,
  CheckCircle2,
  Download,
  Send,
  ArrowRight,
  Users,
  Briefcase,
  Layers,
  ShieldCheck,
  Flame,
  PhoneCall,
  Mail,
  FileText
} from 'lucide-react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { EVENT_CONFIG, SPONSOR_TIERS, HIGHER_MANAGEMENT } from '@/lib/config';

export default function SponsorsPage() {
  const [selectedTier, setSelectedTier] = useState<string>('powered');
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    interestedTier: 'Co-Powered By Partner (₹1,00,000)',
    customRequirements: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTierSelect = (tierName: string, tierAmount: string) => {
    setSelectedTier(tierName);
    setFormData(prev => ({ ...prev, interestedTier: `${tierName} (${tierAmount})` }));
    const formElement = document.getElementById('inquiry-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/sponsor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit inquiry. Please email us directly.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again or reach out to sistawscc@gmail.com');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-aws-canvas text-slate-100 flex flex-col justify-between">
      <Navbar />
      <div className="pt-28 pb-24 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header Breadcrumb & Tag */}
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs text-slate-400">
            <Link href="/" className="hover:text-slate-200">Home</Link>
            <span>/</span>
            <span className="text-purple-400 font-mono">Corporate Partnerships</span>
          </div>

          {/* Hero Title */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div role="status" className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-400 text-xs font-mono font-medium mb-5 shadow-md">
              <div className="relative w-4 h-4 rounded overflow-hidden">
                <Image
                  src="/assets/sponsors.png"
                  alt="Sponsors"
                  fill
                  className="object-contain"
                />
              </div>
              <span>Strategic Enterprise Collaboration</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
              Partner with India’s <br />
              <span className="gradient-text-kairos bg-clip-text text-transparent">
                Flagship 48-Hour Cloud Hackathon
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              Connect directly with 100 shortlisted national engineering teams (400 to 600 elite builders) selected from 2,000+ national applicants through our dual-phase technical crucible.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/docs/KAIROS_2027_Sponsorship_Prospectus.pdf"
                download="KAIROS_2027_Sponsorship_Prospectus.pdf"
                data-cursor-label="PDF"
                className="min-h-[48px] inline-flex items-center gap-2.5 px-6 py-3 rounded-xl btn-primary-themed text-white font-bold text-sm transition shadow-lg shadow-purple-900/40 shine-hover active:scale-[0.96]"
              >
                <Download className="w-4 h-4" />
                Download Sponsorship Prospectus (PDF)
              </a>
              <a
                href="#inquiry-form"
                data-cursor-label="INQUIRE"
                className="min-h-[48px] inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-purple-500/50 text-slate-200 font-medium text-sm transition shine-hover active:scale-[0.96]"
              >
                <Send className="w-4 h-4 text-purple-400" />
                Submit Sponsorship Inquiry
              </a>
            </div>
          </div>

          {/* ROI Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 cyber-edge-card group">
              <div className="w-10 h-10 rounded-xl bg-purple-950/60 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-3xl font-black text-white font-mono mb-1 tabular-nums">400 to 600</div>
              <div className="text-xs text-purple-400 font-semibold  mb-2">Vetted National Hackers</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every contestant on campus has passed Phase 0 screening and a 3-day Round 1 technical defense with AWS Solutions Architects.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 cyber-edge-card group">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="text-3xl font-black text-white font-mono mb-1">Opt-In</div>
              <div className="text-xs text-sky-400 font-semibold  mb-2">Pre-Screened Resumes</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Instant access to verified GitHub portfolios, AWS certification credentials, and code submissions of all 100 finalist teams.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 cyber-edge-card group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <div className="text-3xl font-black text-white font-mono mb-1 tabular-nums">48 Hours</div>
              <div className="text-xs text-emerald-400 font-semibold  mb-2">Direct API Integration</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Have hundreds of brilliant engineers build, test, and validate proof-of-concepts directly on your SDK, APIs, or cloud platforms.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 cyber-edge-card group">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-3xl font-black text-white font-mono mb-1">Dual-Tier</div>
              <div className="text-xs text-purple-400 font-semibold  mb-2">Authentic Merit</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rigorous two-phase screening eliminates pay-to-play economics, attracting authentic tier-1 engineering talent from every corner of India.
              </p>
            </div>
          </div>

          {/* Tier Cards Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Enterprise Partnership Tiers</h2>
            <p className="text-slate-400 text-sm">
              Select a package tailored to your branding, recruitment, or developer evangelism objectives.
            </p>
          </div>

          {/* Tiers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {SPONSOR_TIERS.map((tier) => {
              const isSelected = selectedTier === tier.id;
              return (
                <div
                  key={tier.id}
                  className={`rounded-2xl p-7 transition flex flex-col justify-between border relative cyber-edge-card ${tier.id === 'title'
                      ? 'bg-gradient-to-b from-purple-950/30 via-slate-900 to-slate-950 border-purple-500 shadow-xl shadow-purple-900/30'
                      : tier.id === 'powered'
                        ? 'bg-slate-900/90 border-sky-500/50 shadow-xl shadow-sky-950'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    }`}
                >
                  {tier.id === 'title' && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-700 to-purple-900 text-white text-xs font-black   shadow-md">
                      Most Prestigious
                    </div>
                  )}
                  {tier.id === 'powered' && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-sky-500 text-white text-xs font-black   shadow-md">
                      High Impact
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {tier.statusBadge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                    <div className="text-3xl font-black text-white font-mono mb-4">
                      {tier.amount}
                    </div>
                    <p className="text-xs text-slate-400 mb-6 min-h-[36px]">
                      {tier.description}
                    </p>

                    <div className="space-y-3 mb-8 border-t border-slate-800/80 pt-6">
                      <div className="text-xs font-mono  text-slate-400 font-bold mb-2">
                        Key Deliverables & Access:
                      </div>
                      {tier.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      data-cursor-label="SELECT"
                      onClick={() => handleTierSelect(tier.name, tier.amount)}
                      className={`w-full min-h-[46px] py-3 px-4 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 shine-hover active:scale-[0.96] group ${tier.id === 'title'
                          ? 'btn-primary-themed text-white'
                          : tier.id === 'powered'
                            ? 'bg-sky-500 text-white hover:bg-blue-600'
                            : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                        }`}
                    >
                      <span>Select {tier.name.split(' ')[0]}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-[11px] text-center text-slate-400 mt-2">
                      Recommended for: {tier.recommendedFor}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Partnership Inquiry Form */}
          <div id="inquiry-form" className="max-w-3xl mx-auto rounded-3xl bg-slate-900/90 border border-slate-800 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-purple-950/60 text-purple-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Direct Corporate Partnership Inquiry</h2>
                <p className="text-xs text-slate-400">
                  Connect directly with President Thenappan T and CPFO Nangaiyar M
                </p>
              </div>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center my-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">Partnership Inquiry Registered!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
                  Thank you for your interest in supporting KAIROS 2027. Our sponsorship team will review your requirements and reach out within 12 business hours.
                </p>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 inline-block text-left">
                  <div><strong>Direct Contact:</strong> Thenappan T (President & SBGL)</div>
                  <div><strong>Email:</strong> sistawscc@gmail.com</div>
                  <div><strong>Mobile:</strong> +91 6381801640</div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono  text-slate-300 mb-2">
                      Company / Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Acme Cloud Corp"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-purple-500 text-sm text-white placeholder-slate-400 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono  text-slate-300 mb-2">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactPerson}
                      onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-purple-500 text-sm text-white placeholder-slate-400 outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono  text-slate-300 mb-2">
                      Corporate Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.contactEmail}
                      onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
                      placeholder="s.jenkins@acme.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-purple-500 text-sm text-white placeholder-slate-400 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono  text-slate-300 mb-2">
                      Contact Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={e => setFormData({ ...formData, contactPhone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-purple-500 text-sm text-white placeholder-slate-400 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono  text-slate-300 mb-2">
                    Interested Partnership Tier *
                  </label>
                  <select
                    value={formData.interestedTier}
                    onChange={e => setFormData({ ...formData, interestedTier: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-purple-500 text-sm text-white outline-none transition"
                  >
                    <option value="Title Presenting Partner (₹2,00,000)">Title Presenting Partner (₹2,00,000)</option>
                    <option value="Co-Powered By Partner (₹1,00,000)">Co-Powered By Partner (₹1,00,000)</option>
                    <option value="Associate / Gold Partner (₹50,000)">Associate / Gold Partner (₹50,000)</option>
                    <option value="Technical Track Partner (₹25,000)">Technical Track Partner (₹25,000)</option>
                    <option value="In-Kind Fuel / Refreshments / Cloud Credits">In-Kind Fuel / Refreshments / Cloud Credits</option>
                    <option value="Custom Bespoke Partnership">Custom Bespoke Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono  text-slate-300 mb-2">
                    Custom Requirements, Goals or Questions
                  </label>
                  <textarea
                    rows={3}
                    value={formData.customRequirements}
                    onChange={e => setFormData({ ...formData, customRequirements: e.target.value })}
                    placeholder="Tell us about specific recruitment profiles, API workshops, or product showcases you wish to host..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-purple-500 text-sm text-white placeholder-slate-400 outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-purple-900 text-white font-bold text-sm hover:brightness-110 transition shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span>Transmitting Proposal...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Corporate Partnership Proposal
                    </>
                  )}
                </button>

                <div className="text-center">
                  <p className="text-[11px] text-slate-400">
                    By submitting, you agree to receive communications regarding KAIROS 2027 from AWS Student Builder Group SIST.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Mandatory AWS SBGL Disclaimer Callout */}
          <div className="mt-16 p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center max-w-4xl mx-auto">
            <p className="text-xs text-slate-400 leading-relaxed">
              {EVENT_CONFIG.disclaimer.aws} {EVENT_CONFIG.disclaimer.proposals}
            </p>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
