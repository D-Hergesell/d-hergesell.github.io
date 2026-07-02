import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: 'rgb(var(--color-bg-rgb) / <alpha-value>)',
        ink: 'rgb(var(--color-fg-rgb) / <alpha-value>)',
        accent: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
        card: 'rgb(var(--color-card-rgb) / <alpha-value>)',
        soft: 'rgb(var(--color-muted-rgb) / <alpha-value>)',
        edge: 'rgb(var(--color-edge-rgb) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Impact', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        marquee: 'marquee 24s linear infinite',
        'spin-slow': 'spin-slow 14s linear infinite',
      },
      boxShadow: {
        hard: '6px 6px 0 0 var(--color-fg)',
        'hard-accent': '6px 6px 0 0 var(--color-accent)',
      },
    },
  },
  plugins: [],
};

export default config;
