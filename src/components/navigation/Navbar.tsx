'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import { sound } from '@/lib/audio';
import { haptics } from '@/lib/haptics';

interface NavLinkItem {
  label: string;
  href: string;
  badge?: string;
}

interface NavbarProps {
  onOpenWaitlist?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const primaryNavLinks: NavLinkItem[] = [
    { label: 'Tracks', href: '/tracks' },
    { label: 'Schedule', href: '/schedule' },
    { label: 'Qualifier', href: '/online-qualifier' },
    { label: 'Sponsors', href: '/sponsors' },
    { label: 'Rules', href: '/rules' },
  ];

  const secondaryNavLinks: NavLinkItem[] = [
    { label: 'Builder Radar', href: '/radar' },
    { label: 'On-Campus R2', href: '/on-campus' },
    { label: 'Resources', href: '/resources' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'Leadership', href: '/members/leadership' },
  ];

  const allNavLinks: NavLinkItem[] = [...primaryNavLinks, ...secondaryNavLinks];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[70] pointer-events-auto transition-colors duration-300 pt-[env(safe-area-inset-top,0px)] ${
        scrolled
          ? 'bg-[#09090d]/95 backdrop-blur-md border-b border-white/10 py-2.5 sm:py-3 shadow-xl shadow-black/70'
          : 'bg-[#09090d]/85 backdrop-blur-sm border-b border-white/5 py-3 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Chapter Lockup */}
          <Link
            href="/"
            data-cursor-label="HOME"
            onClick={() => {
              sound?.playClick();
              haptics?.light();
            }}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-lg p-1"
          >
            <div className="relative w-9 h-9 flex-shrink-0">
              <Image
                src="/assets/kairos-hourglass.png"
                alt="KAIROS 2027 Logo"
                fill
                sizes="36px"
                className="object-contain filter drop-shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-lg tracking-wider text-white group-hover:text-purple-300 transition-colors">
                  KAIROS
                </span>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/40 group-hover:border-purple-400/70 transition-colors">
                  2027
                </span>
              </div>
              <span className="text-[11px] text-slate-300 font-medium hidden sm:inline-block whitespace-nowrap">
                AWS Student Builder Group · SIST
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Fluid Sliding Highlight Pill */}
          <nav
            onMouseLeave={() => setHoveredHref(null)}
            className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-sm font-medium text-slate-200 p-1 rounded-xl bg-white/[0.02] border border-white/[0.06]"
          >
            {primaryNavLinks.map((link) => {
              const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
              const isHovered = hoveredHref === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => {
                    sound?.playHover();
                    setHoveredHref(link.href);
                  }}
                  onClick={() => {
                    sound?.playClick();
                    haptics?.light();
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-colors relative whitespace-nowrap flex-shrink-0 ${
                    isActive ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      className="absolute inset-0 rounded-lg bg-purple-950/80 border border-purple-500/45 shadow-sm shadow-purple-900/40 -z-10"
                    />
                  )}
                  {!isActive && isHovered && (
                    <motion.span
                      layoutId="navbar-hover-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-lg bg-white/[0.07] -z-10"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}

            {/* Streamlined "More" Dropdown */}
            <div className="relative" onMouseLeave={() => setMoreMenuOpen(false)}>
              <button
                onClick={() => {
                  sound?.playHover();
                  setMoreMenuOpen(!moreMenuOpen);
                }}
                onMouseEnter={() => {
                  setHoveredHref('more');
                  setMoreMenuOpen(true);
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:text-white hover:bg-white/[0.06] text-slate-300 transition-colors"
                aria-expanded={moreMenuOpen}
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreMenuOpen ? 'rotate-180 text-purple-400' : ''}`} />
              </button>

              <AnimatePresence>
                {moreMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute top-full right-0 mt-2 w-52 py-2 rounded-2xl bg-slate-950/95 border border-purple-500/25 shadow-2xl shadow-black/90 backdrop-blur-xl z-50 origin-top-right overflow-hidden"
                  >
                    {secondaryNavLinks.map((subLink) => {
                      const subActive = pathname === subLink.href;
                      return (
                        <Link
                          key={subLink.label}
                          href={subLink.href}
                          onClick={() => {
                            sound?.playClick();
                            haptics?.light();
                            setMoreMenuOpen(false);
                          }}
                          className={`flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors group/sub ${
                            subActive
                              ? 'text-white bg-purple-950/60 border-l-2 border-purple-400'
                              : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                          }`}
                        >
                          <span>{subLink.label}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover/sub:text-purple-400 group-hover/sub:translate-x-0.5 group-hover/sub:-translate-y-0.5 transition-transform" />
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Desktop Primary Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
            <Link
              href="/dashboard"
              data-cursor-label="PORTAL"
              onClick={() => sound?.playClick()}
              className="text-xs font-semibold text-slate-200 hover:text-white px-3.5 py-2 rounded-lg border border-white/15 hover:border-purple-500/45 hover:bg-white/5 transition-colors shine-hover"
            >
              Dashboard
            </Link>

            <Link
              href="/register"
              data-cursor-label="APPLY"
              onClick={() => {
                sound?.playClick();
                haptics?.medium();
              }}
              className="relative group px-4 py-2 rounded-lg text-xs font-bold text-white btn-primary-themed shadow-md shadow-purple-900/40 transition-transform active:scale-[0.96] flex items-center gap-1.5 whitespace-nowrap shine-hover"
            >
              <span>Register Team</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button & Quick CTA */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/register"
              onClick={() => {
                sound?.playClick();
                haptics?.medium();
              }}
              className="min-h-[44px] px-3.5 py-2 inline-flex items-center rounded-lg text-xs font-bold btn-primary-themed text-white shadow-sm whitespace-nowrap active:scale-[0.96] shine-hover"
            >
              Register
            </Link>
            <button
              onClick={() => {
                sound?.playClick();
                haptics?.light();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 active:scale-[0.96] transition-transform"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer with Staggered Entrance & Backdrop Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[-1]"
                aria-hidden="true"
              />

              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="lg:hidden mt-3 p-4 rounded-2xl glass-panel border border-purple-500/35 space-y-3 bg-aws-squidInk/98 max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain shadow-2xl shadow-black"
              >
                <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
                  {allNavLinks.map((link, idx) => {
                    const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
                    return (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.025, duration: 0.2 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => {
                            sound?.playClick();
                            haptics?.light();
                            setMobileMenuOpen(false);
                          }}
                          className={`min-h-[44px] px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between transition-colors active:scale-[0.96] ${
                            isActive
                              ? 'bg-purple-950/75 text-white font-semibold border border-purple-500/50 shadow-sm shadow-purple-900/40'
                              : 'text-slate-200 bg-white/[0.03] border border-white/5 hover:text-white hover:bg-white/[0.07]'
                          }`}
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className={`w-3.5 h-3.5 ${isActive ? 'text-purple-400' : 'text-slate-500'}`} />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <Link
                    href="/dashboard"
                    onClick={() => {
                      sound?.playClick();
                      haptics?.light();
                      setMobileMenuOpen(false);
                    }}
                    className="min-h-[46px] flex items-center justify-center py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-200 font-semibold hover:text-white hover:border-purple-500/35 active:scale-[0.96] transition"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => {
                      sound?.playClick();
                      haptics?.medium();
                      setMobileMenuOpen(false);
                    }}
                    className="min-h-[46px] flex items-center justify-center py-2.5 rounded-xl font-bold btn-primary-themed text-white active:scale-[0.96] transition shadow-md shadow-purple-900/35 shine-hover"
                  >
                    Register Squad
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Live Neon Scroll Telemetry Progress Bar */}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-cyber-magenta via-cyber-purple to-sky-400 pointer-events-none"
          style={{ scaleX }}
        />
      )}
    </header>
  );
};
