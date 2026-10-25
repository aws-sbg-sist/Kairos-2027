'use client';

import React from 'react';
import Image from 'next/image';
import { Clock, Users, IndianRupee, MapPin, Shield, Award } from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/config';

export const FactsStrip: React.FC = () => {
  const facts = [
    {
      icon: Clock,
      image: '/assets/duration.png',
      value: '48 Hours',
      label: 'Continuous Offline Hackathon',
      detail: '22 Jan 09:30 AM – 24 Jan 05:00 PM IST',
    },
    {
      icon: Users,
      image: '/assets/teams.png',
      value: '100 Elite Teams',
      label: '4 to 6 Builders Per Team',
      detail: '400–600 Shortlisted National Hackers',
    },
    {
      icon: IndianRupee,
      image: '/assets/register.png',
      value: '₹0 Fee (100% Free)',
      label: 'Zero Entry or Attendance Fee',
      detail: 'Meals, Stay, Swag & AWS Credits Free',
    },
    {
      icon: Award,
      image: '/assets/prizes.png',
      value: '₹1,75,000 Pure Cash',
      label: 'National Cash Prize Pool',
      detail: '₹60k Champion • ₹35k Tracks • Bounties',
    },
    {
      icon: MapPin,
      image: '/assets/venue.png',
      value: 'Central Library',
      label: 'Sathyabama University, Chennai',
      detail: '1Gbps Wi-Fi Mesh & Power Drops',
    },
    {
      icon: Shield,
      image: '/assets/challenges.png',
      value: 'Dual-Phase Quality',
      label: 'Round 1 Qualifier → Round 2 Finale',
      detail: 'Top 250 Online → Top 100 On-Campus',
    },
  ];

  return (
    <section className="relative py-12 border-y border-aws-orange/20 bg-aws-squidInk/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {facts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60 hover:border-aws-orange/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-aws-orange/15 text-aws-orange flex items-center justify-center group-hover:scale-110 group-hover:bg-aws-orange/25 transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                    {item.image && (
                      <div className="relative w-8 h-8 rounded-md overflow-hidden bg-slate-950/80 border border-slate-800 p-1 group-hover:border-aws-orange/40 transition-colors">
                        <Image
                          src={item.image}
                          alt={item.label}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <div className="font-display font-black text-lg sm:text-xl text-white tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-xs font-semibold text-slate-200 mt-0.5">
                    {item.label}
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 mt-2 leading-tight font-mono">
                  {item.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
