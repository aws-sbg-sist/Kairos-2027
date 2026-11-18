'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Mail, Lock, ArrowLeft, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function StudentLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Authentication failed. Please check your credentials.');
      }

      // Successful login - redirect to builder portal
      router.push('/portal');
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-kairos-darkest relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-950/25 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-950/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Return Home Link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 border border-purple-500/20 hover:border-purple-500/40 transition-colors backdrop-blur-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Main Stage</span>
        </Link>
      </div>

      <div className="w-full max-w-md z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>Builder Authentication</span>
          </div>

          <div className="flex justify-center items-center gap-3 mb-2">
            <Image
              src="/assets/kairos-hourglass.png"
              alt="KAIROS 2027"
              width={38}
              height={38}
              className="object-contain"
            />
            <h1 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight">
              Sign In to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">KAIROS</span>
            </h1>
          </div>
          
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Access your Digital Builder Pass, manage your squad roster, and track your evaluation progress.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/80 border border-purple-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative">
          
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="builder@sathyabama.ac.in"
                  className="w-full bg-slate-950/70 border border-slate-700/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-[11px] text-purple-400 hover:text-purple-300 hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950/70 border border-slate-700/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-purple-600/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Verifying Identity...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Builder Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Registration Redirect */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center text-xs text-slate-400">
            <span>New builder? </span>
            <Link
              href="/register"
              className="text-purple-400 font-semibold hover:text-purple-300 hover:underline transition-colors"
            >
              Create Account (100% Free)
            </Link>
          </div>
        </div>

        {/* Staff / Admin link */}
        <div className="text-center mt-6">
          <Link
            href="/admin/login"
            className="text-[11px] font-mono text-slate-500 hover:text-slate-400 transition-colors"
          >
            Looking for Organizer / Faculty Portal? →
          </Link>
        </div>

      </div>
    </div>
  );
}
