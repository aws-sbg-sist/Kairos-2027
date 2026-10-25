'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck, Users, Briefcase, Sliders, FileText, Download,
  Search, RefreshCw, LogOut, CheckCircle, AlertCircle, ArrowLeft,
  Lock, Eye, Trophy, Calendar, Sparkles
} from 'lucide-react';
import { WaitlistEntry, SponsorInquiry, FeatureFlags, AuditLog } from '@/types';
import { TECHNICAL_TRACKS } from '@/lib/config';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'waitlist' | 'sponsors' | 'flags' | 'audit'>('waitlist');
  
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [sponsors, setSponsors] = useState<SponsorInquiry[]>([]);
  const [flags, setFlags] = useState<FeatureFlags>({
    registrationOpen: false,
    prizePoolConfirmed: false,
    demoSandboxMode: true,
    announcementBanner: '',
    registrationDeadline: ''
  });
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  const [loading, setLoading] = useState(true);
  const [savingFlags, setSavingFlags] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [trackFilter, setTrackFilter] = useState('ALL');

  const loadData = async () => {
    setLoading(true);
    setStatusMessage('');
    try {
      // 1. Waitlist
      const wRes = await fetch('/api/waitlist');
      if (wRes.status === 401) {
        router.push('/admin/login');
        return;
      }
      const wData = await wRes.json();
      if (wData.success) setWaitlist(wData.waitlist);

      // 2. Sponsors
      const sRes = await fetch('/api/sponsor');
      const sData = await sRes.json();
      if (sData.success) setSponsors(sData.sponsors);

      // 3. Flags
      const fRes = await fetch('/api/admin/flags');
      const fData = await fRes.json();
      if (fData.success) setFlags(fData.flags);

    } catch (err) {
      console.error('[Admin Load Error]:', err);
      setStatusMessage('Error fetching administrative data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const handleUpdateFlags = async (updates: Partial<FeatureFlags>) => {
    setSavingFlags(true);
    try {
      const res = await fetch('/api/admin/flags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (data.success) {
        setFlags(data.flags);
        setStatusMessage('Configuration updated and audit record logged.');
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (err) {
      alert('Failed to save settings');
    } finally {
      setSavingFlags(false);
    }
  };

  const handleUpdateSponsorStatus = async (id: string, newStatus: any) => {
    // In our implementation, updating local store or calling API
    setSponsors(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    setStatusMessage(`Sponsor status updated to ${newStatus}`);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  // Filtered waitlist
  const filteredWaitlist = waitlist.filter(item => {
    const matchesSearch =
      item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.institution.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrack = trackFilter === 'ALL' || item.preferredTrack === trackFilter;
    return matchesSearch && matchesTrack;
  });

  return (
    <div className="min-h-screen bg-kairos-darkest text-slate-100 flex flex-col">
      
      {/* Top Admin Header */}
      <header className="border-b border-purple-500/20 bg-slate-950/80 px-6 py-4 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
              title="Return to Public Site"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg text-white">
                KAIROS 2027
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-500/30">
                ORGANIZER CONTROL SUITE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-purple-400' : ''}`} />
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-red-300 bg-red-950/40 hover:bg-red-900/60 border border-red-500/25 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow space-y-6">
        
        {/* Toast Status */}
        {statusMessage && (
          <div className="p-3.5 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-200 text-xs flex items-center justify-between animate-fadeIn">
            <span>{statusMessage}</span>
            <button onClick={() => setStatusMessage('')} className="text-slate-400 hover:text-white">✕</button>
          </div>
        )}

        {/* KPI Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl glass-panel border border-purple-500/20">
            <span className="text-xs font-mono text-purple-300 block mb-1">TOTAL WAITLIST</span>
            <span className="text-3xl font-display font-extrabold text-white block">{waitlist.length}</span>
            <span className="text-[11px] text-slate-400 block mt-1">Verified national builders</span>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-purple-500/20">
            <span className="text-xs font-mono text-sky-300 block mb-1">SPONSOR INQUIRIES</span>
            <span className="text-3xl font-display font-extrabold text-white block">{sponsors.length}</span>
            <span className="text-[11px] text-slate-400 block mt-1">Corporate partnership leads</span>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-purple-500/20">
            <span className="text-xs font-mono text-amber-300 block mb-1">REGISTRATION GATE</span>
            <span className={`text-base font-bold block mt-2 ${flags.registrationOpen ? 'text-emerald-400' : 'text-purple-300'}`}>
              {flags.registrationOpen ? '🔓 Publicly Active' : '🔒 Early-Interest Only'}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Feature flag controlled</span>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-purple-500/20">
            <span className="text-xs font-mono text-emerald-300 block mb-1">PRIZE POOL VISIBILITY</span>
            <span className={`text-base font-bold block mt-2 ${flags.prizePoolConfirmed ? 'text-emerald-400' : 'text-amber-400'}`}>
              {flags.prizePoolConfirmed ? '✓ Published Confirmed' : '⏳ Draft / Hidden'}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Publication rule compliant</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-purple-500/20 pb-2">
          <button
            onClick={() => setActiveTab('waitlist')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'waitlist'
                ? 'bg-purple-900/60 text-white border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4 text-purple-400" />
            <span>Early-Interest Waitlist ({waitlist.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sponsors')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'sponsors'
                ? 'bg-purple-900/60 text-white border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Briefcase className="w-4 h-4 text-sky-400" />
            <span>Sponsor Leads ({sponsors.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('flags')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'flags'
                ? 'bg-purple-900/60 text-white border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>Content & Gating Flags</span>
          </button>
        </div>

        {/* TAB 1: WAITLIST CRM */}
        {activeTab === 'waitlist' && (
          <div className="space-y-4">
            
            {/* Filter & Export Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl glass-panel">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search candidate name or college..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-lg glass-input text-xs"
                  />
                </div>

                <select
                  value={trackFilter}
                  onChange={(e) => setTrackFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg glass-input text-xs bg-slate-900"
                >
                  <option value="ALL">All Technical Tracks</option>
                  {TECHNICAL_TRACKS.map(t => (
                    <option key={t.id} value={t.title}>{t.title}</option>
                  ))}
                </select>
              </div>

              <a
                href="/api/admin/export?type=waitlist"
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-700 hover:bg-purple-600 transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Waitlist CSV</span>
              </a>
            </div>

            {/* Waitlist Data Table */}
            <div className="rounded-2xl glass-panel border border-purple-500/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 text-purple-300 font-mono uppercase border-b border-purple-500/20">
                    <tr>
                      <th className="p-3.5">Candidate</th>
                      <th className="p-3.5">Institution & Year</th>
                      <th className="p-3.5">Preferred Track</th>
                      <th className="p-3.5">Motivation / Abstract Note</th>
                      <th className="p-3.5">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/10">
                    {filteredWaitlist.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-400">
                          No waitlist submissions match your search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredWaitlist.map((w) => (
                        <tr key={w.id} className="hover:bg-white/[0.02]">
                          <td className="p-3.5">
                            <span className="font-bold text-white block">{w.fullName}</span>
                            <span className="text-slate-400 font-mono text-[11px] block">{w.email}</span>
                            {w.portfolioUrl && (
                              <a
                                href={w.portfolioUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] text-sky-400 hover:underline mt-0.5 inline-block"
                              >
                                View Portfolio →
                              </a>
                            )}
                          </td>
                          <td className="p-3.5">
                            <span className="text-slate-200 block">{w.institution}</span>
                            <span className="text-slate-400 text-[10px] block font-mono">{w.yearOfStudy} · {w.department}</span>
                          </td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-950/80 border border-purple-500/30 text-purple-200">
                              {w.preferredTrack}
                            </span>
                          </td>
                          <td className="p-3.5 max-w-xs text-slate-300 truncate">
                            {w.motivation || '—'}
                          </td>
                          <td className="p-3.5 font-mono text-slate-400 text-[10px] whitespace-nowrap">
                            {new Date(w.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SPONSOR LEADS CRM */}
        {activeTab === 'sponsors' && (
          <div className="space-y-4">
            
            <div className="flex items-center justify-between p-3 rounded-2xl glass-panel">
              <span className="text-xs text-slate-300 font-medium">
                Inquiries received through KAIROS public prospectus & sponsorship portal
              </span>
              <a
                href="/api/admin/export?type=sponsors"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-sky-700 hover:bg-sky-600 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Sponsors CSV</span>
              </a>
            </div>

            <div className="rounded-2xl glass-panel border border-purple-500/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 text-sky-300 font-mono uppercase border-b border-purple-500/20">
                    <tr>
                      <th className="p-3.5">Company & Contact</th>
                      <th className="p-3.5">Requested Tier</th>
                      <th className="p-3.5">Objectives / Requirements</th>
                      <th className="p-3.5">Pipeline Status</th>
                      <th className="p-3.5">Received Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/10">
                    {sponsors.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-400">
                          No corporate partnership inquiries received yet.
                        </td>
                      </tr>
                    ) : (
                      sponsors.map((s) => (
                        <tr key={s.id} className="hover:bg-white/[0.02]">
                          <td className="p-3.5">
                            <span className="font-bold text-white block text-sm">{s.companyName}</span>
                            <span className="text-slate-300 block">{s.contactPerson}</span>
                            <span className="text-slate-400 font-mono text-[11px] block">{s.contactEmail}</span>
                            {s.contactPhone && (
                              <span className="text-slate-400 font-mono text-[10px] block">{s.contactPhone}</span>
                            )}
                          </td>
                          <td className="p-3.5">
                            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-purple-900/50 text-purple-200 border border-purple-500/30 uppercase">
                              {s.interestedTier}
                            </span>
                          </td>
                          <td className="p-3.5 max-w-sm text-slate-300 leading-relaxed">
                            {s.customRequirements || 'Standard package exploration.'}
                          </td>
                          <td className="p-3.5">
                            <select
                              value={s.status}
                              onChange={(e) => handleUpdateSponsorStatus(s.id, e.target.value)}
                              className="px-2 py-1 rounded-lg glass-input text-xs font-mono bg-slate-900"
                            >
                              <option value="new">New Lead</option>
                              <option value="contacted">Contacted</option>
                              <option value="negotiation">In Negotiation</option>
                              <option value="confirmed">Confirmed Sponsor</option>
                              <option value="archived">Archived</option>
                            </select>
                          </td>
                          <td className="p-3.5 font-mono text-slate-400 text-[10px] whitespace-nowrap">
                            {new Date(s.createdAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FEATURE FLAGS & CONTENT CONTROLS */}
        {activeTab === 'flags' && (
          <div className="max-w-3xl space-y-6">
            
            <div className="p-6 rounded-2xl glass-panel border border-purple-500/25 space-y-6">
              <div className="border-b border-purple-500/15 pb-4">
                <h3 className="text-lg font-display font-bold text-white">
                  Event Phase & Visibility Gates
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Adjust public website behavior in real time without deploying code changes.
                </p>
              </div>

              {/* Flag 1: Registration Open */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-purple-500/20">
                <div className="space-y-1 pr-4">
                  <span className="text-sm font-bold text-white block">Full Registration & Team Portal</span>
                  <span className="text-xs text-slate-400 block">
                    When disabled, the public landing page strictly displays Early-Interest Waitlist. Enable when national applications open.
                  </span>
                </div>
                <button
                  onClick={() => handleUpdateFlags({ registrationOpen: !flags.registrationOpen })}
                  disabled={savingFlags}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    flags.registrationOpen
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {flags.registrationOpen ? 'ENABLED (OPEN)' : 'DISABLED (GATED)'}
                </button>
              </div>

              {/* Flag 2: Prize Pool Confirmed */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-purple-500/20">
                <div className="space-y-1 pr-4">
                  <span className="text-sm font-bold text-white block">Publish Confirmed Cash Prize Pool</span>
                  <span className="text-xs text-slate-400 block">
                    When disabled, the public website displays the compliant "Prize details will be announced soon" notice. Only enable once institutional approval is executed.
                  </span>
                </div>
                <button
                  onClick={() => handleUpdateFlags({ prizePoolConfirmed: !flags.prizePoolConfirmed })}
                  disabled={savingFlags}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    flags.prizePoolConfirmed
                      ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {flags.prizePoolConfirmed ? 'PUBLISHED (₹1,75,000)' : 'UNPUBLISHED (DRAFT)'}
                </button>
              </div>

              {/* Flag 3: Demo Sandbox Mode */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-purple-500/20">
                <div className="space-y-1 pr-4">
                  <span className="text-sm font-bold text-white block">Participant Dashboard Sandbox</span>
                  <span className="text-xs text-slate-400 block">
                    Enables organizers to explore and preview the future team formation and digital QR badge pass system.
                  </span>
                </div>
                <button
                  onClick={() => handleUpdateFlags({ demoSandboxMode: !flags.demoSandboxMode })}
                  disabled={savingFlags}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    flags.demoSandboxMode
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {flags.demoSandboxMode ? 'SANDBOX ACTIVE' : 'SANDBOX OFF'}
                </button>
              </div>

              {/* Flag 4: Announcement Banner */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-mono text-purple-300">
                  Global Hero Announcement Banner Message
                </label>
                <input
                  type="text"
                  value={flags.announcementBanner}
                  onChange={(e) => setFlags({ ...flags, announcementBanner: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                />
                <button
                  onClick={() => handleUpdateFlags({ announcementBanner: flags.announcementBanner })}
                  disabled={savingFlags}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-700 hover:bg-purple-600 transition-all"
                >
                  Save Banner Notice
                </button>
              </div>
            </div>

            {/* Quick Link to Participant Portal Demo */}
            <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/25 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Preview Gated Participant Portal</span>
                <span className="text-[11px] text-slate-400 block">View team creation, member management, and digital QR pass demo</span>
              </div>
              <Link
                href="/portal"
                className="px-4 py-2 rounded-xl text-xs font-bold text-purple-300 hover:text-white bg-purple-900/60 border border-purple-500/30"
              >
                Launch Portal Demo →
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
