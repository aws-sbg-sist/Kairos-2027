'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Shield, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { sound } from '@/lib/audio';
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

  const primaryNavLinks: NavLinkItem[] = [
    { label: 'Tracks', href: '/tracks' },
    { label: 'Schedule', href: '/#schedule' },
    { label: 'Qualifier', href: '/online-qualifier' },
    { label: 'Rainmaker', href: '/refer-sponsor', badge: 'Referral' },
    { label: 'Rules', href: '/rules' },
  ];

  const secondaryNavLinks: NavLinkItem[] = [
    { label: 'Resources', href: '/resources' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'Leadership', href: '/members/leadership' },
    { label: 'On-Campus R2', href: '/on-campus' },
  ];

  const allNavLinks: NavLinkItem[] = [...primaryNavLinks, ...secondaryNavLinks];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[70] pointer-events-auto transition-colors duration-300 ${
        scrolled
          ? 'bg-aws-squidInk/95 backdrop-blur-md border-b border-purple-500/20 py-2.5 shadow-lg shadow-black/50'
          : 'bg-aws-canvas/80 backdrop-blur-sm border-b border-white/5 py-3.5'
      }`}
    >
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-aws-orange/15 via-aws-blue/15 to-aws-orange/15 border-b border-purple-500/20 py-1 px-4 text-center text-[11px] font-mono text-slate-200 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <strong className="text-white">NATIONAL APPLICATIONS OPEN:</strong> 100% Free | ₹0 Entry Fee | ₹1,75,000 Total Prize Pool
          </span>
          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <Link href="/refer-sponsor" className="text-purple-300 hover:text-white underline font-semibold">
              Refer a Corporate Sponsor: Earn 10% to 15% Referral Commission
            </Link>
            <span className="text-slate-400">|</span>
            <a href="https://www.meetup.com/aws-sbg-at-sathyabama-inst-science-and-tech-chennai-campus/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">
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
                className="object-contain filter drop-shadow-md group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-lg sm:text-xl tracking-wider text-white">
                  KAIROS
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-950/60 text-purple-400 border border-purple-500/40">
                  2027
                </span>
              </div>
              <span className="text-xs text-slate-300 font-medium hidden sm:inline-block whitespace-nowrap">
                AWS Student Builder Group - SIST
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links - Spacious & Streamlined */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-200">
            {primaryNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => sound?.playHover()}
                  onClick={() => sound?.playClick()}
                  className={`px-2 xl:px-3 py-1.5 rounded-md transition-colors relative whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? 'text-white bg-purple-950/50 font-semibold text-purple-400 border border-purple-500/30'
                      : 'hover:text-white hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    {link.label}
                    {link.badge && (
                      <span className="px-2 py-0.5 rounded text-[11px] bg-purple-950/50 text-purple-400 border border-purple-500/30 font-semibold whitespace-nowrap flex-shrink-0">
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
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                onMouseEnter={() => setMoreMenuOpen(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-md hover:text-white hover:bg-white/5 text-slate-300 transition-colors"
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
                      onClick={() => setMoreMenuOpen(false)}
                      className="block px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {subLink.label}
                    </Link>
                  ))}
                  <div className="my-1 border-t border-white/10" />
                  <Link
                    href="/admin/login"
                    onClick={() => setMoreMenuOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-purple-950/40 transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5 text-purple-400" />
                    <span>Admin Portal</span>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 flex-shrink-0">
            {/* Theme Toggle (Adobe Cyber Neon vs AWS Classic) */}
            <ThemeToggle />
            {/* Audio Toggle */}
            <button
              onClick={() => sound?.toggle()}
              onMouseEnter={() => sound?.playHover()}
              className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-xs font-mono"
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
              className="text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded border border-white/10 hover:border-purple-500/30 transition-colors"
            >
              Dashboard
            </Link>

            <Link
              href="/admin/login"
              onMouseEnter={() => sound?.playHover()}
              onClick={() => sound?.playClick()}
              className="text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded border border-white/10 hover:border-purple-500/40 transition-colors flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>Admin</span>
            </Link>

            <Link
              href="/register"
              onMouseEnter={() => sound?.playHover()}
              onClick={() => sound?.playClick()}
              className="relative group px-4 py-2 rounded-lg text-xs font-bold text-white btn-primary-themed shadow-md shadow-purple-900/30 transition-colors duration-300 active:scale-95 flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Register (100% Free)</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle compact />
            <Link
              href="/register"
              className="px-3 py-1.5 rounded-lg text-xs font-bold btn-primary-themed text-white shadow-sm"
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
          <div className="lg:hidden mt-3 p-4 rounded-xl glass-panel border border-purple-500/20 space-y-2 animate-fadeIn bg-aws-squidInk/95">
            <div className="grid grid-cols-2 gap-1 pb-2 border-b border-white/10">
              {allNavLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => { sound?.playClick(); setMobileMenuOpen(false); }}
                  className="px-3 py-2 rounded-lg text-xs text-slate-200 hover:text-white hover:bg-purple-950/50 font-medium flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1 py-0.2 rounded text-[8px] bg-purple-950/50 text-purple-400">
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
                className="text-xs text-center py-2.5 rounded-lg font-bold btn-primary-themed text-white"
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
                  className="text-center py-2 rounded-lg bg-slate-900 border border-purple-500/30 text-purple-400 flex items-center justify-center gap-1"
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
