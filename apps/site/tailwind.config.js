const { join } = require('node:path');
const typography = require('@tailwindcss/typography');

/**
 * Tailwind CSS v3: v4 relies on `@layer`, `@property` and `color-mix()` and breaks in the older browsers from `.browserslistrc`.
 * Picked up by `@angular/build` automatically (no PostCSS config needed).
 *
 * Design tokens mirror the app (`lib/core/theme/`). Radii 8 / 16 / 24 / pill are Tailwind's `rounded-lg`, `-2xl`, `-3xl`, `-full`;
 * the 4 px spacing grid is Tailwind's default scale.
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: [join(__dirname, 'src/**/*.{html,ts}'), join(__dirname, '../../libs/**/*.{html,ts}')],
  theme: {
    extend: {
      colors: {
        background: '#17182B',
        surface: '#212338',
        'surface-high': '#2C2E48',
        outline: '#3D3F5E',
        'text-primary': '#F3E9D8',
        'text-secondary': '#C9BFB0',
        'text-muted': '#9A92A4',
        gold: '#E3C07E',
        'on-gold': '#2A2118',
        sage: '#8DB5A2',
        rose: '#E3A097',
        wine: '#6B2E3A',
        error: '#E5735F',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        text: ['Manrope', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      typography: ({ theme }) => ({
        // `prose` for legal texts: palette of the site instead of Tailwind grays.
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.text-secondary'),
            '--tw-prose-headings': theme('colors.text-primary'),
            '--tw-prose-lead': theme('colors.text-secondary'),
            '--tw-prose-links': theme('colors.gold'),
            '--tw-prose-bold': theme('colors.text-primary'),
            '--tw-prose-counters': theme('colors.text-muted'),
            '--tw-prose-bullets': theme('colors.outline'),
            '--tw-prose-hr': theme('colors.outline'),
            '--tw-prose-quotes': theme('colors.text-primary'),
            '--tw-prose-quote-borders': theme('colors.gold'),
            '--tw-prose-captions': theme('colors.text-muted'),
            '--tw-prose-code': theme('colors.text-primary'),
            '--tw-prose-pre-code': theme('colors.text-primary'),
            '--tw-prose-pre-bg': theme('colors.surface'),
            '--tw-prose-th-borders': theme('colors.outline'),
            '--tw-prose-td-borders': theme('colors.outline'),
            // Cormorant has a small x-height: headings are larger than the prose defaults.
            'h1, h2, h3, h4': { fontFamily: theme('fontFamily.display').join(', '), fontWeight: '700' },
            h1: { fontSize: '2.5em' },
            h3: { fontSize: '1.5em' },
            // Direct links to `#section` (before hydration) stop below the sticky header.
            h2: { fontSize: '1.875em', scrollMarginTop: '5.5rem' },
            // Manrope has no italics: no synthesized slant for quotes.
            blockquote: { fontStyle: 'normal' },
          },
        },
      }),
    },
  },
  corePlugins: {
    // Opacity variables produce `rgb(r g b / var(--tw-*-opacity))`, unsupported before Chrome 65. Use `bg-gold/50` modifiers instead.
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    placeholderOpacity: false,
    ringOpacity: false,
    textOpacity: false,
  },
  // `legacy`: plain selectors instead of `:where()` (Chrome 88+).
  plugins: [typography({ target: 'legacy' })],
};
