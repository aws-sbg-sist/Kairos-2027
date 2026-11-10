'use client';

import React, { Suspense, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import QRCode from 'qrcode';
import { ArrowLeft, Printer } from 'lucide-react';
import { TECHNICAL_TRACKS } from '@/lib/config';
import { sound } from '@/lib/audio';
import { haptics } from '@/lib/haptics';
import { fireGoldMilestone } from '@/lib/confetti';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';

function ParticipantPassContent() {
  const searchParams = useSearchParams();
  const teamCodeQuery = (searchParams.get('code') || 'KAIROS-T001').toUpperCase();

  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [passData, setPassData] = useState({
    participantName: 'Pooja Venkatesh',
    teamName: 'Chronos Distributed',
    role: 'Team Leader',
    institution: 'Sathyabama Institute of Science and Technology',
    track: 'Cloud-Native, High-Throughput & Distributed Systems',
    bay: 'BAY-A12 (Central Library LH1)',
    accessCode: teamCodeQuery,
    accessTier: '48H Full Arena + 7 Meal Pass',
    dates: '22–24 January 2027',
  });

  useEffect(() => {
    let active = true;
    fetch(`/api/v1/team?code=${encodeURIComponent(teamCodeQuery)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!active || !data.success || !data.team) return;
        const t = data.team;
        const lead = t.members?.find((m: any) => m.role === 'Leader') || t.members?.[0];
        const trackObj = TECHNICAL_TRACKS.find((tr) => tr.id === t.trackId);
        setPassData({
          participantName: lead?.name || t.teamName,
          teamName: t.teamName,
          role: lead?.role || 'Team Leader',
          institution: t.institutionName || lead?.college || 'Sathyabama Institute of Science and Technology',
          track: trackObj?.title || t.trackId,
          bay: t.deskBayAllocation || 'Central Library · Arena Bay',
          accessCode: t.teamCode || teamCodeQuery,
          accessTier: '48H Full Arena + 7 Meal Pass',
          dates: '22–24 January 2027',
        });
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [teamCodeQuery]);

  useEffect(() => {
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
  }, [passData]);

  const handlePrint = () => {
    sound?.playClick();
    haptics?.heavy();
    fireGoldMilestone();
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-28 pb-20 sm:pt-32 relative overflow-hidden print:p-0 print:bg-slate-950">
        {/* Background illumination */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-950/25 blur-[150px] pointer-events-none rounded-full print:hidden" />

        {/* Controls */}
        <div className="w-full max-w-md flex flex-wrap items-center justify-between gap-3 mb-6 z-10 print:hidden">
          <Link
            href={`/portal?code=${encodeURIComponent(passData.accessCode)}`}
            onClick={() => {
              sound?.playClick();
              haptics?.selection();
            }}
            className="island-btn inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-4 py-2.5 rounded-xl bg-white/5 border border-purple-500/20 transition-all active:scale-[0.97]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portal</span>
          </Link>

          <button
            type="button"
            onClick={handlePrint}
            className="island-btn inline-flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-4 py-2.5 rounded-xl shadow-sm transition-all active:scale-[0.97]"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save Badge</span>
          </button>
        </div>

        {/* Holographic Badge Card */}
        <div className="w-full max-w-md rounded-3xl glass-panel-glow border-2 border-purple-500/40 p-6 sm:p-8 relative overflow-hidden shadow-2xl shadow-purple-950/80 z-10 space-y-6 print:border-slate-800 print:shadow-none print:my-0">
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
                <h1 className="font-display font-black text-xl tracking-wider text-white block leading-none">
                  KAIROS <span className="text-purple-300 text-sm font-mono">2027</span>
                </h1>
                <span className="text-[11px] font-mono text-slate-300 tracking-tight uppercase">
                  National Technical Hackathon
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
            <span className="text-[11px] font-mono text-purple-300 uppercase tracking-widest font-semibold block">
              Official Participant Pass
            </span>
            <h2 className="text-2xl font-display font-extrabold text-white">
              {passData.participantName}
            </h2>
            <span className="text-xs font-semibold text-purple-300 block">
              {passData.teamName} · {passData.role}
            </span>
            <span className="text-xs text-slate-300 block">
              {passData.institution}
            </span>
          </div>

          {/* QR Code Container */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950/90 border border-purple-500/30">
            {qrDataUrl ? (
              <div className="relative w-44 h-44 rounded-xl overflow-hidden border border-purple-500/40 p-1 bg-black">
                <Image
                  src={qrDataUrl}
                  alt="Arena Entry QR Code"
                  width={176}
                  height={176}
                  unoptimized
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-44 h-44 flex items-center justify-center text-xs font-mono text-slate-400">
                Generating Security Token...
              </div>
            )}
            <span className="text-xs font-mono text-purple-300 mt-2 font-bold tracking-widest">
              {passData.accessCode}
            </span>
          </div>

          {/* Venue & Track Allocations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left text-xs">
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20">
              <span className="text-[11px] font-mono text-purple-300 uppercase block">Allocated Bay</span>
              <span className="font-bold text-white text-xs block break-words">{passData.bay}</span>
            </div>

            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20">
              <span className="text-[11px] font-mono text-purple-300 uppercase block">Access Tier</span>
              <span className="font-bold text-emerald-300 text-xs block">{passData.accessTier}</span>
            </div>

            <div className="sm:col-span-2 p-3 rounded-xl bg-purple-950/40 border border-purple-500/20">
              <span className="text-[11px] font-mono text-purple-300 uppercase block">Track</span>
              <span className="font-bold text-white text-xs block">{passData.track}</span>
            </div>
          </div>

          {/* Security Watermark Footnote */}
          <div className="text-[11px] font-mono text-slate-400 text-center leading-tight">
            Central Library & Campus Bays · 22–24 Jan 2027 · Valid with Student ID Card
          </div>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}

export default function ParticipantPassPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-aws-canvas text-white pt-32 text-center font-mono"><h1 className="sr-only">Digital Builder Pass</h1>Generating builder pass...</div>}>
      <ParticipantPassContent />
    </Suspense>
  );
}
