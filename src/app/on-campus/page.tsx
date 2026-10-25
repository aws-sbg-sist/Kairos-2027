'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { 
  MapPin, 
  Bus, 
  Shirt, 
  ShieldAlert, 
  Navigation, 
  Clock, 
  CheckCircle2, 
  Building2, 
  PhoneCall, 
  ShieldCheck,
  Compass
} from 'lucide-react';

export default function OnCampusGuidePage() {
  const [selectedHub, setSelectedHub] = useState<'central' | 'tambaram' | 'airport' | 'cmbt'>('central');
  const [selectedFloor, setSelectedFloor] = useState<'ground' | 'first' | 'second' | 'top'>('ground');

  const busRoutes = {
    central: {
      hubName: 'Chennai Central Railway Station (MAS)',
      boardingPoint: 'Main Portico / Pillar 4 Pickup Bay',
      departureTimes: ['Friday, Jan 22 — 06:45 AM', 'Friday, Jan 22 — 07:30 AM'],
      returnDeparture: 'Sunday, Jan 24 — 05:15 PM from Central Library Gate',
      transitDuration: 'Approx. 55 mins via OMR Express Corridor',
      driverPOC: 'Bus Captain Murugan: +91 94441 23451'
    },
    tambaram: {
      hubName: 'Tambaram Railway Station (TBM)',
      boardingPoint: 'East Tambaram Bus Stand / Sathyabama Pickup Standee',
      departureTimes: ['Friday, Jan 22 — 07:00 AM', 'Friday, Jan 22 — 07:45 AM'],
      returnDeparture: 'Sunday, Jan 24 — 05:15 PM from Central Library Gate',
      transitDuration: 'Approx. 40 mins via Medavakkam Bypass',
      driverPOC: 'Bus Captain Velu: +91 94441 23452'
    },
    airport: {
      hubName: 'Chennai International Airport (MAA)',
      boardingPoint: 'Arrival Terminal T1 — Pillar 12 Coach Bay',
      departureTimes: ['Friday, Jan 22 — 07:15 AM', 'Friday, Jan 22 — 08:00 AM'],
      returnDeparture: 'Sunday, Jan 24 — 05:15 PM from Central Library Gate',
      transitDuration: 'Approx. 45 mins via Radial Road',
      driverPOC: 'Bus Captain Sundar: +91 94441 23453'
    },
    cmbt: {
      hubName: 'CMBT Koyambedu Inter-State Bus Terminus',
      boardingPoint: 'Platform 3 Private Coach Drop / Sathyabama Standee',
      departureTimes: ['Friday, Jan 22 — 06:30 AM', 'Friday, Jan 22 — 07:15 AM'],
      returnDeparture: 'Sunday, Jan 24 — 05:15 PM from Central Library Gate',
      transitDuration: 'Approx. 60 mins via Inner Ring Road',
      driverPOC: 'Bus Captain Rajesh: +91 94441 23454'
    }
  };

  const floorplans = {
    ground: {
      title: 'Ground Level — Registration, Keynote Auditorium & Arena Foyer',
      facilities: [
        'Grand Red-Carpet Check-In & Smart NFC Badge Encoding Desks',
        'Main Keynote Auditorium (20x10ft 4K LED Screen & AV Array)',
        'Sponsor Innovation Lounge & Partner Kiosks (AWS Bedrock Arena)',
        '24/7 Filter Coffee & Electrolyte Hydration Bar'
      ]
    },
    first: {
      title: 'First Floor — Hacking Bays LH1 & LH2 (Teams 01–50)',
      facilities: [
        'Dedicated Team Bays with Spike-Protected Power Drops',
        'Dual-Band 1Gbps High-Density Wi-Fi Access Points',
        'AWS Solutions Architects Roaming Walkabout Clinic',
        'Hardware Prototyping Corner (Microcontrollers & Soldering Stations)'
      ]
    },
    second: {
      title: 'Second Floor — Hacking Bay LH3 (Teams 51–100) & Focus Labs',
      facilities: [
        'Teams 51–100 Assigned Workstations',
        'Silent Code Sprint Pods for Deep Architecture Sprints',
        'Rest & Recline Stations with Ergonomic Bean Bags',
        'First Aid & Emergency Health Station'
      ]
    },
    top: {
      title: 'Top Floor — Grand Jury Deliberation Suites & Dining Corridor',
      facilities: [
        'VIP Jury Scoring Rooms (PIN-Protected Digital Rubric Terminals)',
        'Faculty & Institutional Leadership Lounge',
        'Segregated Catering Buffet Corridors (Hot Meals & Midnight Fuel)',
        'Private Video Interview & Podcast Production Studio'
      ]
    }
  };

  const currentBus = busRoutes[selectedHub];
  const currentFloor = floorplans[selectedFloor];

  return (
    <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono text-amber-300 bg-aws-squidInk border border-aws-orange/30">
              <MapPin className="w-3.5 h-3.5 text-aws-orange" />
              <span>Round 2: Top 100 Teams Finalist Guide • Jan 22–24, 2027</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              On-Campus Venue & <span className="gradient-text-kairos">Logistics Guide</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
              Everything the Top 100 Finalist Teams need to know regarding Sathyabama Central Library floorplans, university transit bus shuttles, builder streetwear kits, and 24/7 security.
            </p>
          </div>

          {/* Section 1: Interactive Venue Map & Floorplan */}
          <div className="p-6 sm:p-10 rounded-3xl bg-aws-card border border-slate-700/60 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-950 border border-aws-orange/40 p-1.5 shrink-0 shadow-md">
                  <Image
                    src="/assets/venue.png"
                    alt="Venue Symbol"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="text-xs font-mono text-aws-orange font-bold uppercase">VENUE LAYOUT</span>
                  <h2 className="text-xl sm:text-2xl font-display font-black text-white">
                    Sathyabama Central Library Complex
                  </h2>
                </div>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Rajiv Gandhi Salai (OMR), Chennai - 600119
              </span>
            </div>

            {/* Campus Architectural Panorama Illustration */}
            <div className="relative rounded-2xl overflow-hidden border border-aws-orange/30 bg-slate-950/80 aspect-[21/9] max-h-[320px] w-full flex items-center justify-center group shadow-xl">
              <Image
                src="/assets/venue-illustration.png"
                alt="Sathyabama Central Library Arena Architectural Illustration"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="bg-slate-900/90 px-3 py-1 rounded-lg border border-slate-700/60 backdrop-blur-md">
                  Central Library Arena · 100 Hacking Bays & 24/7 Operations Hub
                </span>
                <span className="hidden sm:inline-block bg-aws-orange/90 text-slate-950 font-bold px-3 py-1 rounded-lg shadow-md">
                  100 Elite National Teams
                </span>
              </div>
            </div>

            {/* Floor selector tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {(['ground', 'first', 'second', 'top'] as const).map((floor) => (
                <button
                  key={floor}
                  onClick={() => setSelectedFloor(floor)}
                  className={`p-3 rounded-xl text-xs font-bold font-mono transition-all uppercase ${
                    selectedFloor === floor
                      ? 'bg-aws-orange text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
                  }`}
                >
                  {floor} Floor
                </button>
              ))}
            </div>

            {/* Active Floor Plan Details with Coding Workspace Visual */}
            <div className="p-6 rounded-2xl bg-aws-squidInk border border-aws-orange/30 space-y-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-white font-display">
                  {currentFloor.title}
                </h3>
                <span className="text-xs font-mono text-emerald-400 font-semibold px-2.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">
                  Gigabit Mesh & Spike-Protected Drops
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Facilities List (7 cols) */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentFloor.facilities.map((fac, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-aws-orange flex-shrink-0 mt-0.5" />
                      <span>{fac}</span>
                    </div>
                  ))}
                </div>

                {/* Workspace Floor Visual (5 cols) */}
                <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950 aspect-video flex items-center justify-center shadow-lg group">
                  <Image
                    src={selectedFloor === 'first' || selectedFloor === 'second' ? '/assets/coding-workspace.png' : '/assets/venue.png'}
                    alt="Floor Visual Architecture"
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-amber-300 border border-slate-800">
                    {selectedFloor === 'first' || selectedFloor === 'second' ? 'Hacking Bay Workstation Layout' : 'Complex Arena Hub'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Sathyabama Bus Fleet Scheduler */}
          <div className="p-6 sm:p-10 rounded-3xl bg-aws-card border border-slate-700/60 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-sky-400 font-bold uppercase">FREE TRANSIT SHUTTLES</span>
                <h2 className="text-xl sm:text-2xl font-display font-black text-white">
                  Sathyabama Chartered Bus Fleet
                </h2>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                100% Free for All Contestants
              </span>
            </div>

            <p className="text-xs text-slate-300">
              Complimentary university buses pick up builders from primary Chennai transit junctions on Friday morning and provide return dispersal on Sunday evening.
            </p>

            {/* Hub Selector Pills */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { id: 'central', label: 'Chennai Central (MAS)' },
                { id: 'tambaram', label: 'Tambaram (TBM)' },
                { id: 'airport', label: 'Chennai Airport (MAA)' },
                { id: 'cmbt', label: 'CMBT Koyambedu' },
              ].map(h => (
                <button
                  key={h.id}
                  onClick={() => setSelectedHub(h.id as any)}
                  className={`p-3 rounded-xl text-xs font-bold transition-all ${
                    selectedHub === h.id
                      ? 'bg-sky-500 text-slate-950 font-bold shadow-md'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>

            {/* Selected Bus Route Schedule Details */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-700/60 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-white">
                  Route: {currentBus.hubName}
                </h3>
                <span className="text-xs font-mono text-slate-400">{currentBus.transitDuration}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-mono text-amber-300 font-bold block">Boarding Landmark</span>
                  <span className="text-slate-200">{currentBus.boardingPoint}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-mono text-emerald-400 font-bold block">Friday Morning Departures</span>
                  <ul className="text-slate-200 space-y-0.5">
                    {currentBus.departureTimes.map((t, i) => (
                      <li key={i}>• {t}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-mono text-purple-400 font-bold block">Sunday Return Dispersal</span>
                  <span className="text-slate-200">{currentBus.returnDeparture}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-mono text-sky-400 font-bold block">Driver & Transit POC</span>
                  <span className="text-slate-200 font-mono">{currentBus.driverPOC}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Night Safety & Rest Protocols */}
          <div className="p-6 sm:p-10 rounded-3xl bg-aws-card border border-slate-700/60 shadow-xl space-y-6">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">BUILDER WELFARE</span>
                <h2 className="text-xl sm:text-2xl font-display font-black text-white">
                  Night Safety, Rest & Medical Protocols
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                  🔒
                </div>
                <h4 className="text-sm font-bold text-white">10 PM Night Lock-In Protocol</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Campus perimeter security activates at 10:00 PM nightly. No external visitor entry is permitted between 10 PM and 6 AM to guarantee full builder safety.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                  🛏️
                </div>
                <h4 className="text-sm font-bold text-white">Segregated Rest Corridors</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Quiet relaxation lounges and dedicated hostel rooms with separate secured stairwells are provided for men and women builders to take scheduled sleep breaks.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                  🚑
                </div>
                <h4 className="text-sm font-bold text-white">24/7 Campus Medical Care</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  On-campus emergency health center with qualified nursing staff and on-call university medical doctor available throughout the 48-hour continuous sprint.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Complimentary Builder Streetwear Kit */}
          <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-aws-squidInk to-slate-950 border border-aws-orange/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-mono text-aws-orange font-bold uppercase">FINALIST MERCH CRATE</span>
              <h3 className="text-2xl font-bold text-white font-display">
                Complimentary Streetwear Builder Kit
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Every finalist receives an exclusive heavyweight builder t-shirt, laser-etched smart NFC badge, holographic stickers, and sponsor swag kit upon Friday check-in.
              </p>
            </div>
            <Link
              href="/register"
              className="px-6 py-3 rounded-xl font-bold text-xs bg-aws-orange text-slate-950 hover:bg-amber-400 transition-colors shadow-md flex-shrink-0"
            >
              Verify Your Tee Size in Registration
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
