'use client';

import React, { Suspense, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  ShieldCheck, 
  KeyRound, 
  User, 
  ArrowLeft, 
  AlertCircle, 
  Eye,
  EyeOff,
  Lock,
  Workflow,
  CheckCircle2
} from 'lucide-react';
import { ADMIN_LEADS } from '@/lib/cadre_leads';

export default function AdminLoginPage() {
  return <Suspense fallback={<div className="min-h-screen bg-aws-canvas" />}><AdminLoginForm /></Suspense>;
}

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedRedirect = searchParams?.get('redirect');
  const redirectTarget = requestedRedirect && /^\/admin(?:\/|\?|$)/.test(requestedRedirect)
    ? requestedRedirect
    : '/admin';

  const [selectedLeadId, setSelectedLeadId] = useState<string>(ADMIN_LEADS[0].id);
  const [passkey, setPasskey] = useState('');
  const [showPasskey, setShowPasskey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const currentLead = ADMIN_LEADS.find(l => l.id === selectedLeadId) || ADMIN_LEADS[0];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passkey: passkey.trim(),
          organizerName: currentLead.name
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Authentication failed. Please verify your designated passkey.');
      }

      router.push(redirectTarget);
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-aws-canvas text-aws-snow relative overflow-hidden select-none">
      {/* Return home link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/40 backdrop-blur-md transition-colors duration-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Public Portal</span>
        </Link>
      </div>

      <div className="w-full max-w-lg relative z-10 space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="relative w-14 h-14 mx-auto drop-shadow-2xl">
            <Image
              src="/assets/kairos-hourglass.png"
              alt="KAIROS 2027"
              fill
              className="object-contain filter drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]"
              priority
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider text-purple-300 bg-purple-950/60 border border-purple-500/30 shadow-inner">
              <Lock className="w-3 h-3 text-purple-400" />
              <span>CADRE RBAC COMMAND GATEWAY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight mt-2.5">
              Executive Console
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              AWS Student Builder Group (SIST Chapter) • Tournament Operations
            </p>
          </div>
        </div>

        {/* Main Sleek Login Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden space-y-5">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-aws-orange/80" />

          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold block font-mono text-[11px] text-rose-300">AUTHENTICATION DENIED</span>
                <span className="text-xs leading-relaxed">{errorMessage}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Identity Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300 flex items-center justify-between font-bold">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-purple-400" />
                  <span>Cadre Executive Identity *</span>
                </span>
                <span className="text-[10px] text-slate-500 font-normal">Official SBGL Roster</span>
              </label>

              <div className="relative">
                <select
                  value={selectedLeadId}
                  onChange={(e) => {
                    setSelectedLeadId(e.target.value);
                    setErrorMessage('');
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500 transition-colors cursor-pointer appearance-none pr-10 font-medium"
                >
                  {ADMIN_LEADS.map((lead) => (
                    <option key={lead.id} value={lead.id} className="bg-slate-950 text-white py-1">
                      {lead.name} — {lead.role.split('&')[0].trim()}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Dynamic Pipeline Preview Card */}
            <div className={`p-4 rounded-2xl border text-xs space-y-2 transition-colors duration-300 ${currentLead.badgeColor}`}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 font-bold font-mono text-[11px]">
                  <Workflow className="w-3.5 h-3.5" />
                  <span>PIPELINE: {currentLead.pipelineName}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 uppercase">
                  {currentLead.id.replace('org-', '')}
                </span>
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                {currentLead.pipelineDescription}
              </p>

              <div className="pt-1 flex flex-wrap gap-1.5">
                {currentLead.allowedTabs.map(tab => (
                  <span
                    key={tab}
                    className="px-2 py-0.5 rounded-md bg-black/40 border border-white/10 text-[10px] font-mono text-slate-300"
                  >
                    #{tab}
                  </span>
                ))}
              </div>
            </div>

            {/* Passkey Input with Visibility Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300 flex items-center justify-between font-bold">
                <span className="flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-purple-400" />
                  <span>Executive Cadre Passkey *</span>
                </span>
                <span className="text-[10px] text-purple-400/80 font-normal">256-Bit RBAC</span>
              </label>

              <div className="relative">
                <input
                  type={showPasskey ? 'text' : 'password'}
                  required
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  placeholder="Enter your designated cadre passkey..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500 transition-colors pr-11 font-mono tracking-wide"
                />
                <button
                  type="button"
                  onClick={() => setShowPasskey(!showPasskey)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1"
                  title={showPasskey ? 'Hide passkey' : 'Show passkey'}
                >
                  {showPasskey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <p className="text-[11px] text-slate-400 pl-1 font-mono">
                Enter your assigned personal lead security passkey.
              </p>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={loading || !passkey}
              className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white btn-primary-themed shadow-xl shadow-purple-900/30 transition-[transform,opacity] flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{loading ? 'Authenticating Cadre...' : 'Unlock Executive Pipeline'}</span>
            </button>
          </form>

          {/* Security Banner */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-[10px] font-mono text-slate-400 text-center">
            <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
            <span>Cryptographic HMAC Token • Role-Based Pipeline Authorization</span>
          </div>
        </div>

      </div>
    </div>
  );
}
