'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  DollarSign, 
  Lock, 
  Clock, 
  Search, 
  Send, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Building2, 
  HelpCircle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { EVENT_CONFIG, SPONSOR_REFERRAL_TIERS } from '@/lib/config';

export default function ReferSponsorPage() {
  // Commission Calculator State
  const [dealAmount, setDealAmount] = useState<number>(100000);
  const commissionRate = dealAmount >= 200000 ? 0.15 : dealAmount >= 100000 ? 0.12 : 0.10;
  const estimatedCommission = Math.round(dealAmount * commissionRate);

  // Status Lookup State
  const [searchCode, setSearchCode] = useState('');
  const [lookupResult, setLookupResult] = useState<any>(null);
  const [lookupError, setLookupError] = useState('');
  const [lookingUp, setLookingUp] = useState(false);

  // Referral Submission Form State
  const [formData, setFormData] = useState({
    referrerName: '',
    referrerEmail: '',
    referrerPhone: '',
    referrerCollege: '',
    referrerUpiId: '',
    companyName: '',
    decisionMakerName: '',
    decisionMakerEmail: '',
    decisionMakerDesignation: '',
    estimatedDealTier: 'POWERED_100K',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<any>(null);
  const [submitError, setSubmitError] = useState('');

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;
    setLookingUp(true);
    setLookupError('');
    setLookupResult(null);

    try {
      const res = await fetch(`/api/v1/refer-sponsor?code=${encodeURIComponent(searchCode.trim())}`);
      const data = await res.json();
      if (res.ok && data.success && data.lead) {
        setLookupResult(data.lead);
      } else {
        setLookupError(data.error || 'Referral lead code not found.');
      }
    } catch (err) {
      setLookupError('Network error checking code status.');
    } finally {
      setLookingUp(false);
    }
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/v1/refer-sponsor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success && data.lead) {
        setSubmittedLead(data.lead);
      } else {
        setSubmitError(data.error || 'Failed to submit referral lead.');
      }
    } catch (err) {
      setSubmitError('Failed to connect to referral intake service.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 pt-28 pb-24">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[500px] bg-gradient-to-b from-[#10B981]/10 via-[#FF9900]/5 to-transparent blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-xs text-slate-400">
          <Link href="/" className="hover:text-slate-200">Home</Link>
          <span>/</span>
          <Link href="/sponsors" className="hover:text-slate-200">Sponsors</Link>
          <span>/</span>
          <span className="text-[#10B981] font-mono">Rainmaker Referral Hub</span>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-xs font-mono font-bold tracking-wider uppercase mb-5">
            <TrendingUp className="w-3.5 h-3.5" />
            Crowdsourced Corporate Rainmaker Program
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
            Refer a Corporate Sponsor. <br />
            <span className="bg-gradient-to-r from-[#10B981] via-emerald-400 to-[#FF9900] bg-clip-text text-transparent">
              Earn 10%–15% Pure Cash Commission.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
            Open to every student and builder in India. Connect us with decision-makers at corporate brands, tech firms, or startups. When the sponsorship agreement clears, receive up to <strong className="text-[#10B981]">₹30,000 pure cash</strong> transferred straight to your UPI ID.
          </p>
        </div>

        {/* Commission Calculator & Lock Guarantee Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch">
          
          {/* Interactive Calculator (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-slate-900/90 border border-slate-800 p-8 sm:p-10 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#10B981]/15 text-[#10B981]">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Live Commission Calculator</h3>
                    <p className="text-xs text-slate-400">Slide to estimate your instant cash earnings</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {Math.round(commissionRate * 100)}% Cash Payout
                </span>
              </div>

              {/* Slider */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm font-mono text-slate-300">
                  <span>Sponsored Deal Size:</span>
                  <span className="text-2xl font-black text-white">₹{dealAmount.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="25000"
                  max="200000"
                  step="25000"
                  value={dealAmount}
                  onChange={(e) => setDealAmount(Number(e.target.value))}
                  className="w-full h-3 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-[#10B981]"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>₹25,000 (Track)</span>
                  <span>₹50,000 (Gold)</span>
                  <span>₹1,00,000 (Powered)</span>
                  <span>₹2,00,000 (Title)</span>
                </div>
              </div>

              {/* Commission Earnings Highlight */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-950 to-amber-950/30 border border-emerald-500/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wider font-mono text-slate-400 font-bold mb-1">
                    Your Guaranteed Cash Reward:
                  </div>
                  <div className="text-4xl font-black text-[#10B981] font-mono">
                    ₹{estimatedCommission.toLocaleString('en-IN')}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Transferred directly to your UPI ID within 48–72 hours of sponsor fund receipt.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center shrink-0">
                  <div className="text-[11px] text-slate-400 font-mono">Honors Added:</div>
                  <div className="text-xs font-bold text-[#FF9900]">Corporate Rainmaker Badge</div>
                  <div className="text-[11px] text-slate-300">VIP Pass to Kairos 2027</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Verified student payouts disbursed by SIST Student Builder Group Treasury.</span>
              <span className="font-mono text-slate-400">Zero Tax Deduction on Student Bursaries</span>
            </div>
          </div>

          {/* 21-Day Lock & Transparency Box (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-900/90 border border-slate-800 p-8 sm:p-10 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FF9900]/15 flex items-center justify-center text-[#FF9900] mb-6">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">The 21-Day Exclusive Lead Lock</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                We believe in absolute fairness and credit protection for students:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-1" />
                  <p className="text-xs text-slate-300">
                    <strong className="text-white">Timestamped Lock:</strong> The moment you submit a verified company lead, it is locked to your student profile for 21 days.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-1" />
                  <p className="text-xs text-slate-300">
                    <strong className="text-white">Zero Poaching:</strong> No other student or organizer can claim commission on your company while your lock is active.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-1" />
                  <p className="text-xs text-slate-300">
                    <strong className="text-white">Executive Outreach:</strong> Our Chief Partnership Officer (CPFO Nikki Nangaiyar) and President Thenappan T handle negotiations, presentations, and contracts.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-1" />
                  <p className="text-xs text-slate-300">
                    <strong className="text-white">Instant UPI Transfer:</strong> Once funds hit the university escrow, your payout is credited automatically.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Need personal pitch collateral?</span>
              <Link href="/sponsors" className="text-[#FF9900] hover:underline inline-flex items-center gap-1 font-semibold">
                View Sponsor Tiers <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* Lead Submission Form */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900/95 border border-slate-800 p-8 sm:p-12 shadow-2xl mb-20 backdrop-blur-xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Submit Corporate Lead</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Provide the details of your corporate contact and your student UPI payout details to lock this lead.
            </p>
          </div>

          {submittedLead ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
              <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Lead Registered & 21-Day Lock Active!</h3>
              <p className="text-sm text-slate-300 mb-6 max-w-md mx-auto">
                Your referral for <strong className="text-white">{submittedLead.companyName}</strong> has been secured. Your tracking code is:
              </p>
              
              <div className="inline-block px-6 py-3 rounded-xl bg-slate-950 border border-emerald-500/50 font-mono text-xl font-black text-emerald-400 mb-6 tracking-wider">
                {submittedLead.referralCode}
              </div>

              <div className="text-xs text-slate-400 max-w-lg mx-auto mb-8 space-y-1">
                <div><strong>Referrer:</strong> {submittedLead.referrerName}</div>
                <div><strong>UPI Payout ID:</strong> {submittedLead.referrerUpiId}</div>
                <div><strong>Lock Expiry:</strong> {new Date(submittedLead.lockExpiryDate).toLocaleDateString()}</div>
                <div><strong>Status:</strong> {submittedLead.status}</div>
              </div>

              <button
                type="button"
                onClick={() => setSubmittedLead(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
              >
                Submit Another Lead
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitLead} className="space-y-8">
              {submitError && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  {submitError}
                </div>
              )}

              {/* Section 1: Referrer Details */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#10B981] mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[10px]">1</span>
                  Your Details (For Commission Payout)
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.referrerName}
                      onChange={e => setFormData({ ...formData, referrerName: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-[#10B981] text-sm text-white placeholder-slate-400 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2">Your College / Institution</label>
                    <input
                      type="text"
                      value={formData.referrerCollege}
                      onChange={e => setFormData({ ...formData, referrerCollege: e.target.value })}
                      placeholder="e.g. Sathyabama IST / IIT Madras"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-[#10B981] text-sm text-white placeholder-slate-400 outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.referrerEmail}
                      onChange={e => setFormData({ ...formData, referrerEmail: e.target.value })}
                      placeholder="rahul@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-[#10B981] text-sm text-white placeholder-slate-400 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2">WhatsApp / Phone</label>
                    <input
                      type="tel"
                      value={formData.referrerPhone}
                      onChange={e => setFormData({ ...formData, referrerPhone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-[#10B981] text-sm text-white placeholder-slate-400 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2">Your UPI ID (For Direct Payout) *</label>
                    <input
                      type="text"
                      required
                      value={formData.referrerUpiId}
                      onChange={e => setFormData({ ...formData, referrerUpiId: e.target.value })}
                      placeholder="rahul@oksbi or paytm"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-[#10B981] text-sm text-[#10B981] font-mono placeholder-slate-400 outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Target Corporate Sponsor Details */}
              <div className="pt-6 border-t border-slate-800">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF9900] mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#FF9900]/20 flex items-center justify-center text-[10px]">2</span>
                  Target Corporate Sponsor & Decision-Maker Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2">Company Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. CloudScale Technologies"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-[#FF9900] text-sm text-white placeholder-slate-400 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2">Decision-Maker / POC Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.decisionMakerName}
                      onChange={e => setFormData({ ...formData, decisionMakerName: e.target.value })}
                      placeholder="e.g. Ananya Sen"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-[#FF9900] text-sm text-white placeholder-slate-400 outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2">Decision-Maker Corporate Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.decisionMakerEmail}
                      onChange={e => setFormData({ ...formData, decisionMakerEmail: e.target.value })}
                      placeholder="ananya@cloudscale.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-[#FF9900] text-sm text-white placeholder-slate-400 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2">Designation / Role</label>
                    <input
                      type="text"
                      value={formData.decisionMakerDesignation}
                      onChange={e => setFormData({ ...formData, decisionMakerDesignation: e.target.value })}
                      placeholder="e.g. VP of Engineering / Head of DevRel"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-[#FF9900] text-sm text-white placeholder-slate-400 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2">Target Package Tier</label>
                    <select
                      value={formData.estimatedDealTier}
                      onChange={e => setFormData({ ...formData, estimatedDealTier: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-[#FF9900] text-sm text-white outline-none transition"
                    >
                      <option value="TITLE_200K">Title Partner (₹2,00,000) — ₹20k–₹30k Payout</option>
                      <option value="POWERED_100K">Co-Powered Partner (₹1,00,000) — ₹10k–₹12k Payout</option>
                      <option value="ASSOCIATE_50K">Associate / Gold (₹50,000) — ₹5,000 Payout</option>
                      <option value="TRACK_25K">Track & Bounty (₹25,000) — ₹2,500 Payout</option>
                      <option value="IN_KIND">In-Kind F&B / Cloud Bounties — ₹3,000–₹5,000</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">
                    How do you know this contact? Any warm context for our outreach?
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. Met at AWS Community Day Chennai; they are actively hiring 2027 grads for backend roles..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-[#FF9900] text-sm text-white placeholder-slate-400 outline-none transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#10B981] to-emerald-600 text-slate-950 font-bold text-sm hover:brightness-110 transition shadow-lg shadow-[#10B981]/20 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span>Securing Exclusive 21-Day Lock...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Lock Lead & Register for Payout
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Lead Status Tracker Box */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-slate-900/80 border border-slate-800 p-8 sm:p-10 shadow-xl mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-[#0073BB]/15 text-[#0073BB]">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Track Your Referral Status</h3>
              <p className="text-xs text-slate-400">Enter your code (e.g. RAIN-8921) to check deal stage and payout clearance</p>
            </div>
          </div>

          <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              value={searchCode}
              onChange={e => setSearchCode(e.target.value)}
              placeholder="e.g. RAIN-8921"
              className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-[#0073BB] text-sm text-white font-mono placeholder-slate-400 outline-none uppercase"
            />
            <button
              type="submit"
              disabled={lookingUp}
              className="px-6 py-3 rounded-xl bg-[#0073BB] hover:bg-blue-600 text-white font-bold text-sm transition shrink-0"
            >
              {lookingUp ? 'Checking...' : 'Check Status'}
            </button>
          </form>

          {lookupError && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              {lookupError}
            </div>
          )}

          {lookupResult && (
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-[#10B981]">{lookupResult.referralCode}</span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-bold ${
                  lookupResult.status === 'PAID_OUT' ? 'bg-emerald-500/20 text-emerald-400' :
                  lookupResult.status === 'CONTRACT_SIGNED' ? 'bg-blue-500/20 text-blue-400' :
                  lookupResult.status === 'IN_DISCUSSIONS' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-slate-800 text-slate-300'
                }`}>
                  {lookupResult.status}
                </span>
              </div>
              <div className="text-sm font-semibold text-white">Company: {lookupResult.companyName}</div>
              <div className="text-xs text-slate-400">Referrer: {lookupResult.referrerName} ({lookupResult.referrerUpiId})</div>
              <div className="text-xs text-slate-400">Lock Expiry: {new Date(lookupResult.lockExpiryDate).toLocaleDateString()}</div>
              {lookupResult.payoutAmount && (
                <div className="text-sm font-mono text-[#10B981] font-bold">Disbursed Payout: ₹{lookupResult.payoutAmount.toLocaleString('en-IN')}</div>
              )}
            </div>
          )}
        </div>

        {/* Rainmaker Program FAQs */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h4 className="text-sm font-bold text-white mb-1">When and how is the cash commission paid?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                As soon as the corporate partner executes the agreement and clears funds into the university account, our Chief Partnership Officer authorizes the transfer. Your 10%–15% commission is sent via instant UPI or NEFT within 48–72 hours of fund clearance.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h4 className="text-sm font-bold text-white mb-1">What if someone else refers the same company?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                We operate on a strictly timestamped First-to-Submit basis. If you submit a verified lead with legitimate decision-maker contact details first, your 21-day lock guarantees your commission protection against duplicate submissions.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h4 className="text-sm font-bold text-white mb-1">Can participants refer their own internships or employers?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                YES! Many of our highest closing partnerships come from students introducing their past internship mentors, startup founders, or family businesses. You retain full commission entitlement.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
