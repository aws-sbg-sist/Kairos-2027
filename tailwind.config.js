/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        aws: {
          orange: 'rgb(var(--aws-orange-rgb) / <alpha-value>)',
          squidInk: 'rgb(var(--aws-squid-ink-rgb) / <alpha-value>)',
          blue: 'rgb(var(--aws-blue-rgb) / <alpha-value>)',
          canvas: 'rgb(var(--aws-canvas-rgb) / <alpha-value>)',
          card: 'rgb(var(--aws-card-rgb) / <alpha-value>)',
          cardHover: 'rgb(var(--aws-card-hover-rgb) / <alpha-value>)',
          success: '#10B981',
          snow: 'rgb(var(--aws-snow-rgb) / <alpha-value>)',
        },
        cyber: {
          magenta: '#ee05f2',
          purple: '#7630d9',
          snow: '#edebf2',
          blue: '#0511f2',
          black: '#0d0d0d',
        },
        kairos: {
          darkest: 'rgb(var(--aws-canvas-rgb) / <alpha-value>)',
          bg: 'rgb(var(--aws-canvas-rgb) / <alpha-value>)',
          surface: 'rgb(var(--aws-card-rgb) / <alpha-value>)',
          card: 'rgb(var(--aws-card-rgb) / <alpha-value>)',
          cardHover: 'rgb(var(--aws-card-hover-rgb) / <alpha-value>)',
          border: 'var(--border-subtle)',
          borderGlow: 'var(--border-glow)',
          orange: {
            DEFAULT: 'rgb(var(--aws-orange-rgb) / <alpha-value>)',
            light: 'var(--gradient-accent-start)',
            glow: 'var(--aws-orange-glow)',
            subtle: 'rgb(var(--aws-orange-rgb) / 0.15)',
          },
          navy: {
            DEFAULT: 'rgb(var(--aws-squid-ink-rgb) / <alpha-value>)',
            deep: 'rgb(var(--aws-canvas-rgb) / <alpha-value>)',
            light: '#37475A',
          },
          purple: {
            DEFAULT: 'rgb(var(--aws-purple-rgb) / <alpha-value>)',
            light: '#c084fc',
            deep: '#7630d9',
            glow: '#ee05f2',
            subtle: 'rgb(var(--aws-purple-rgb) / 0.15)',
          },
          blue: {
            DEFAULT: 'rgb(var(--aws-blue-rgb) / <alpha-value>)',
            sky: '#38bdf8',
            cyan: '#06b6d4',
            glow: 'rgba(5, 17, 242, 0.35)',
          },
          gold: {
            DEFAULT: '#f59e0b',
            light: '#fbbf24',
          }
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', '"Helvetica Neue"', 'Helvetica', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['var(--font-outfit)', '"Helvetica Neue"', 'Helvetica', 'Space Grotesk', 'sans-serif'],
        helvetica: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
        duo: ['var(--font-mono)', 'monospace'],
      },
      transitionTimingFunction: {
        'entrance': 'cubic-bezier(0, 0, 0.2, 1)', // ease-out for entrances
        'exit': 'cubic-bezier(0.4, 0, 1, 1)',     // ease-in, 20% shorter for exits
        'onscreen': 'cubic-bezier(0.4, 0, 0.2, 1)', // ease-in-out for onscreen movements
      },
      transitionDuration: {
        'dropdown': '190ms',       // 150ms to 250ms dropdown window
        'dropdown-exit': '150ms',  // ~20% shorter than entrance
        'entrance': '220ms',
        'exit': '175ms',           // 20% shorter than entrance
      },
      scale: {
        '97': '0.97',              // Buttons 0.97 scale on press
        '95': '0.95',              // Popovers start at scale 0.95
        '112': '1.12',             // Stretch moving knobs by 12%
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'orbit-spin': 'orbitSpin 20s linear infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.22s cubic-bezier(0, 0, 0.2, 1) forwards',
        'fade-in': 'fadeIn 0.22s cubic-bezier(0, 0, 0.2, 1) forwards',
        'popover-in': 'popoverIn 190ms cubic-bezier(0, 0, 0.2, 1) forwards',
        'popover-out': 'popoverOut 150ms cubic-bezier(0.4, 0, 1, 1) forwards',
        'success-pulse': 'successPulse 0.45s cubic-bezier(0, 0, 0.2, 1) forwards',
        'arc-move': 'arcMove 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translate3d(0, 6px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        popoverIn: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(-4px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        popoverOut: {
          '0%': { opacity: '1', transform: 'scale(1) translateY(0)' },
          '100%': { opacity: '0', transform: 'scale(0.95) translateY(-4px)' },
        },
        successPulse: {
          '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)' },
          '40%': { transform: 'scale(1.04)', boxShadow: '0 0 0 10px rgba(16, 185, 129, 0)' },
          '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)' },
        },
        arcMove: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(8px, -14px, 0)' },
          '100%': { transform: 'translate3d(0, 0, 0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.75' },
        },
        orbitSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translate3d(0, 0px, 0)' },
          '50%': { transform: 'translate3d(0, -6px, 0)' },
        }
      },
      boxShadow: {
        'glow-orange': '0 0 35px -5px rgba(255, 153, 0, 0.35)',
        'glow-purple': '0 0 35px -5px rgba(139, 92, 246, 0.35)',
        'glow-cyan': '0 0 35px -5px rgba(56, 189, 248, 0.3)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      }
    },
  },
  plugins: [],
};
