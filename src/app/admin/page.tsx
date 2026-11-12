'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck, Users, Briefcase, Sliders, FileText, Download,
  Search, RefreshCw, LogOut, CheckCircle, AlertCircle, ArrowLeft,
  Lock, Eye, EyeOff, Trophy, Calendar, Activity, QrCode, Award,
  Video, ExternalLink, Plus, Trash2, Edit, Filter, Clock, ChevronDown, Check, X
} from 'lucide-react';
import { WaitlistEntry, SponsorInquiry, FeatureFlags, AuditLog, ParticipantTeam, Judge } from '@/types';
import { TECHNICAL_TRACKS } from '@/lib/config';

type AdminTab = 
  | 'analytics' 
  | 'teams' 
  | 'abstracts' 
  | 'submissions' 
  | 'judges' 
  | 'checkin' 
  | 'waitlist' 
  | 'sponsors' 
  | 'flags' 
  | 'audit';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>('analytics');
  
  // Data State
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [sponsors, setSponsors] = useState<SponsorInquiry[]>([]);
  const [teams, setTeams] = useState<ParticipantTeam[]>([]);
  const [judges, setJudges] = useState<(Judge & { evaluationCount?: number; averageZScore?: number })[]>([]);
  const [flags, setFlags] = useState<FeatureFlags>({
    registrationOpen: false,
    prizePoolConfirmed: false,
    demoSandboxMode: true,
    announcementBanner: '',
    registrationDeadline: ''
  });
  const [analytics, setAnalytics] = useState<any>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [checkinSummary, setCheckinSummary] = useState<any>(null);
  const [recentCheckins, setRecentCheckins] = useState<ParticipantTeam[]>([]);

  // UI Control State
  const [loading, setLoading] = useState(true);
  const [savingFlags, setSavingFlags] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [trackFilter, setTrackFilter] = useState('ALL');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [submissionFilter, setSubmissionFilter] = useState('ALL');
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);

  // Modals
  const [selectedTeam, setSelectedTeam] = useState<ParticipantTeam | null>(null);
  const [showAddJudgeModal, setShowAddJudgeModal] = useState(false);
  const [editingDeskBayTeamId, setEditingDeskBayTeamId] = useState<string | null>(null);
  const [tempDeskBay, setTempDeskBay] = useState('');
  const [reviewNotesDraft, setReviewNotesDraft] = useState('');
  const [reviewingTeamCode, setReviewingTeamCode] = useState<string | null>(null);

  // Fast Check-In State
  const [checkinInput, setCheckinInput] = useState('');
  const [checkinSubmitting, setCheckinSubmitting] = useState(false);
  const [checkinResult, setCheckinResult] = useState<{
    success: boolean;
    message: string;
    alreadyCheckedIn?: boolean;
    team?: ParticipantTeam;
    participant?: any;
  } | null>(null);

  // Judge State
  const [showPinMap, setShowPinMap] = useState<Record<string, boolean>>({});
  const [newJudgeForm, setNewJudgeForm] = useState({
    fullName: '',
    organization: '',
    designation: '',
    trackSpecialization: 'AI & Machine Learning Systems',
    assignedHall: 'Auditorium Bay 1',
    accessPin: '',
    isActive: true
  });

  const loadData = async () => {
    setLoading(true);
    setStatusMessage('');
    try {
      // 1. Teams
      const tRes = await fetch('/api/admin/teams');
      if (tRes.status === 401) {
        router.push('/admin/login');
        return;
      }
      const tData = await tRes.json();
      if (tData.success) setTeams(tData.teams);

      // 2. Analytics
      const aRes = await fetch('/api/admin/analytics');
      const aData = await aRes.json();
      if (aData.success) {
        setAnalytics(aData.analytics);
        if (aData.analytics.recentLogs) setAuditLogs(aData.analytics.recentLogs);
      }

      // 3. Judges
      const jRes = await fetch('/api/admin/judges');
      const jData = await jRes.json();
      if (jData.success) setJudges(jData.judges);

      // 4. Checkin summary
      const cRes = await fetch('/api/admin/checkin');
      const cData = await cRes.json();
      if (cData.success) {
        setCheckinSummary(cData.summary);
        setRecentCheckins(cData.recentCheckIns || []);
      }

      // 5. Waitlist
      const wRes = await fetch('/api/waitlist');
      const wData = await wRes.json();
      if (wData.success) setWaitlist(wData.waitlist);

      // 6. Sponsors
      const sRes = await fetch('/api/sponsor');
      const sData = await sRes.json();
      if (sData.success) setSponsors(sData.sponsors);

      // 7. Flags
      const fRes = await fetch('/api/admin/flags');
      const fData = await fRes.json();
      if (fData.success) setFlags(fData.flags);

    } catch (err) {
      console.error('[Admin Load Error]:', err);
      setStatusMessage('Error loading operations suite data.');
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

  // Quick Notification Toast
  const notify = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(''), 4000);
  };

  // Team Management Handler
  const handleUpdateTeam = async (identifier: string, updates: Partial<ParticipantTeam>) => {
    try {
      const res = await fetch('/api/admin/teams', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamCode: identifier, ...updates }),
      });
      const data = await res.json();
      if (data.success && data.team) {
        setTeams(prev => prev.map(t => (t.teamCode === identifier || t.id === identifier ? data.team : t)));
        if (selectedTeam && (selectedTeam.teamCode === identifier || selectedTeam.id === identifier)) {
          setSelectedTeam(data.team);
        }
        notify(`Team ${data.team.teamCode || data.team.teamName} updated successfully.`);
      } else {
        alert(data.error || 'Failed to update team');
      }
    } catch {
      alert('Network error updating team');
    }
  };

  // Abstract Review Decision Handler
  const handleReviewDecision = async (teamCode: string, stage: ParticipantTeam['selectionStage'], notes: string) => {
    try {
      const res = await fetch('/api/admin/teams', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamCode,
          selectionStage: stage,
          reviewerNotes: notes,
          status: stage === 'ON_CAMPUS_QUALIFIED' ? 'selected' : (stage === 'DISQUALIFIED' ? 'rejected' : 'reviewed')
        }),
      });
      const data = await res.json();
      if (data.success && data.team) {
        setTeams(prev => prev.map(t => (t.teamCode === teamCode ? data.team : t)));
        setReviewingTeamCode(null);
        setReviewNotesDraft('');
        notify(`Review decision recorded: Team ${teamCode} -> ${stage}`);
      } else {
        alert(data.error || 'Failed to save review decision');
      }
    } catch {
      alert('Network error saving review');
    }
  };

  // Fast Check-In Handler
  const handleFastCheckin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkinInput.trim()) return;

    setCheckinSubmitting(true);
    setCheckinResult(null);

    try {
      const isToken = checkinInput.includes('::') || checkinInput.length > 30;
      const payload = isToken 
        ? { token: checkinInput.trim() } 
        : { teamCode: checkinInput.trim() };

      const res = await fetch('/api/admin/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.status === 409) {
        setCheckinResult({
          success: false,
          alreadyCheckedIn: true,
          message: data.error || data.message || 'Already checked in',
          team: data.team,
          participant: data.participant
        });
      } else if (data.success && data.team) {
        setCheckinResult({
          success: true,
          message: data.message || 'Check-in verified successfully!',
          team: data.team,
          participant: data.participant
        });
        setTeams(prev => prev.map(t => (t.id === data.team.id ? data.team : t)));
        setRecentCheckins(prev => [data.team, ...prev.filter(t => t.id !== data.team.id)].slice(0, 20));
        setCheckinInput('');
      } else {
        setCheckinResult({
          success: false,
          message: data.error || 'Check-in failed.',
        });
      }
    } catch (err: any) {
      setCheckinResult({
        success: false,
        message: 'Network error performing check-in.',
      });
    } finally {
      setCheckinSubmitting(false);
    }
  };

  // Judge Operations Handlers
  const handleCreateJudge = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/judges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJudgeForm),
      });
      const data = await res.json();
      if (data.success && data.judge) {
        setJudges(prev => [...prev, data.judge]);
        setShowAddJudgeModal(false);
        setNewJudgeForm({
          fullName: '',
          organization: '',
          designation: '',
          trackSpecialization: 'AI & Machine Learning Systems',
          assignedHall: 'Auditorium Bay 1',
          accessPin: '',
          isActive: true
        });
        notify(`Judge identity created for ${data.judge.fullName}.`);
      } else {
        alert(data.error || 'Failed to create judge');
      }
    } catch {
      alert('Network error creating judge');
    }
  };

  const handleToggleJudgeActive = async (judgeId: string, currentActive: boolean) => {
    try {
      const res = await fetch('/api/admin/judges', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: judgeId, isActive: !currentActive }),
      });
      const data = await res.json();
      if (data.success && data.judge) {
        setJudges(prev => prev.map(j => (j.id === judgeId ? { ...j, isActive: data.judge.isActive } : j)));
        notify(`Judge access ${data.judge.isActive ? 'activated' : 'deactivated'}.`);
      }
    } catch {
      alert('Network error updating judge access');
    }
  };

  const handleDeleteJudge = async (judgeId: string) => {
    if (!confirm('Are you sure you want to delete this judge profile? This action will be logged in the audit trail.')) return;
    try {
      const res = await fetch(`/api/admin/judges?id=${judgeId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setJudges(prev => prev.filter(j => j.id !== judgeId));
        notify('Judge removed from roster.');
      } else {
        alert(data.error || 'Failed to delete judge');
      }
    } catch {
      alert('Network error deleting judge');
    }
  };

  // Feature Flags
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
        notify('Configuration updated and audit record logged.');
      }
    } catch {
      alert('Failed to save settings');
    } finally {
      setSavingFlags(false);
    }
  };

  // Waitlist Status Update
  const handleUpdateWaitlistStatus = async (id: string, newStatus: NonNullable<WaitlistEntry['status']>) => {
    try {
      const res = await fetch('/api/admin/waitlist/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setWaitlist(prev => prev.map(w => w.id === id ? { ...w, status: newStatus } : w));
        notify(`Candidate status updated to "${newStatus.toUpperCase()}".`);
      } else {
        alert(data.error || 'Failed to update candidate status');
      }
    } catch {
      alert('Network error updating status');
    }
  };

  // Sponsor Status Update
  const handleUpdateSponsorStatus = async (id: string, newStatus: any) => {
    setSponsors(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    notify(`Sponsor status updated to ${newStatus}`);
  };

  // Team Filtering
  const filteredTeams = teams.filter(team => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      !q ||
      (team.teamCode && team.teamCode.toLowerCase().includes(q)) ||
      team.teamName.toLowerCase().includes(q) ||
      (team.leaderName && team.leaderName.toLowerCase().includes(q)) ||
      (team.leaderEmail && team.leaderEmail.toLowerCase().includes(q)) ||
      (team.institutionName && team.institutionName.toLowerCase().includes(q)) ||
      (team.city && team.city.toLowerCase().includes(q)) ||
      (team.problemTitle && team.problemTitle.toLowerCase().includes(q));

    const matchesTrack = trackFilter === 'ALL' || team.trackId?.toLowerCase() === trackFilter.toLowerCase();
    const matchesStage = stageFilter === 'ALL' || (team.selectionStage || 'ROUND_0_APPLICANT') === stageFilter;

    let matchesSubmission = true;
    if (submissionFilter === 'COMPLETE') {
      matchesSubmission = Boolean(team.githubUrl && team.loomVideoUrl);
    } else if (submissionFilter === 'MISSING_ANY') {
      matchesSubmission = !team.githubUrl || !team.loomVideoUrl;
    } else if (submissionFilter === 'MISSING_GITHUB') {
      matchesSubmission = !team.githubUrl;
    } else if (submissionFilter === 'MISSING_LOOM') {
      matchesSubmission = !team.loomVideoUrl;
    }

    return matchesSearch && matchesTrack && matchesStage && matchesSubmission;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Admin Header */}
      <header className="border-b border-purple-500/20 bg-slate-950/90 px-6 py-4 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors"
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
            
            {/* Export Center Dropdown */}
            <div className="relative">
              <button
                onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-purple-200 bg-purple-900/40 hover:bg-purple-900/60 border border-purple-500/30 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-purple-400" />
                <span>Export Data</span>
                <ChevronDown className="w-3 h-3 text-purple-400" />
              </button>

              {exportDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-900 border border-purple-500/30 shadow-2xl py-1 z-50 text-xs animate-fadeIn">
                  <div className="px-3 py-1.5 font-mono text-[10px] text-purple-400 border-b border-white/5 font-semibold">
                    FORMULA-INJECTION PROTECTED EXPORTS
                  </div>
                  <a href="/api/admin/export?type=teams" download className="block px-3 py-2 text-slate-200 hover:bg-purple-900/40 hover:text-white">
                    Teams Registry (.csv)
                  </a>
                  <a href="/api/admin/export?type=team-members" download className="block px-3 py-2 text-slate-200 hover:bg-purple-900/40 hover:text-white">
                    Team Members & Roles (.csv)
                  </a>
                  <a href="/api/admin/export?type=abstracts" download className="block px-3 py-2 text-slate-200 hover:bg-purple-900/40 hover:text-white">
                    Abstracts & Review Remarks (.csv)
                  </a>
                  <a href="/api/admin/export?type=submissions" download className="block px-3 py-2 text-slate-200 hover:bg-purple-900/40 hover:text-white">
                    Submissions (GitHub + Loom) (.csv)
                  </a>
                  <a href="/api/admin/export?type=evaluations" download className="block px-3 py-2 text-slate-200 hover:bg-purple-900/40 hover:text-white">
                    Judge Evaluations & Z-Scores (.csv)
                  </a>
                  <a href="/api/admin/export?type=waitlist" download className="block px-3 py-2 text-slate-200 hover:bg-purple-900/40 hover:text-white">
                    Early Waitlist Registrations (.csv)
                  </a>
                  <a href="/api/admin/export?type=sponsors" download className="block px-3 py-2 text-slate-200 hover:bg-purple-900/40 hover:text-white">
                    Corporate Sponsor Leads (.csv)
                  </a>
                </div>
              )}
            </div>

            <button
              onClick={loadData}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Refresh Live Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-purple-400' : ''}`} />
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-red-300 bg-red-950/40 hover:bg-red-900/60 border border-red-500/25 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow space-y-6">
        
        {/* Status Toast */}
        {statusMessage && (
          <div className="p-3.5 rounded-xl bg-purple-950/90 border border-purple-500/40 text-purple-200 text-xs flex items-center justify-between shadow-lg">
            <span>{statusMessage}</span>
            <button onClick={() => setStatusMessage('')} className="text-slate-400 hover:text-white">✕</button>
          </div>
        )}

        {/* Global Operational KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-purple-500/20">
            <span className="text-[10px] font-mono text-purple-300 block mb-0.5">REGISTERED TEAMS</span>
            <span className="text-2xl font-bold text-white block">{teams.length}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Total registered rosters</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-purple-500/20">
            <span className="text-[10px] font-mono text-sky-300 block mb-0.5">TOTAL BUILDERS</span>
            <span className="text-2xl font-bold text-white block">
              {analytics?.totalBuilders || teams.reduce((acc, t) => acc + (t.members?.length || 0), 0)}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">National participants</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-purple-500/20">
            <span className="text-[10px] font-mono text-yellow-300 block mb-0.5">PENDING REVIEWS</span>
            <span className="text-2xl font-bold text-yellow-300 block">
              {teams.filter(t => !t.reviewerNotes && t.selectionStage === 'ROUND_0_APPLICANT').length}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Abstract review backlog</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-purple-500/20">
            <span className="text-[10px] font-mono text-emerald-300 block mb-0.5">ON-CAMPUS FINALISTS</span>
            <span className="text-2xl font-bold text-emerald-400 block">
              {teams.filter(t => t.selectionStage === 'ON_CAMPUS_QUALIFIED').length}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Shortlisted for arena</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-purple-500/20">
            <span className="text-[10px] font-mono text-indigo-300 block mb-0.5">CHECK-IN RATE</span>
            <span className="text-2xl font-bold text-indigo-300 block">
              {teams.length > 0 ? Math.round((teams.filter(t => t.checkedIn).length / teams.length) * 100) : 0}%
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {teams.filter(t => t.checkedIn).length} / {teams.length} teams verified
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-purple-500/20">
            <span className="text-[10px] font-mono text-pink-300 block mb-0.5">ACTIVE JUDGES</span>
            <span className="text-2xl font-bold text-pink-300 block">
              {judges.filter(j => j.isActive).length}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {judges.reduce((acc, j) => acc + (j.evaluationCount || 0), 0)} evals logged
            </span>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-purple-500/20 pb-2">
          {[
            { id: 'analytics', label: 'Overview Analytics', icon: Activity },
            { id: 'teams', label: `Teams (${teams.length})`, icon: Users },
            { id: 'abstracts', label: 'Abstract Review', icon: FileText },
            { id: 'submissions', label: 'Submissions', icon: Video },
            { id: 'judges', label: `Judges (${judges.length})`, icon: Award },
            { id: 'checkin', label: 'Check-in Desk', icon: QrCode },
            { id: 'waitlist', label: `Early Waitlist (${waitlist.length})`, icon: Clock },
            { id: 'sponsors', label: `Sponsors (${sponsors.length})`, icon: Briefcase },
            { id: 'flags', label: 'Feature Flags', icon: Sliders },
            { id: 'audit', label: 'Audit Trail', icon: ShieldCheck }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-purple-900/60 text-white border border-purple-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-purple-300' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW ANALYTICS */}
        {/* ========================================================================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-purple-500/20 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                <Activity className="w-4 h-4 text-purple-400" />
                TRACK DISTRIBUTION & ADMISSIONS FUNNEL
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {TECHNICAL_TRACKS.map(t => {
                  const trackTeams = teams.filter(team => team.trackId?.toLowerCase() === t.id.toLowerCase());
                  const pct = teams.length > 0 ? Math.round((trackTeams.length / teams.length) * 100) : 0;
                  return (
                    <div key={t.id} className="p-3.5 rounded-xl bg-slate-950/70 border border-purple-500/15 flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono text-purple-300 font-bold truncate" title={t.title}>
                          {t.title.split('&')[0]}
                        </span>
                        <span className="text-xs font-bold text-white font-mono">{trackTeams.length}</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-indigo-500 h-full rounded-full"
                          style={{ width: `${Math.max(pct, trackTeams.length > 0 ? 8 : 0)}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono mt-1 text-right">{pct}% of teams</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Funnel Box */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-purple-500/20 space-y-3">
                <h4 className="text-xs font-mono text-purple-300 font-bold">SELECTION PIPELINE</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 rounded-lg bg-slate-950/50">
                    <span className="text-slate-300">Round 0 Applicants:</span>
                    <span className="font-mono font-bold text-white">{teams.filter(t => (t.selectionStage || 'ROUND_0_APPLICANT') === 'ROUND_0_APPLICANT').length}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-950/50">
                    <span className="text-sky-300">Online Semi-Finalists:</span>
                    <span className="font-mono font-bold text-sky-400">{teams.filter(t => t.selectionStage === 'ONLINE_SEMI_FINALIST').length}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-950/50">
                    <span className="text-emerald-300">On-Campus Qualified:</span>
                    <span className="font-mono font-bold text-emerald-400">{teams.filter(t => t.selectionStage === 'ON_CAMPUS_QUALIFIED').length}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-950/50">
                    <span className="text-red-300">Disqualified:</span>
                    <span className="font-mono font-bold text-red-400">{teams.filter(t => t.selectionStage === 'DISQUALIFIED').length}</span>
                  </div>
                </div>
              </div>

              {/* Submissions Box */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-purple-500/20 space-y-3">
                <h4 className="text-xs font-mono text-purple-300 font-bold">QUALIFIER SUBMISSION HEALTH</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 rounded-lg bg-slate-950/50">
                    <span className="text-emerald-300">Complete (GitHub + Loom):</span>
                    <span className="font-mono font-bold text-emerald-400">{teams.filter(t => t.githubUrl && t.loomVideoUrl).length}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-950/50">
                    <span className="text-yellow-300">GitHub Only:</span>
                    <span className="font-mono font-bold text-yellow-400">{teams.filter(t => t.githubUrl && !t.loomVideoUrl).length}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-950/50">
                    <span className="text-yellow-300">Loom Only:</span>
                    <span className="font-mono font-bold text-yellow-400">{teams.filter(t => !t.githubUrl && t.loomVideoUrl).length}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-950/50">
                    <span className="text-red-300">Missing Both Deliverables:</span>
                    <span className="font-mono font-bold text-red-400">{teams.filter(t => !t.githubUrl && !t.loomVideoUrl).length}</span>
                  </div>
                </div>
              </div>

              {/* Check-in Box */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-purple-500/20 space-y-3">
                <h4 className="text-xs font-mono text-purple-300 font-bold">ON-SITE ARENA CHECK-IN</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 rounded-lg bg-slate-950/50">
                    <span className="text-slate-300">Checked In Teams:</span>
                    <span className="font-mono font-bold text-emerald-400">{teams.filter(t => t.checkedIn).length}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-950/50">
                    <span className="text-slate-300">Pending Check-in:</span>
                    <span className="font-mono font-bold text-yellow-400">{teams.filter(t => !t.checkedIn && t.selectionStage !== 'DISQUALIFIED').length}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-950/50">
                    <span className="text-slate-300">Desk Bays Assigned:</span>
                    <span className="font-mono font-bold text-purple-300">{teams.filter(t => !!t.deskBayAllocation).length}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-950/50">
                    <span className="text-slate-300">Unassigned Desk Bays:</span>
                    <span className="font-mono font-bold text-slate-400">{teams.filter(t => !t.deskBayAllocation).length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: TEAM MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === 'teams' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/70 border border-purple-500/20">
              <div className="flex flex-wrap items-center gap-2 flex-grow">
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search code, team, leader, college..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-purple-500/30 text-xs"
                  />
                </div>

                <select
                  value={trackFilter}
                  onChange={(e) => setTrackFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-purple-500/30 text-xs"
                >
                  <option value="ALL">All Tracks</option>
                  {TECHNICAL_TRACKS.map(t => (
                    <option key={t.id} value={t.id}>{t.title.split('&')[0]}</option>
                  ))}
                </select>

                <select
                  value={stageFilter}
                  onChange={(e) => setStageFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-purple-500/30 text-xs"
                >
                  <option value="ALL">All Selection Stages</option>
                  <option value="ROUND_0_APPLICANT">Round 0 Applicant</option>
                  <option value="ONLINE_SEMI_FINALIST">Online Semi-Finalist</option>
                  <option value="ON_CAMPUS_QUALIFIED">On-Campus Qualified</option>
                  <option value="DISQUALIFIED">Disqualified</option>
                </select>
              </div>

              <span className="text-xs font-mono text-purple-300">
                Showing {filteredTeams.length} of {teams.length} teams
              </span>
            </div>

            {/* Teams Data Table */}
            <div className="rounded-2xl bg-slate-900/50 border border-purple-500/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 border-b border-purple-500/20 text-purple-300 font-mono text-[11px]">
                    <tr>
                      <th className="p-3">Team Code</th>
                      <th className="p-3">Team Name & Leader</th>
                      <th className="p-3">Track</th>
                      <th className="p-3">Institution</th>
                      <th className="p-3">Members</th>
                      <th className="p-3">Stage</th>
                      <th className="p-3">Desk Bay</th>
                      <th className="p-3">Check-in</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/10">
                    {filteredTeams.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="p-8 text-center text-slate-400">
                          No teams matched the active filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredTeams.map((team) => (
                        <tr key={team.id} className="hover:bg-white/[0.02]">
                          <td className="p-3 font-mono font-bold text-purple-300">
                            {team.teamCode || team.id}
                          </td>
                          <td className="p-3">
                            <span className="font-bold text-white block">{team.teamName}</span>
                            <span className="text-slate-400 text-[11px] block">{team.leaderEmail}</span>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-900/40 text-purple-200 border border-purple-500/20">
                              {team.trackId}
                            </span>
                          </td>
                          <td className="p-3 max-w-xs truncate text-slate-300">
                            {team.institutionName || 'SIST'}
                          </td>
                          <td className="p-3 font-mono">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              (team.members?.length || 0) >= 4 ? 'text-emerald-300 bg-emerald-950/40' : 'text-yellow-300 bg-yellow-950/40'
                            }`}>
                              {team.members?.length || 0} / 6
                            </span>
                          </td>
                          <td className="p-3">
                            <select
                              value={team.selectionStage || 'ROUND_0_APPLICANT'}
                              onChange={(e) => handleUpdateTeam(team.teamCode || team.id, { selectionStage: e.target.value as any })}
                              className="px-2 py-1 rounded bg-slate-950 border border-purple-500/30 text-[10px] font-mono font-bold"
                            >
                              <option value="ROUND_0_APPLICANT">Applicant</option>
                              <option value="ONLINE_SEMI_FINALIST">Semi-Finalist</option>
                              <option value="ON_CAMPUS_QUALIFIED">Qualified (Finalist)</option>
                              <option value="DISQUALIFIED">Disqualified</option>
                            </select>
                          </td>
                          <td className="p-3">
                            {editingDeskBayTeamId === team.id ? (
                              <div className="flex items-center gap-1">
                                <input
                                  type="text"
                                  value={tempDeskBay}
                                  onChange={(e) => setTempDeskBay(e.target.value)}
                                  placeholder="BAY-A01"
                                  className="w-20 px-1.5 py-0.5 rounded bg-slate-950 border border-purple-500/40 text-[10px] font-mono"
                                />
                                <button
                                  onClick={() => {
                                    handleUpdateTeam(team.teamCode || team.id, { deskBayAllocation: tempDeskBay });
                                    setEditingDeskBayTeamId(null);
                                  }}
                                  className="text-emerald-400 hover:text-emerald-300"
                                >
                                  ✓
                                </button>
                                <button
                                  onClick={() => setEditingDeskBayTeamId(null)}
                                  className="text-slate-400 hover:text-white"
                                >
                                  ✕
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditingDeskBayTeamId(team.id);
                                  setTempDeskBay(team.deskBayAllocation || '');
                                }}
                                className="font-mono text-[11px] text-purple-300 hover:text-white hover:underline flex items-center gap-1"
                              >
                                {team.deskBayAllocation || <span className="text-slate-500 italic">+ Assign</span>}
                              </button>
                            )}
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => handleUpdateTeam(team.teamCode || team.id, { checkedIn: !team.checkedIn })}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                team.checkedIn
                                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-slate-950 text-slate-400 border border-slate-700'
                              }`}
                            >
                              {team.checkedIn ? '✓ Checked In' : 'Pending'}
                            </button>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => setSelectedTeam(team)}
                              className="px-2.5 py-1 rounded bg-purple-900/40 hover:bg-purple-900/60 text-purple-200 border border-purple-500/30 text-[11px] font-semibold"
                            >
                              View Profile
                            </button>
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

        {/* ========================================================================= */}
        {/* TAB 3: ABSTRACT REVIEW */}
        {/* ========================================================================= */}
        {activeTab === 'abstracts' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-purple-500/20 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  PROBLEM STATEMENT & ABSTRACT REVIEW DESK
                </h3>
                <p className="text-xs text-slate-400">Review team engineering proposals, add reviewer notes, and shortlist finalists.</p>
              </div>

              <select
                value={trackFilter}
                onChange={(e) => setTrackFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-purple-500/30 text-xs"
              >
                <option value="ALL">All Tracks</option>
                {TECHNICAL_TRACKS.map(t => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredTeams.map((team) => (
                <div key={team.id} className="p-5 rounded-2xl bg-slate-900/50 border border-purple-500/20 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/15 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-purple-300 text-sm">{team.teamCode || team.id}</span>
                      <span className="text-white font-bold text-base">{team.teamName}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950/60 text-purple-300 border border-purple-500/30">
                        {team.trackId}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold ${
                        team.selectionStage === 'ON_CAMPUS_QUALIFIED'
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                          : team.selectionStage === 'ONLINE_SEMI_FINALIST'
                          ? 'bg-sky-950/60 text-sky-300 border border-sky-500/30'
                          : team.selectionStage === 'DISQUALIFIED'
                          ? 'bg-red-950/60 text-red-300 border border-red-500/30'
                          : 'bg-yellow-950/60 text-yellow-300 border border-yellow-500/30'
                      }`}>
                        {team.selectionStage || 'ROUND_0_APPLICANT'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-purple-400 block mb-1">PROPOSED PROBLEM TITLE</span>
                    <h4 className="text-sm font-semibold text-white">{team.problemTitle || 'No title submitted yet'}</h4>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-purple-400 block mb-1">ABSTRACT & ARCHITECTURAL APPROACH</span>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-purple-500/10">
                      {team.problemAbstract || 'No detailed abstract text submitted by this team yet.'}
                    </p>
                  </div>

                  {team.architecturePdfUrl && (
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                      <a href={team.architecturePdfUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-purple-300 hover:text-white underline">
                        View Architecture Diagram PDF
                      </a>
                    </div>
                  )}

                  {/* Review Remarks & Actions */}
                  <div className="pt-2 border-t border-purple-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="text-xs text-slate-400">
                      {team.reviewerNotes ? (
                        <div>
                          <span className="font-semibold text-purple-300">Organizer Remark: </span>
                          <span className="text-slate-200">{team.reviewerNotes}</span>
                          <span className="text-[10px] text-slate-500 ml-2">({team.reviewedBy || 'Staff'} on {new Date(team.reviewedAt || Date.now()).toLocaleDateString()})</span>
                        </div>
                      ) : (
                        <span className="italic text-slate-500">No organizer review recorded yet.</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {reviewingTeamCode === team.teamCode ? (
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <input
                            type="text"
                            value={reviewNotesDraft}
                            onChange={(e) => setReviewNotesDraft(e.target.value)}
                            placeholder="Add evaluation note..."
                            className="px-2.5 py-1 rounded bg-slate-950 border border-purple-500/30 text-xs text-white"
                          />
                          <button
                            onClick={() => handleReviewDecision(team.teamCode || team.id, 'ON_CAMPUS_QUALIFIED', reviewNotesDraft)}
                            className="px-2.5 py-1 rounded text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500"
                          >
                            Shortlist
                          </button>
                          <button
                            onClick={() => handleReviewDecision(team.teamCode || team.id, 'DISQUALIFIED', reviewNotesDraft)}
                            className="px-2.5 py-1 rounded text-xs font-bold text-white bg-red-700 hover:bg-red-600"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => setReviewingTeamCode(null)}
                            className="text-slate-400 hover:text-white text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setReviewingTeamCode(team.teamCode || team.id);
                              setReviewNotesDraft(team.reviewerNotes || '');
                            }}
                            className="px-3 py-1 rounded-lg text-xs font-semibold bg-purple-900/40 hover:bg-purple-900/60 text-purple-200 border border-purple-500/30"
                          >
                            {team.reviewerNotes ? 'Edit Review' : 'Review & Decide'}
                          </button>
                          <button
                            onClick={() => handleReviewDecision(team.teamCode || team.id, 'ON_CAMPUS_QUALIFIED', team.reviewerNotes || 'Approved based on abstract')}
                            className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white"
                          >
                            Quick Shortlist
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: SUBMISSION MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === 'submissions' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/70 border border-purple-500/20">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-white font-mono">QUALIFIER SUBMISSION AUDITOR</span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={submissionFilter}
                  onChange={(e) => setSubmissionFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-purple-500/30 text-xs"
                >
                  <option value="ALL">All Submissions</option>
                  <option value="COMPLETE">Deliverables Complete (Both)</option>
                  <option value="MISSING_ANY">Missing Any Deliverable</option>
                  <option value="MISSING_GITHUB">Missing GitHub Repo</option>
                  <option value="MISSING_LOOM">Missing Loom Video</option>
                </select>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/50 border border-purple-500/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 border-b border-purple-500/20 text-purple-300 font-mono text-[11px]">
                    <tr>
                      <th className="p-3">Team Code</th>
                      <th className="p-3">Team Name</th>
                      <th className="p-3">GitHub Repository</th>
                      <th className="p-3">Loom Demo Video</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Quick Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/10">
                    {filteredTeams.map((team) => {
                      const hasGithub = Boolean(team.githubUrl);
                      const hasLoom = Boolean(team.loomVideoUrl);
                      const isComplete = hasGithub && hasLoom;

                      return (
                        <tr key={team.id} className="hover:bg-white/[0.02]">
                          <td className="p-3 font-mono font-bold text-purple-300">
                            {team.teamCode || team.id}
                          </td>
                          <td className="p-3">
                            <span className="font-bold text-white block">{team.teamName}</span>
                            <span className="text-slate-400 text-[10px] block">{team.trackId}</span>
                          </td>
                          <td className="p-3">
                            {hasGithub ? (
                              <a
                                href={team.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-300 hover:text-white underline font-mono flex items-center gap-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>{team.githubUrl?.replace('https://github.com/', '')}</span>
                              </a>
                            ) : (
                              <span className="text-red-400 font-mono text-[10px]">MISSING REPO</span>
                            )}
                          </td>
                          <td className="p-3">
                            {hasLoom ? (
                              <a
                                href={team.loomVideoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sky-300 hover:text-white underline font-mono flex items-center gap-1"
                              >
                                <Video className="w-3 h-3" />
                                <span>Watch Loom</span>
                              </a>
                            ) : (
                              <span className="text-red-400 font-mono text-[10px]">MISSING VIDEO</span>
                            )}
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              isComplete 
                                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30' 
                                : 'bg-red-950/60 text-red-300 border border-red-500/30'
                            }`}>
                              {isComplete ? '✓ Complete' : 'Incomplete'}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleUpdateTeam(team.teamCode || team.id, { selectionStage: 'ONLINE_SEMI_FINALIST' })}
                              className="px-2 py-1 rounded bg-purple-900/40 hover:bg-purple-900/60 text-purple-200 border border-purple-500/30 text-[10px] font-semibold"
                            >
                              Qualify for Semi-Finals
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: JUDGE MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === 'judges' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/70 border border-purple-500/20">
              <div>
                <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-400" />
                  JURY & EVALUATOR ROSTER
                </h3>
                <p className="text-xs text-slate-400">Manage industry evaluator profiles, track assignments, and access PIN credentials.</p>
              </div>

              <button
                onClick={() => setShowAddJudgeModal(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-700 hover:bg-purple-600 transition-colors flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Evaluator</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {judges.map((judge) => {
                const isPinVisible = showPinMap[judge.id] || false;

                return (
                  <div key={judge.id} className="p-4 rounded-2xl bg-slate-900/50 border border-purple-500/20 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white">{judge.fullName}</h4>
                        <span className="text-xs text-purple-300 block">{judge.designation}</span>
                        <span className="text-xs text-slate-400 block">{judge.organization}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        judge.isActive
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {judge.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-purple-500/10 space-y-1 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Track:</span>
                        <span className="text-purple-300">{judge.trackSpecialization || 'General'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Hall Bay:</span>
                        <span className="text-white">{judge.assignedHall || 'Auditorium Bay 1'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Access PIN:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-purple-200">
                            {isPinVisible ? judge.accessPin : '••••••'}
                          </span>
                          <button
                            onClick={() => setShowPinMap({ ...showPinMap, [judge.id]: !isPinVisible })}
                            className="text-slate-400 hover:text-white"
                          >
                            {isPinVisible ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-white/5">
                        <span className="text-slate-400">Evaluations Logged:</span>
                        <span className="text-emerald-400 font-bold">{judge.evaluationCount || 0}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => handleToggleJudgeActive(judge.id, judge.isActive)}
                        className="text-xs text-purple-300 hover:text-white font-medium"
                      >
                        {judge.isActive ? 'Deactivate PIN' : 'Activate PIN'}
                      </button>
                      <button
                        onClick={() => handleDeleteJudge(judge.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                        title="Delete Judge Profile"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: CHECK-IN MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === 'checkin' && (
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Live Scanner / Fast Input Card */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-purple-500/30 space-y-4">
              <div className="border-b border-purple-500/20 pb-3">
                <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-purple-400" />
                  ARENA ENTRANCE & BADGE VERIFICATION DESK
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Scan participant QR tokens or enter Team Code / Leader email to verify eligibility and assign desk bays.
                </p>
              </div>

              <form onSubmit={handleFastCheckin} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={checkinInput}
                    onChange={(e) => setCheckinInput(e.target.value)}
                    placeholder="Scan QR token or enter Team Code (e.g. KAIROS-T001)..."
                    className="flex-grow px-4 py-2.5 rounded-xl bg-slate-950 border border-purple-500/40 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={checkinSubmitting || !checkinInput.trim()}
                    className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-purple-700 hover:bg-purple-600 disabled:opacity-50 transition-colors shadow-md shrink-0 flex items-center gap-1.5"
                  >
                    {checkinSubmitting ? 'Verifying...' : 'Verify & Check In'}
                  </button>
                </div>
              </form>

              {/* Check-In Live Feedback Box */}
              {checkinResult && (
                <div className={`p-4 rounded-xl text-xs space-y-2 animate-fadeIn ${
                  checkinResult.success
                    ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-200'
                    : checkinResult.alreadyCheckedIn
                    ? 'bg-yellow-950/80 border border-yellow-500/40 text-yellow-200'
                    : 'bg-red-950/80 border border-red-500/40 text-red-200'
                }`}>
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {checkinResult.success ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-yellow-400" />}
                    <span>{checkinResult.message}</span>
                  </div>

                  {checkinResult.team && (
                    <div className="p-3 rounded-lg bg-black/40 font-mono space-y-1 border border-white/10">
                      <div><span className="text-slate-400">Team:</span> <strong className="text-white">{checkinResult.team.teamName}</strong> ({checkinResult.team.teamCode})</div>
                      <div><span className="text-slate-400">Desk Bay:</span> <strong className="text-purple-300">{checkinResult.team.deskBayAllocation || 'Unassigned (Please allocate bay)'}</strong></div>
                      <div><span className="text-slate-400">Track:</span> {checkinResult.team.trackId}</div>
                      <div><span className="text-slate-400">Leader:</span> {checkinResult.team.leaderEmail}</div>
                    </div>
                  )}

                  {checkinResult.participant && (
                    <div className="p-3 rounded-lg bg-black/40 font-mono space-y-1 border border-white/10">
                      <div><span className="text-slate-400">Verified Builder:</span> <strong className="text-white">{checkinResult.participant.fullName}</strong></div>
                      <div><span className="text-slate-400">Role:</span> {checkinResult.participant.role}</div>
                      <div><span className="text-slate-400">College:</span> {checkinResult.participant.institution}</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Recent Check-ins List */}
            <div className="p-5 rounded-2xl bg-slate-900/50 border border-purple-500/20 space-y-3">
              <h4 className="text-xs font-mono text-purple-300 font-bold">RECENT VERIFIED CHECK-INS</h4>
              {recentCheckins.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No teams checked in yet today.</p>
              ) : (
                <div className="space-y-2">
                  {recentCheckins.slice(0, 8).map(team => (
                    <div key={team.id} className="p-2.5 rounded-xl bg-slate-950/60 border border-purple-500/10 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-white">{team.teamName}</span>
                        <span className="font-mono text-purple-300 ml-2">({team.teamCode})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-purple-300">Desk: {team.deskBayAllocation || 'Unassigned'}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {team.checkedInAt ? new Date(team.checkedInAt).toLocaleTimeString() : 'Checked In'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: WAITLIST (PRESERVED) */}
        {/* ========================================================================= */}
        {activeTab === 'waitlist' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/70 border border-purple-500/20">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search candidate name or college..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-purple-500/30 text-xs"
                  />
                </div>
              </div>

              <a
                href="/api/admin/export?type=waitlist"
                download
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-700 hover:bg-purple-600 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Waitlist CSV</span>
              </a>
            </div>

            <div className="rounded-2xl bg-slate-900/50 border border-purple-500/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 border-b border-purple-500/20 text-purple-300 font-mono text-[11px]">
                    <tr>
                      <th className="p-3">Candidate</th>
                      <th className="p-3">Track</th>
                      <th className="p-3">Institution & Dept</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Registered At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/10">
                    {waitlist
                      .filter(item => 
                        !searchQuery || 
                        item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (item.institution || item.college || '').toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-white/[0.02]">
                          <td className="p-3">
                            <span className="font-bold text-white block">{item.fullName}</span>
                            <span className="text-slate-400 font-mono text-[11px] block">{item.email}</span>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-900/40 text-purple-200 border border-purple-500/20">
                              {item.preferredTrack}
                            </span>
                          </td>
                          <td className="p-3 max-w-xs truncate text-slate-300">
                            {item.institution || item.college || 'SIST'} ({item.department || 'CSE'})
                          </td>
                          <td className="p-3">
                            <select
                              value={item.status || 'pending'}
                              onChange={(e) => handleUpdateWaitlistStatus(item.id, e.target.value as any)}
                              className="px-2 py-1 rounded bg-slate-950 border border-purple-500/30 text-[10px] font-mono"
                            >
                              <option value="pending">Pending</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="shortlisted">Shortlisted</option>
                              <option value="waitlisted">Waitlisted</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="p-3 font-mono text-slate-400 text-[10px]">
                            {new Date(item.createdAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: SPONSORS (PRESERVED) */}
        {/* ========================================================================= */}
        {activeTab === 'sponsors' && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-900/50 border border-purple-500/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 border-b border-purple-500/20 text-purple-300 font-mono text-[11px]">
                    <tr>
                      <th className="p-3">Company & Contact</th>
                      <th className="p-3">Tier</th>
                      <th className="p-3">Requirements</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Received At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/10">
                    {sponsors.map((s) => (
                      <tr key={s.id} className="hover:bg-white/[0.02]">
                        <td className="p-3">
                          <span className="font-bold text-white block text-sm">{s.companyName}</span>
                          <span className="text-slate-300 block">{s.contactPerson}</span>
                          <span className="text-slate-400 font-mono text-[11px] block">{s.contactEmail}</span>
                        </td>
                        <td className="p-3">
                          <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-purple-900/50 text-purple-200 border border-purple-500/30">
                            {s.interestedTier}
                          </span>
                        </td>
                        <td className="p-3 max-w-sm text-slate-300 leading-relaxed">
                          {s.customRequirements || 'Standard package exploration.'}
                        </td>
                        <td className="p-3">
                          <select
                            value={s.status}
                            onChange={(e) => handleUpdateSponsorStatus(s.id, e.target.value)}
                            className="px-2 py-1 rounded-lg bg-slate-950 border border-purple-500/30 text-xs font-mono"
                          >
                            <option value="new">New Lead</option>
                            <option value="contacted">Contacted</option>
                            <option value="negotiation">In Negotiation</option>
                            <option value="confirmed">Confirmed Sponsor</option>
                            <option value="archived">Archived</option>
                          </select>
                        </td>
                        <td className="p-3 font-mono text-slate-400 text-[10px]">
                          {new Date(s.createdAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 9: FEATURE FLAGS (PRESERVED) */}
        {/* ========================================================================= */}
        {activeTab === 'flags' && (
          <div className="max-w-3xl space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-purple-500/25 space-y-6">
              <div className="border-b border-purple-500/15 pb-4">
                <h3 className="text-lg font-bold text-white">Event Phase & Visibility Gates</h3>
                <p className="text-xs text-slate-400 mt-1">Adjust public website behavior in real time without deploying code changes.</p>
              </div>

              {/* Registration Flag */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-purple-500/20">
                <div className="space-y-1 pr-4">
                  <span className="text-sm font-bold text-white block">Full Registration & Team Portal</span>
                  <span className="text-xs text-slate-400 block">When disabled, public site displays Early-Interest Waitlist.</span>
                </div>
                <button
                  onClick={() => handleUpdateFlags({ registrationOpen: !flags.registrationOpen })}
                  disabled={savingFlags}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                    flags.registrationOpen ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {flags.registrationOpen ? 'ENABLED (OPEN)' : 'DISABLED (GATED)'}
                </button>
              </div>

              {/* Prize Pool Flag */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-purple-500/20">
                <div className="space-y-1 pr-4">
                  <span className="text-sm font-bold text-white block">Publish Confirmed Cash Prize Pool</span>
                  <span className="text-xs text-slate-400 block">Compliant publication rule toggle.</span>
                </div>
                <button
                  onClick={() => handleUpdateFlags({ prizePoolConfirmed: !flags.prizePoolConfirmed })}
                  disabled={savingFlags}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                    flags.prizePoolConfirmed ? 'bg-purple-700 hover:bg-purple-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {flags.prizePoolConfirmed ? 'PUBLISHED (₹1,75,000)' : 'UNPUBLISHED (DRAFT)'}
                </button>
              </div>

              {/* Announcement Banner */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-mono text-purple-300 block">Global Hero Announcement Banner</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={flags.announcementBanner}
                    onChange={(e) => setFlags({ ...flags, announcementBanner: e.target.value })}
                    placeholder="Enter global announcement banner text..."
                    className="flex-grow px-3.5 py-2.5 rounded-xl bg-slate-950 border border-purple-500/30 text-xs text-white"
                  />
                  <button
                    onClick={() => handleUpdateFlags({ announcementBanner: flags.announcementBanner })}
                    disabled={savingFlags}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-700 hover:bg-purple-600 shrink-0"
                  >
                    Save Banner
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 10: AUDIT TRAIL */}
        {/* ========================================================================= */}
        {activeTab === 'audit' && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-900/50 border border-purple-500/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 border-b border-purple-500/20 text-purple-300 font-mono text-[11px]">
                    <tr>
                      <th className="p-3">Timestamp</th>
                      <th className="p-3">Organizer</th>
                      <th className="p-3">Action</th>
                      <th className="p-3">Operation Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/10 font-mono">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-white/[0.02]">
                        <td className="p-3 text-slate-400 text-[10px] whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="p-3 font-bold text-purple-300">
                          {log.organizerName}
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-purple-950/60 text-purple-200 border border-purple-500/30">
                            {log.action}
                          </span>
                        </td>
                        <td className="p-3 text-slate-300">
                          {log.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* MODAL 1: TEAM DETAIL & INSPECTION MODAL */}
      {/* ========================================================================= */}
      {selectedTeam && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-purple-500/30 rounded-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4 animate-fadeIn">
            <div className="flex items-start justify-between border-b border-purple-500/20 pb-3">
              <div>
                <span className="font-mono text-xs text-purple-400 font-bold">{selectedTeam.teamCode || selectedTeam.id}</span>
                <h3 className="text-xl font-bold text-white">{selectedTeam.teamName}</h3>
                <span className="text-xs text-slate-400">{selectedTeam.institutionName || 'SIST'} • {selectedTeam.city || 'Chennai'}</span>
              </div>
              <button onClick={() => setSelectedTeam(null)} className="text-slate-400 hover:text-white p-1">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-950/60 border border-purple-500/10 font-mono">
                <div><span className="text-slate-400">Track:</span> <span className="text-purple-300 font-bold">{selectedTeam.trackId}</span></div>
                <div><span className="text-slate-400">Stage:</span> <span className="text-emerald-400 font-bold">{selectedTeam.selectionStage || 'ROUND_0_APPLICANT'}</span></div>
                <div><span className="text-slate-400">Desk Bay:</span> <span className="text-white">{selectedTeam.deskBayAllocation || 'Unassigned'}</span></div>
                <div><span className="text-slate-400">Check-in:</span> <span className={selectedTeam.checkedIn ? 'text-emerald-400 font-bold' : 'text-slate-400'}>{selectedTeam.checkedIn ? 'Checked In' : 'Pending'}</span></div>
              </div>

              <div>
                <span className="font-mono text-purple-300 font-bold block mb-1">TEAM ROSTER ({selectedTeam.members?.length || 0} / 6)</span>
                <div className="space-y-1.5">
                  {(selectedTeam.members || []).map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-950/40 border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white">{m.name}</span>
                        <span className="text-slate-400 text-[10px] ml-2">({m.email})</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-purple-300">
                        {m.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-mono text-purple-300 font-bold block mb-1">PROPOSED PROBLEM & ABSTRACT</span>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-purple-500/10 space-y-1.5">
                  <h4 className="font-bold text-white">{selectedTeam.problemTitle || 'No Title'}</h4>
                  <p className="text-slate-300 leading-relaxed">{selectedTeam.problemAbstract || 'No Abstract'}</p>
                </div>
              </div>

              {selectedTeam.githubUrl && (
                <div>
                  <span className="font-mono text-purple-300 font-bold block mb-1">SUBMITTED REPOSITORY</span>
                  <a href={selectedTeam.githubUrl} target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-white underline font-mono flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    <span>{selectedTeam.githubUrl}</span>
                  </a>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-purple-500/20">
              <button
                onClick={() => setSelectedTeam(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-white/5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ADD JUDGE MODAL */}
      {/* ========================================================================= */}
      {showAddJudgeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateJudge} className="w-full max-w-md bg-slate-900 border border-purple-500/30 rounded-2xl p-6 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
              <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-400" />
                CREATE EVALUATOR IDENTITY
              </h3>
              <button type="button" onClick={() => setShowAddJudgeModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-mono block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newJudgeForm.fullName}
                  onChange={(e) => setNewJudgeForm({ ...newJudgeForm, fullName: e.target.value })}
                  placeholder="Dr. Anand R"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-purple-500/30 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-mono block mb-1">Organization / Enterprise</label>
                <input
                  type="text"
                  required
                  value={newJudgeForm.organization}
                  onChange={(e) => setNewJudgeForm({ ...newJudgeForm, organization: e.target.value })}
                  placeholder="Amazon Web Services (AWS)"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-purple-500/30 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-mono block mb-1">Designation</label>
                <input
                  type="text"
                  required
                  value={newJudgeForm.designation}
                  onChange={(e) => setNewJudgeForm({ ...newJudgeForm, designation: e.target.value })}
                  placeholder="Senior Solutions Architect"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-purple-500/30 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-mono block mb-1">Track Specialization</label>
                <select
                  value={newJudgeForm.trackSpecialization}
                  onChange={(e) => setNewJudgeForm({ ...newJudgeForm, trackSpecialization: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-purple-500/30 text-white"
                >
                  <option value="AI & Machine Learning Systems">AI & Machine Learning Systems</option>
                  <option value="Cloud Architecture & DevOps">Cloud Architecture & DevOps</option>
                  <option value="Smart Healthcare & Life Sciences">Smart Healthcare & Life Sciences</option>
                  <option value="Fintech & Decentralized Ledger">Fintech & Decentralized Ledger</option>
                  <option value="Open Innovation & Climate Tech">Open Innovation & Climate Tech</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-mono block mb-1">Assigned Hall Bay</label>
                <input
                  type="text"
                  value={newJudgeForm.assignedHall}
                  onChange={(e) => setNewJudgeForm({ ...newJudgeForm, assignedHall: e.target.value })}
                  placeholder="Auditorium Bay 1"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-purple-500/30 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-mono block mb-1">Access PIN (Leave blank to auto-generate)</label>
                <input
                  type="text"
                  value={newJudgeForm.accessPin}
                  onChange={(e) => setNewJudgeForm({ ...newJudgeForm, accessPin: e.target.value })}
                  placeholder="e.g. 202701"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-purple-500/30 text-white font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-purple-500/20">
              <button
                type="button"
                onClick={() => setShowAddJudgeModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-purple-700 hover:bg-purple-600 shadow-md"
              >
                Save Judge Profile
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
