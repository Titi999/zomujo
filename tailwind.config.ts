import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        grayscale: {
          '10': '#FCFCFC',
          '50': '#F9FAFB',
          '75': '#F7F9FC',
          '100': '#F0F2F5',
          '200': '#E4E7EC',
          '300': '#D0D5DD',
          '400': '#98A2B3',
          medium: '#6B7280',
          '500': '#667185',
          '600': '#334155',
        },
        success: {
          '50': '#F0FDF4',
          '75': '#BBF7D0',
          '100': '#BBF7D0',
          '200': '#86EFAC',
          '300': '#4ADE80',
          '400': '#22C55E',
          '500': '#16A34A',
          '600': '#16A34A',
        },
        error: {
          '50': '#FEF2F2',
          '75': '#FEE2E2',
          '100': '#FECACA',
          '200': '#FCA5A5',
          '300': '#F87171',
          '400': '#EF4444',
          '500': '#DC2626',
          '600': '#B91C1C',
        },
        warning: {
          '50': '#FFFBEB',
          '75': '#FEF3C7',
          '100': '#FDE68A',
          '200': '#FCD34D',
          '300': '#FBBF24',
          '400': '#F59E0B',
          '500': '#D97706',
          '600': '#B45309',
        },
        primaryDark: '#067458',
        primaryLight: '#F0F9F7',
        primaryLightBase: '#08AF85',
        primaryLightLight: '#F4FBF9',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        transparentPrimaryGradient:
          'linear-gradient(to bottom, #033A2C00 7%, #033A2CFF 70%, #033A2C 75%)',
        primaryGradient: 'linear-gradient(3.01deg, #3A6C82 7.18%, #3FAB85 97.48%)',
        primaryGradient2: 'linear-gradient(to bottom, #08AF85 7.18%, #256A5C 97.48%)',
        primaryGradientUndo: 'linear-gradient(3.01deg, #033A2C 7.18%, #033A2C 97.48%)',
        triangle: "url('../assets/images/triangle.svg')",
        arc1: "url('../assets/images/arc-1.svg')",
        arc2: "url('../assets/images/arc-2.svg')",
      },
      boxShadow: {
        base: '0 1px 2px 4px rgba(15, 23, 42, 0.059)',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
