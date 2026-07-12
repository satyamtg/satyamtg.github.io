import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── M3 Expressive dark base ──────────────────────────────────────
        bg: '#0F0D13',
        surface: '#1E1A2E',           // purple-tinted dark container
        'surface-2': '#2D2843',       // brighter purple container
        'surface-3': '#3C3455',       // surface-container-high
        border: 'rgba(208,188,255,0.12)',
        'border-strong': 'rgba(208,188,255,0.4)',

        // ── M3 on-surface text roles ─────────────────────────────────────
        primary: '#E6E1E5',           // M3 on-background — off-white
        secondary: '#CAC4D0',         // M3 on-surface-variant — cool gray
        muted: '#938F99',             // M3 outline

        // ── M3 primary — vibrant purple ──────────────────────────────────
        accent: '#D0BCFF',            // M3 primary on dark
        'accent-dim': 'rgba(208,188,255,0.15)',
        'accent-container': '#4F378B',// M3 primary-container (filled bg)
        'accent-bright': '#6650A4',   // M3 primary — filled button hover

        // ── M3 secondary ─────────────────────────────────────────────────
        secondary2: '#CCC2DC',

        // ── M3 tertiary — expressive pink ────────────────────────────────
        tertiary: '#EFB8C8',
        'tertiary-container': '#633B48',

        // ── Palette tokens ───────────────────────────────────────────────
        m3: {
          purple: '#D0BCFF',
          'purple-fill': '#6650A4',   // filled button bg
          'purple-dim': '#9A82DB',
          'purple-container': '#4F378B',
          'surface-tonal': '#1E1A2E',
          'surface-tonal-2': '#2D2843',
          pink: '#EFB8C8',
          outline: '#938F99',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;