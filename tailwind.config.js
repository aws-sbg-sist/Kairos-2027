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
          orange: '#FF9900',
          squidInk: '#12141A',
          blue: '#2563EB',
          canvas: '#090A0D',
          card: '#12141A',
          cardHover: '#181B23',
          success: '#10B981',
          snow: '#EDEDED',
        },
        purple: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#090d16',
        },
        cyber: {
          magenta: '#FF9900',
          purple: '#64748b',
          snow: '#EDEDED',
          blue: '#2563EB',
          black: '#090A0D',
        },
        kairos: {
          darkest: '#090A0D',
          bg: '#090A0D',
          surface: '#12141A',
          card: '#12141A',
          cardHover: '#181B23',
          border: 'var(--border-subtle)',
          borderGlow: 'var(--border-glow)',
          orange: {
            DEFAULT: '#FF9900',
            light: '#FFAA2A',
            glow: 'rgba(255, 153, 0, 0.25)',
            subtle: 'rgba(255, 153, 0, 0.1)',
          },
          navy: {
            DEFAULT: '#12141A',
            deep: '#090A0D',
            light: '#232733',
          },
          purple: {
            DEFAULT: '#94a3b8',
            light: '#cbd5e1',
            deep: '#475569',
            glow: 'rgba(255, 255, 255, 0.1)',
            subtle: 'rgba(148, 163, 184, 0.1)',
          },
          blue: {
            DEFAULT: '#2563EB',
            sky: '#38bdf8',
            cyan: '#06b6d4',
            glow: 'rgba(37, 99, 235, 0.2)',
          },
          gold: {
            DEFAULT: '#f59e0b',
            light: '#fbbf24',
          }
        }
      },
      fontFamily: {
        ai: ['var(--font-ai)', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        chatbot: ['var(--font-ai)', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
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
        'glow-orange': '0 4px 20px -2px rgba(255, 153, 0, 0.2)',
        'glow-purple': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
        'glow-cyan': '0 4px 20px -2px rgba(37, 99, 235, 0.2)',
        'glass-card': '0 4px 24px 0 rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
};
