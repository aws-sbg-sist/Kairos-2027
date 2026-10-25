'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, KeyRound, User, ArrowLeft, AlertCircle } from 'lucide-react';
import { ORGANIZING_ROSTER } from '@/lib/config';

export default function AdminLoginPage() {
  const router = useRouter();
  const [selectedOrganizer, setSelectedOrganizer] = useState(ORGANIZING_ROSTER[0].name);
  const [passkey, setPasskey] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const currentLead = ORGANIZING_ROSTER.find(o => o.name === selectedOrganizer) || ORGANIZING_ROSTER[0];

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
          organizerName: selectedOrganizer,
          organizerRole: currentLead.role
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Authentication failed. Please verify your passkey.');
      }

      router.push('/admin');
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-kairos-darkest relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-purple-950/20 blur-[130px] rounded-full pointer-events-none" />

      {/* Return home link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 border border-purple-500/20 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Event Landing Page</span>
        </Link>
      </div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Logo & Portal Header */}
        <div className="text-center space-y-3">
          <div className="relative w-14 h-14 mx-auto">
            <Image
              src="/assets/kairos-hourglass.png"
              alt="KAIROS 2027"
              fill
              className="object-contain filter drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]"
              priority
            />
          </div>
          <div>
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block font-bold">
              AUTHORIZED CADRE ACCESS ONLY
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
              Organizer Console
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              AWS Student Builder Group (SIST Chapter) · KAIROS 2027
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel-glow border border-purple-500/30 space-y-5">
          
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Identity Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-purple-400" />
                <span>Select Your Name (Authorized Roster) *</span>
              </label>
              <select
                value={selectedOrganizer}
                onChange={(e) => setSelectedOrganizer(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm bg-slate-900"
              >
                {ORGANIZING_ROSTER.map((lead) => (
                  <option key={lead.id} value={lead.name}>
                    {lead.name} — {lead.role.split('&')[0].trim()}
                  </option>
                ))}
              </select>
              <span className="text-[11px] text-purple-300/80 block font-mono pl-1">
                Role: {currentLead.role} ({currentLead.department})
              </span>
            </div>

            {/* Master Passkey */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-purple-400" />
                <span>Master Organizer Passkey *</span>
              </label>
              <input
                type="password"
                required
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter authorized secret passkey..."
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
              />
              <span className="text-[10px] text-slate-400 block pl-1">
                Configured via <code className="text-purple-300">ADMIN_MASTER_SECRET</code> in environment
              </span>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-950 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Sign In as Organizer'}</span>
            </button>
          </form>

          {/* Quick Security Disclaimer */}
          <div className="pt-3 border-t border-purple-500/15 text-[11px] text-slate-400 text-center leading-relaxed">
            All administrative actions, status toggles, and data exports are cryptographically signed and logged with your selected organizer identity.
          </div>
        </div>

        {/* Development Helper Hint */}
        <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/15 text-center text-[11px] text-purple-300 font-mono">
          Development Default Passkey: <span className="text-white font-bold select-all">kairos2027-sist-admin</span>
        </div>
      </div>
    </div>
  );
}
