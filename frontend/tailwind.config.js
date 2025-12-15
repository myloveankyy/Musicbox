/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Ensure Inter is loaded in index.html
      },
      colors: {
        obsidian: "#030303", // Darker than black
        charcoal: "#0F0F0F",
        glass: "rgba(255, 255, 255, 0.05)",
        "glass-hover": "rgba(255, 255, 255, 0.1)",
        neon: {
          purple: "#A855F7", // Vivid Purple
          blue: "#3B82F6",   // Electric Blue
          pink: "#EC4899",   // Hot Pink
        }
      },
      backgroundImage: {
        'aurora': 'conic-gradient(from 180deg at 50% 50%, #2a0a4e 0deg, #0a1f4e 180deg, #2a0a4e 360deg)',
        'gloss-gradient': 'linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0))',
      },
      animation: {
        'aurora': 'aurora 10s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        aurora: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
    },
  },
  plugins: [],
}