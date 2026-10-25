'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import QRCode from 'qrcode';
import { ArrowLeft, Printer, Download, ShieldCheck, Sparkles, MapPin, Calendar, Clock } from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/config';

export default function ParticipantPassPage() {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const passData = {
    participantName: 'Pooja Venkatesh',
    teamName: 'Chronos Distributed',
    role: 'Team Leader',
    institution: 'Sathyabama Institute of Science and Technology',
    track: 'Cloud-Native Distributed Systems',
    bay: 'Stadium Arena Bay B-14',
    accessCode: 'KAIROS-2027-BLDR-4411',
    accessTier: '48H Full Arena + 7 Meal Pass',
    dates: '22–24 January 2027',
  };

  useEffect(() => {
    // Generate real QR code image
    const payload = JSON.stringify({
      event: 'KAIROS_2027',
      code: passData.accessCode,
      name: passData.participantName,
      team: passData.teamName,
      bay: passData.bay,
    });

    QRCode.toDataURL(payload, {
      width: 240,
      margin: 1,
      color: {
        dark: '#ffffff',
        light: '#0a0a1a',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('[QR Error]:', err));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-kairos-darkest text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-950/25 blur-[150px] pointer-events-none rounded-full" />

      {/* Navigation & Controls */}
      <div className="w-full max-w-md flex items-center justify-between mb-6 z-10">
        <Link
          href="/portal"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 border border-purple-500/20 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-purple-700 hover:bg-purple-600 px-3.5 py-1.5 rounded-xl shadow-sm transition-all"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Save Badge</span>
        </button>
      </div>

      {/* Holographic Badge Card */}
      <div className="w-full max-w-md rounded-3xl glass-panel-glow border-2 border-purple-500/40 p-6 sm:p-8 relative overflow-hidden shadow-2xl shadow-purple-950/80 z-10 space-y-6">
        
        {/* Holographic Top Stripe */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-sky-400 to-indigo-500" />

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
                className="object-contain filter drop-shadow-[0_0_12px_rgba(168,85,247,0.7)]"
                priority
              />
            </div>
            <div>
              <span className="font-display font-black text-xl tracking-wider text-white block leading-none">
                KAIROS <span className="text-purple-400 text-sm font-mono">2027</span>
              </span>
              <span className="text-[9px] font-mono text-slate-400 tracking-tight uppercase">
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
          <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-semibold block">
            OFFICIAL PARTICIPANT PASS
          </span>
          <h2 className="text-2xl font-display font-extrabold text-white">
            {passData.participantName}
          </h2>
          <span className="text-xs font-semibold text-purple-300 block">
            {passData.teamName} · {passData.role}
          </span>
          <span className="text-[11px] text-slate-400 block">
            {passData.institution}
          </span>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950/90 border border-purple-500/30">
          {qrDataUrl ? (
            <div className="relative w-44 h-44 rounded-xl overflow-hidden border border-purple-500/40 p-1 bg-black">
              <img
                src={qrDataUrl}
                alt="Stadium Security QR Code"
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-44 h-44 flex items-center justify-center text-xs font-mono text-slate-500">
              Generating Security Token...
            </div>
          )}
          <span className="text-[10px] font-mono text-purple-300 mt-2 font-bold tracking-widest">
            {passData.accessCode}
          </span>
        </div>

        {/* Venue & Track Allocations */}
        <div className="grid grid-cols-2 gap-2 text-left text-xs">
          <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20">
            <span className="text-[9px] font-mono text-purple-400 uppercase block">ALLOCATED BAY</span>
            <span className="font-bold text-white text-xs block truncate">{passData.bay}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20">
            <span className="text-[9px] font-mono text-purple-400 uppercase block">ACCESS TIER</span>
            <span className="font-bold text-emerald-400 text-xs block truncate">{passData.accessTier}</span>
          </div>

          <div className="col-span-2 p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20">
            <span className="text-[9px] font-mono text-purple-400 uppercase block">TRACK</span>
            <span className="font-bold text-white text-xs block truncate">{passData.track}</span>
          </div>
        </div>

        {/* Security Watermark Footnote */}
        <div className="text-[9px] font-mono text-slate-500 text-center leading-tight">
          Sathyabama Indoor Stadium · 22–24 Jan 2027 · Valid with Student ID Card
        </div>
      </div>
    </div>
  );
}
