'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Shield, Volume2, VolumeX, Trophy, Users, BookOpen, Gift } from 'lucide-react';
import { sound } from '@/lib/audio';

interface NavbarProps {
  onOpenWaitlist?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWaitlist }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    if (sound) {
      setSoundEnabled(sound.isEnabled());
      const unsub = sound.subscribe((en) => setSoundEnabled(en));
      return () => {
        window.removeEventListener('scroll', handleScroll);
        unsub();
      };
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Tracks', href: '/tracks' },
    { label: '48H Schedule', href: '/#schedule' },
    { label: 'Resources', href: '/resources' },
    { label: 'Qualifier (R1)', href: '/online-qualifier' },
    { label: 'On-Campus (R2)', href: '/on-campus' },
    { label: 'Rainmaker ₹', href: '/refer-sponsor', badge: 'Earn Cash' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'Leadership', href: '/members/leadership' },
    { label: 'Rules', href: '/rules' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-aws-squidInk/95 backdrop-blur-md border-b border-aws-orange/20 py-2.5 shadow-lg shadow-black/50'
          : 'bg-aws-canvas/80 backdrop-blur-sm border-b border-white/5 py-3.5'
      }`}
    >
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-aws-orange/20 via-purple-600/20 to-aws-blue/20 border-b border-aws-orange/15 py-1 px-4 text-center text-[11px] font-mono text-slate-200 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <strong className="text-white">NATIONAL APPLICATIONS OPEN:</strong> 100% Free • ₹0 Entry Fee • ₹1,75,000 Pure Cash
          </span>
          <div className="flex items-center gap-4 text-[10px]">
            <Link href="/refer-sponsor" className="text-amber-300 hover:text-white underline font-semibold">
              Refer a Corporate Sponsor $\rightarrow$ Earn 10%–15% Pure Cash
            </Link>
            <span className="text-slate-400">|</span>
            <a href="https://meetup.com/aws-student-builder-group-sist" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300">
              Meetup Chapter ↗
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Co-Branding Lockup */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-aws-orange rounded-lg p-1">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0">
              <Image
                src="/assets/kairos-hourglass.png"
                alt="KAIROS 2027 Logo"
                fill
                sizes="40px"
                className="object-contain filter drop-shadow-[0_0_12px_rgba(255,153,0,0.6)] group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-lg sm:text-xl tracking-wider text-white">
                  KAIROS
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-aws-orange/20 text-aws-orange border border-aws-orange/40">
                  2027
                </span>
              </div>
              <span className="text-[10px] text-slate-300 tracking-tight font-medium hidden sm:inline-block">
                AWS Student Builder Group · SIST
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-medium text-slate-200">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => sound?.playHover()}
                  onClick={() => sound?.playClick()}
                  className={`px-2.5 py-1.5 rounded-md transition-all relative ${
                    isActive
                      ? 'text-white bg-aws-orange/15 font-semibold text-aws-orange border border-aws-orange/30'
                      : 'hover:text-white hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {link.label}
                    {link.badge && (
                      <span className="px-1 py-0.2 rounded text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {link.badge}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={() => sound?.toggle()}
              onMouseEnter={() => sound?.playHover()}
              className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all flex items-center gap-1 text-xs font-mono"
              title={soundEnabled ? "Mute Ambient FX" : "Enable Ambient FX"}
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
              )}
            </button>

            <Link
              href="/dashboard"
              onMouseEnter={() => sound?.playHover()}
              onClick={() => sound?.playClick()}
              className="text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded border border-white/10 hover:border-aws-orange/30 transition-all"
            >
              Dashboard
            </Link>

            <Link
              href="/admin/login"
              onMouseEnter={() => sound?.playHover()}
              onClick={() => sound?.playClick()}
              className="text-xs text-slate-400 hover:text-purple-300 px-2.5 py-1.5 rounded border border-transparent hover:border-purple-500/20 transition-all flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>Admin</span>
            </Link>

            <Link
              href="/register"
              onMouseEnter={() => sound?.playHover()}
              onClick={() => sound?.playClick()}
              className="relative group px-4 py-2 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-aws-orange via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-aws-orange shadow-md shadow-aws-orange/20 transition-all duration-300 active:scale-95 flex items-center gap-1.5"
            >
              <span>Register (100% Free)</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center gap-2">
            <Link
              href="/register"
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-aws-orange text-slate-950 shadow-sm"
            >
              Register Free
            </Link>
            <button
              onClick={() => { sound?.playClick(); setMobileMenuOpen(!mobileMenuOpen); }}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 p-4 rounded-xl glass-panel border border-aws-orange/20 space-y-2 animate-fadeIn bg-aws-squidInk/95">
            <div className="grid grid-cols-2 gap-1 pb-2 border-b border-white/10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => { sound?.playClick(); setMobileMenuOpen(false); }}
                  className="px-3 py-2 rounded-lg text-xs text-slate-200 hover:text-white hover:bg-aws-orange/15 font-medium flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1 py-0.2 rounded text-[8px] bg-emerald-500/20 text-emerald-300">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-center py-2.5 rounded-lg font-bold bg-aws-orange text-slate-950"
              >
                Register Team (100% Free)
              </Link>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300"
                >
                  Hacker Dashboard
                </Link>
                <Link
                  href="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 rounded-lg bg-slate-900 border border-purple-500/20 text-purple-300 flex items-center justify-center gap-1"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
