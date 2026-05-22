import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['"Source Serif 4"', '"Source Serif Pro"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f7f7f8',
          100: '#eeeef1',
          200: '#d9dadf',
          300: '#b8babf',
          400: '#8b8d93',
          500: '#6b6d72',
          600: '#4a4c50',
          700: '#36373a',
          800: '#222325',
          900: '#141416',
          950: '#0a0a0b',
        },
        accent: {
          50: '#f0f7ff',
          100: '#e0eefe',
          200: '#bbdcfd',
          300: '#7dbffb',
          400: '#3a9ef6',
          500: '#1182e6',
          600: '#0566c4',
          700: '#06529f',
          800: '#0a4583',
          900: '#0d3a6c',
          950: '#082548',
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.ink.700'),
            '--tw-prose-headings': theme('colors.ink.900'),
            '--tw-prose-links': theme('colors.accent.600'),
            '--tw-prose-bold': theme('colors.ink.900'),
            '--tw-prose-invert-body': theme('colors.ink.200'),
            '--tw-prose-invert-headings': theme('colors.ink.50'),
            '--tw-prose-invert-links': theme('colors.accent.300'),
            '--tw-prose-invert-bold': theme('colors.ink.50'),
            maxWidth: '70ch',
          },
        },
      }),
    },
  },
  plugins: [typography],
};
