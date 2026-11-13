'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Shield, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { sound } from '@/lib/audio';
import { haptics } from '@/lib/haptics';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

interface NavLinkItem {
  label: string;
  href: string;
  badge?: string;
}

interface NavbarProps {
  onOpenWaitlist?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWaitlist }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setMoreMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    
    if (sound) {
      setSoundEnabled(sound.isEnabled());
      const unsub = sound.subscribe((en) => setSoundEnabled(en));
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('keydown', handleKeyDown);
        unsub();
      };
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const primaryNavLinks: NavLinkItem[] = [
    { label: 'Tracks', href: '/tracks' },
    { label: 'Schedule', href: '/#schedule' },
    { label: 'Qualifier', href: '/online-qualifier' },
    { label: 'Rules', href: '/rules' },
    { label: 'Sponsors', href: '/sponsors' },
  ];

  const secondaryNavLinks: NavLinkItem[] = [
    { label: 'Community Builder Grants', href: '/refer-sponsor', badge: 'Grants' },
    { label: 'AWS Learning Library', href: '/resources' },
    { label: 'Live Leaderboard & Z-Score', href: '/leaderboard' },
    { label: 'Leadership Gallery', href: '/members/leadership' },
    { label: 'Round 2 On-Campus Guide', href: '/on-campus' },
  ];

  const allNavLinks: NavLinkItem[] = [...primaryNavLinks, ...secondaryNavLinks];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[70] pointer-events-auto transition-all duration-300 ${
        scrolled
          ? 'bg-aws-squidInk/95 backdrop-blur-md border-b border-purple-500/20 py-2.5 shadow-lg shadow-black/50'
          : 'bg-aws-canvas/80 backdrop-blur-sm border-b border-white/5 py-3.5'
      }`}
    >
      {/* Top micro announcement bar */}
      <div
        role="region"
        aria-label="Official Announcement"
        aria-live="polite"
        className="bg-gradient-to-r from-aws-orange/15 via-aws-blue/15 to-aws-orange/15 border-b border-purple-500/20 py-1 px-4 text-center text-[11px] font-mono text-slate-200 hidden md:block"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <strong className="text-white">NATIONAL APPLICATIONS OPEN:</strong> 100% Free • ₹0 Entry Fee • ₹1,75,000 Total Prize Pool
          </span>
          <div className="flex items-center gap-4 text-[10px]">
            <Link href="/sponsors" className="text-purple-300 hover:text-white underline font-semibold focus-visible:ring-1 focus-visible:ring-aws-orange rounded px-1">
              Corporate & Community Partnerships Open → Partner With Kairos 2027
            </Link>
            <span className="text-slate-400">|</span>
            <a href="https://meetup.com/aws-student-builder-group-sist" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 focus-visible:ring-1 focus-visible:ring-aws-orange rounded px-1">
              Meetup Chapter ↗
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          
          {/* Logo & Co-Branding Lockup */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-aws-orange rounded-lg p-1 min-w-0" aria-label="KAIROS 2027 Homepage">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
              <Image
                src="/assets/kairos-hourglass.png"
                alt="KAIROS 2027 Logo"
                width={40}
                height={40}
                className="object-contain filter drop-shadow-[0_0_14px_rgba(168,85,247,0.4)] group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-base sm:text-xl tracking-wider text-white">
                  KAIROS
                </span>
                <span className="hidden sm:inline-block text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/40">
                  2027
                </span>
              </div>
              <span className="text-[11px] text-slate-300 tracking-tight font-medium hidden sm:inline-block whitespace-nowrap">
                AWS Student Builder Group · SIST
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links - Spacious & Streamlined */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-2 text-xs font-medium text-slate-200" aria-label="Main Navigation">
            {primaryNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => {
                    sound?.playHover();
                    haptics?.light();
                  }}
                  onClick={() => {
                    sound?.playClick();
                    haptics?.selection();
                  }}
                  className={`px-2 xl:px-3 py-1.5 rounded-md transition-all relative whitespace-nowrap flex-shrink-0 active:scale-[0.97] ${
                    isActive
                      ? 'text-white bg-purple-950/50 font-semibold text-purple-400 border border-purple-500/30'
                      : 'hover:text-white hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    {link.label}
                    {link.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-purple-950/50 text-purple-400 border border-purple-500/30 font-semibold whitespace-nowrap flex-shrink-0">
                        {link.badge}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}

            {/* Elegant "More" Dropdown */}
            <div className="relative" onMouseLeave={() => setMoreMenuOpen(false)}>
              <button
                onClick={() => {
                  haptics?.selection();
                  setMoreMenuOpen(!moreMenuOpen);
                }}
                onMouseEnter={() => {
                  haptics?.light();
                  setMoreMenuOpen(true);
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-md hover:text-white hover:bg-white/5 text-slate-300 transition-all active:scale-[0.97]"
                aria-expanded={moreMenuOpen}
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreMenuOpen && (
                <div className="absolute top-full right-0 mt-1.5 w-48 py-2 rounded-xl bg-slate-950/95 border border-white/10 shadow-2xl backdrop-blur-xl z-50 origin-top-right animate-popover-in stagger-rows">
                  {secondaryNavLinks.map((subLink) => (
                    <Link
                      key={subLink.label}
                      href={subLink.href}
                      onClick={() => {
                        sound?.playClick();
                        haptics?.selection();
                        setMoreMenuOpen(false);
                      }}
                      className="block px-3.5 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {subLink.label}
                    </Link>
                  ))}
                  <div className="my-1 border-t border-white/10" />
                  <Link
                    href="/admin/login"
                    onClick={() => {
                      sound?.playClick();
                      haptics?.selection();
                      setMoreMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-3.5 py-2 text-xs text-slate-300 hover:text-white hover:bg-purple-950/40 transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5 text-purple-400" />
                    <span>Admin Portal</span>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 flex-shrink-0">
            {/* Theme Toggle (Cyber Neon vs AWS Classic) */}
            <ThemeToggle />

            {/* Audio Toggle with Animated Aerospace Equalizer */}
            <button
              onClick={() => {
                haptics?.medium();
                sound?.toggle();
              }}
              onMouseEnter={() => {
                sound?.playHover();
                haptics?.light();
              }}
              aria-label={soundEnabled ? "Mute ambient sound effects" : "Enable ambient sound effects"}
              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-aws-orange focus-visible:outline-none"
              title={soundEnabled ? "Mute Ambient FX" : "Enable Ambient FX"}
            >
              {soundEnabled ? (
                <div className="flex items-center gap-1.5">
                  <div className="flex items-end gap-0.5 h-3.5 w-3 pb-0.5" aria-hidden="true">
                    <span className="w-0.5 bg-emerald-400 rounded-full sound-bar-1" />
                    <span className="w-0.5 bg-purple-400 rounded-full sound-bar-2" />
                    <span className="w-0.5 bg-sky-400 rounded-full sound-bar-3" />
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold hidden xl:inline">FX ON</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                  <span className="text-[10px] text-slate-400 hidden xl:inline">MUTED</span>
                </div>
              )}
            </button>

            <Link
              href="/dashboard"
              onMouseEnter={() => {
                sound?.playHover();
                haptics?.light();
              }}
              onClick={() => {
                sound?.playClick();
                haptics?.medium();
              }}
              className="text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded border border-white/10 hover:border-purple-500/30 transition-all active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-aws-orange focus-visible:outline-none"
            >
              Dashboard
            </Link>

            <Link
              href="/register"
              onMouseEnter={() => {
                sound?.playHover();
                haptics?.light();
              }}
              onClick={() => {
                sound?.playClick();
                haptics?.heavy();
              }}
              className="relative group px-4 py-2 rounded-lg text-xs font-bold text-white btn-primary-themed shadow-md shadow-purple-900/30 transition-all duration-300 active:scale-[0.97] flex items-center gap-1.5 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-aws-orange focus-visible:outline-none"
            >
              <span>Register (100% Free)</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-1.5 sm:gap-2 shrink-0">
            <ThemeToggle compact />
            <Link
              href="/register"
              onClick={() => {
                sound?.playClick();
                haptics?.medium();
              }}
              className="min-h-[40px] sm:min-h-[44px] px-2.5 sm:px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold btn-primary-themed text-white shadow-sm active:scale-[0.97] flex items-center justify-center whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-aws-orange focus-visible:outline-none"
            >
              Register Free
            </Link>
            <button
              onClick={() => { 
                sound?.playClick(); 
                haptics?.medium();
                setMobileMenuOpen(!mobileMenuOpen); 
              }}
              className="min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] p-2 sm:p-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 border border-white/10 hover:border-purple-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-aws-orange active:scale-[0.97] flex items-center justify-center transition-colors shrink-0"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay for closing on outside tap */}
            <div 
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[60px] bg-black/60 backdrop-blur-sm z-[-1] lg:hidden animate-fadeIn" 
              aria-hidden="true"
            />
            <div 
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Drawer"
              className="lg:hidden mt-3 p-4 rounded-2xl glass-panel border border-purple-500/25 space-y-3 animate-fadeIn bg-aws-squidInk/95 shadow-2xl max-h-[80vh] overflow-y-auto"
            >
              <div className="grid grid-cols-2 gap-1.5 pb-3 border-b border-white/10">
                {allNavLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => { 
                      sound?.playClick(); 
                      haptics?.selection();
                      setMobileMenuOpen(false); 
                    }}
                    className="min-h-[44px] px-3 py-2.5 rounded-xl text-xs text-slate-200 hover:text-white hover:bg-purple-950/60 font-medium flex items-center justify-between active:scale-[0.97] transition-colors border border-transparent hover:border-purple-500/20"
                  >
                    <span className="truncate">{link.label}</span>
                    {link.badge && (
                      <span className="ml-1.5 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-purple-950/80 text-purple-300 border border-purple-500/30 shrink-0">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              <div className="pt-1 flex flex-col gap-2">
                <Link
                  href="/register"
                  onClick={() => {
                    sound?.playClick();
                    haptics?.heavy();
                    setMobileMenuOpen(false);
                  }}
                  className="min-h-[44px] text-xs text-center py-3 rounded-xl font-bold btn-primary-themed text-white shadow-md flex items-center justify-center gap-1.5 active:scale-[0.97]"
                >
                  <span>Register Team (100% Free)</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <Link
                    href="/dashboard"
                    onClick={() => {
                      sound?.playClick();
                      setMobileMenuOpen(false);
                    }}
                    className="min-h-[44px] text-center py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 flex items-center justify-center active:scale-[0.97] transition-colors"
                  >
                    Hacker Dashboard
                  </Link>
                  <Link
                    href="/admin/login"
                    onClick={() => {
                      sound?.playClick();
                      setMobileMenuOpen(false);
                    }}
                    className="min-h-[44px] text-center py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-purple-500/30 text-purple-300 flex items-center justify-center gap-1.5 active:scale-[0.97] transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5 text-purple-400" />
                    <span>Admin Portal</span>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
