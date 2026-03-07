import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border:     'rgba(255,255,255,0.08)',
        background: '#000000',
        foreground: '#ffffff',
        card: {
          DEFAULT:     'rgba(255,255,255,0.03)',
          foreground:  '#ffffff',
        },
        muted: {
          DEFAULT:    'rgba(255,255,255,0.06)',
          foreground: 'rgba(255,255,255,0.45)',
        },
        accent: {
          DEFAULT:    'rgba(255,255,255,0.08)',
          foreground: '#ffffff',
        },
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.08)',
      },
      borderRadius: {
        lg: '10px',
        md: '8px',
        sm: '6px',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'Space Grotesk', 'Arial', 'sans-serif'],
        mono: ['monospace'],
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)'    },
          to:   { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;

