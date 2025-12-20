/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // The Foundation: Clean, Industrial, Expensive.
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // The "Liquid Chrome" Palette
        chrome: {
          50: '#F8FAFC',  // Ultra Light Silver (Backgrounds)
          100: '#F1F5F9', // Light Steel (Borders)
          200: '#E2E8F0', // Structural Grey
          300: '#CBD5E1', // Polished Metal
          400: '#94A3B8', // Inactive Text
          500: '#64748B', // Body Text
          800: '#1E293B', // Deep Industrial
          900: '#0F172A', // Black Steel (Headlines)
        },
        // Legacy / Utility Mappings
        mono: {
          bg: '#E5E5E5',    // Braun Electronics Grey (Base Layer)
          surface: '#FFFFFF', // Pure Glass
          black: '#000000',   // Absolute Black
          accent: '#FF3B30',  // Laser Red (Errors/Alerts)
          code: '#00FF41',    // Terminal Green
        }
      },
      animation: {
        // Physics Engine
        'spin-slow': 'spin 20s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'blob': 'blob 7s infinite', // <--- THE LIQUID EFFECT
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        // Liquid Blob Physics: Morphs position and scale
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}