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
          orange: '#FF9900', // AWS Smile Orange
          squidInk: '#232F3E', // Deep Navy / Squid Ink
          blue: '#0073BB', // Amazon Blue
          canvas: '#0B0F19', // Obsidian Night Dark Canvas
          card: '#161E2E', // Surface Card Dark
          cardHover: '#1E293B',
          success: '#10B981', // Matrix Green
          snow: '#F8FAFC', // Pure Snow Light
        },
        kairos: {
          darkest: '#030308',
          bg: '#0B0F19', // Obsidian canvas
          surface: '#161E2E', // Surface card
          card: '#161E2E',
          cardHover: '#20293D',
          border: 'rgba(255, 153, 0, 0.2)',
          borderGlow: 'rgba(255, 153, 0, 0.45)',
          orange: {
            DEFAULT: '#FF9900',
            light: '#FFAC33',
            glow: '#FFA41C',
            subtle: 'rgba(255, 153, 0, 0.15)',
          },
          navy: {
            DEFAULT: '#232F3E',
            deep: '#131A22',
            light: '#37475A',
          },
          purple: {
            DEFAULT: '#8b5cf6',
            light: '#a855f7',
            deep: '#6d28d9',
            glow: '#9333ea',
            subtle: '#2e1065',
          },
          blue: {
            DEFAULT: '#0073BB',
            sky: '#38bdf8',
            cyan: '#06b6d4',
            glow: 'rgba(0, 115, 187, 0.35)',
          },
          gold: {
            DEFAULT: '#f59e0b',
            light: '#fbbf24',
          }
        }
      },
      fontFamily: {
        sans: ['Amazon Ember', 'var(--font-inter)', 'sans-serif'],
        display: ['Amazon Ember Display', 'var(--font-outfit)', 'Space Grotesk', 'sans-serif'],
        mono: ['Amazon Ember Mono', 'var(--font-mono)', 'monospace'],
        duo: ['Amazon Ember Duospace', 'var(--font-mono)', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'orbit-spin': 'orbitSpin 20s linear infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translate3d(0, 6px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
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
