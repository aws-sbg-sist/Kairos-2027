'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import QRCode from 'qrcode';
import { ArrowLeft, Printer, ShieldCheck, MapPin, Calendar, Clock, AlertCircle, ArrowRight } from 'lucide-react';
import { ParticipantPassData } from '@/lib/pass';

export default function ParticipantPassPage() {
  const [loading, setLoading] = useState(true);
  const [passData, setPassData] = useState<ParticipantPassData | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/v1/pass/me')
      .then(async (res) => {
        if (res.status === 401) {
          setPassData(null);
          return null;
        }
        if (!res.ok) {
          const errJson = await res.json().catch(() => ({}));
          throw new Error(errJson.error || 'Failed to retrieve digital pass.');
        }
        return res.json();
      })
      .then(async (data) => {
        if (data && data.success && data.pass) {
          setPassData(data.pass);
          // Generate QR code using ONLY the opaque verification URL / opaque token
          // Security constraint: QR code contains an opaque verification identifier, NEVER raw PII.
          const qrPayload = data.pass.verificationUrl || data.pass.opaqueToken;
          try {
            const url = await QRCode.toDataURL(qrPayload, {
              width: 240,
              margin: 1,
              color: {
                dark: '#ffffff',
                light: '#0a0a1a',
              },
            });
            setQrDataUrl(url);
          } catch (qrErr) {
            console.error('[QR Error]:', qrErr);
          }
        }
      })
      .catch((err) => {
        console.error('[Pass Error]:', err);
        setError(err.message || 'Unable to generate participant pass.');
      })
      .finally(() => setLoading(false));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  // 1. Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-kairos-darkest text-slate-100 flex flex-col justify-center items-center">
        <div className="w-10 h-10 border-3 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mb-4" />
        <span className="text-xs font-mono text-slate-400">Issuing cryptographic builder pass...</span>
      </div>
    );
  }

  // 2. Unauthenticated Protected View
  if (!passData) {
    return (
      <div className="min-h-screen bg-kairos-darkest text-slate-100 flex flex-col justify-center items-center px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-purple-950/20 blur-[130px] rounded-full pointer-events-none" />
        
        <div className="w-full max-w-md bg-slate-900/80 border border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl text-center z-10 shadow-2xl space-y-6">
          <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/30 rounded-full flex items-center justify-center mx-auto text-purple-400">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-display font-black text-white">
              Authentication Required for Pass Generation
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your official KAIROS 2027 Digital Badge is cryptographically bound to your verified student identity. Please sign in to generate your digital badge.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2"
            >
              <span>Sign In to View Pass</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/register"
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 border border-slate-700 hover:border-slate-600 text-slate-300 text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Register as Builder</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-400">
              ← Return to Main Stage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kairos-darkest text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-950/25 blur-[150px] pointer-events-none rounded-full" />

      {/* Navigation & Controls */}
      <div className="w-full max-w-md flex items-center justify-between mb-6 z-10">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 border border-purple-500/20 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-purple-700 hover:bg-purple-600 px-3.5 py-1.5 rounded-xl shadow-sm transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Save Badge</span>
        </button>
      </div>

      {/* Unverified Email Warning if applicable */}
      {!passData.emailVerified && (
        <div className="w-full max-w-md mb-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2.5 text-xs text-amber-300 z-10">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>Email unverified. Verify your email to ensure uninterrupted stadium access.</span>
        </div>
      )}

      {/* Holographic Badge Card */}
      <div className="w-full max-w-md rounded-3xl glass-panel-glow border-2 border-purple-500/40 p-6 sm:p-8 relative overflow-hidden shadow-2xl shadow-purple-950/80 z-10 space-y-6">
        
        {/* Holographic Top Stripe */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-900" />

        {/* Lanyard Slot Cutout Simulation */}
        <div className="w-16 h-2 rounded-full bg-slate-900 border border-purple-500/30 mx-auto" />

        {/* Badge Header with Logos */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2.5">
            <div className="relative w-10 h-10">
              <Image
                src="/assets/kairos-hourglass.png"
                alt="KAIROS Logo"
                fill
                className="object-contain filter drop-shadow-md"
                priority
              />
            </div>
            <div>
              <span className="font-display font-black text-xl tracking-wider text-white block leading-none">
                KAIROS <span className="text-purple-400 text-sm font-mono">2027</span>
              </span>
              <span className="text-[9px] font-mono text-slate-400 tracking-tight">
                NATIONAL TECHNICAL HACKATHON
              </span>
            </div>
          </div>

          <div className="relative w-8 h-8">
            <Image
              src="/assets/aws-sbg-logo.png"
              alt="AWS SBG"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Builder Identity */}
        <div className="text-center py-2 space-y-1 border-y border-purple-500/20">
          <span className="text-[10px] font-mono text-purple-400 font-semibold block uppercase">
            OFFICIAL PARTICIPANT PASS
          </span>
          <h2 className="text-2xl font-display font-extrabold text-white">
            {passData.participantName}
          </h2>
          <span className="text-xs font-semibold text-purple-300 block">
            {passData.teamName} · {passData.role}
          </span>
          <span className="text-[11px] text-slate-400 block truncate">
            {passData.institution}
          </span>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950/90 border border-purple-500/30">
          {qrDataUrl ? (
            <div className="relative w-44 h-44 rounded-xl overflow-hidden border border-purple-500/40 p-1 bg-black">
              <img
                src={qrDataUrl}
                alt="Cryptographic Verification Token QR"
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-44 h-44 flex items-center justify-center text-xs font-mono text-slate-500">
              Generating Security Token...
            </div>
          )}
          <span className="text-[10px] font-mono text-purple-300 mt-2 font-bold tracking-wider">
            {passData.accessCode}
          </span>
          <span className="text-[9px] font-mono text-emerald-400 mt-0.5 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span>CRYPTOGRAPHICALLY SIGNED IDENTIFIER</span>
          </span>
        </div>

        {/* Venue & Track Allocations */}
        <div className="grid grid-cols-2 gap-2 text-left text-xs">
          <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20">
            <span className="text-[9px] font-mono text-purple-400 block">ALLOCATED BAY</span>
            <span className="font-bold text-white text-xs block truncate">{passData.bay}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20">
            <span className="text-[9px] font-mono text-purple-400 block">ACCESS TIER</span>
            <span className="font-bold text-emerald-400 text-xs block truncate">{passData.accessTier}</span>
          </div>

          <div className="col-span-2 p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20">
            <span className="text-[9px] font-mono text-purple-400 block">TRACK</span>
            <span className="font-bold text-white text-xs block truncate">{passData.track}</span>
          </div>
        </div>

        {/* Security Watermark Footnote */}
        <div className="text-[9px] font-mono text-slate-500 text-center leading-tight">
          Sathyabama Indoor Auditorium · 22 to 24 Jan 2027 · Valid with Physical Student ID
        </div>
      </div>
    </div>
  );
}
