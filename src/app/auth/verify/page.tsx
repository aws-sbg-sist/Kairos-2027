'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [studentInfo, setStudentInfo] = useState<any>(null);

  useEffect(() => {
    if (!token) {
      setVerifying(false);
      setErrorMessage('No verification token provided in URL. Please click the link received in your email.');
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Verification failed. The token may be expired or invalid.');
        }

        setSuccess(true);
        setStudentInfo(data.student);
      } catch (err: any) {
        setErrorMessage(err.message || 'Verification failed.');
      } finally {
        setVerifying(false);
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="w-full max-w-md z-10">
      
      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-wider mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
          <span>Identity Verification</span>
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
            KAIROS <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">2027</span>
          </h1>
        </div>
      </div>

      {/* Verification Card */}
      <div className="bg-slate-900/80 border border-purple-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl text-center">
        
        {verifying && (
          <div className="py-8">
            <div className="w-12 h-12 border-3 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
            <h2 className="text-base font-semibold text-white mb-2">Verifying Your Builder Pass...</h2>
            <p className="text-xs text-slate-400">Confirming your cryptographic token on the server.</p>
          </div>
        )}

        {!verifying && success && (
          <div className="py-4">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <h2 className="text-lg font-bold text-white mb-2">Email Successfully Verified!</h2>
            <p className="text-xs text-slate-300 mb-6">
              Welcome, <span className="text-purple-300 font-semibold">{studentInfo?.fullName || 'Builder'}</span>. Your identity is verified and your digital builder pass is now active.
            </p>

            <Link
              href="/portal"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Enter Builder Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {!verifying && !success && (
          <div className="py-4">
            <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-red-400">
              <AlertCircle className="w-8 h-8" />
            </div>
            
            <h2 className="text-lg font-bold text-white mb-2">Verification Failed</h2>
            <p className="text-xs text-red-300 mb-6">{errorMessage}</p>

            <div className="flex flex-col gap-2.5">
              <Link
                href="/login"
                className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Back to Sign In</span>
              </Link>
              <Link
                href="/register"
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 border border-slate-700 hover:border-slate-600 text-slate-300 text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Create New Account</span>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-kairos-darkest relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-purple-950/20 blur-[130px] rounded-full pointer-events-none" />

      {/* Return home link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 border border-purple-500/20 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
      </div>

      <Suspense fallback={
        <div className="text-slate-400 text-xs flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <span>Loading verification portal...</span>
        </div>
      }>
        <VerifyEmailContent />
      </Suspense>

    </div>
  );
}
