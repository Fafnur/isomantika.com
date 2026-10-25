const { join } = require('node:path');
const typography = require('@tailwindcss/typography');

const displayFont = ['"Cormorant Garamond"', 'Georgia', 'serif'];

/** A theme color outside of utilities, e.g. in the `prose` theme. */
const color = (name) => `rgb(var(--color-${name}))`;

/**
 * Tailwind CSS v3: v4 relies on `@layer`, `@property` and `color-mix()` and breaks in the older browsers from `.browserslistrc`.
 * Picked up by `@angular/build` automatically (no PostCSS config needed).
 *
 * Design tokens mirror the app (`lib/core/theme/`): colors are CSS variables of the dark and light themes (`styles.scss`).
 * Radii 8 / 16 / 24 / pill are Tailwind's `rounded-lg`, `-2xl`, `-3xl`, `-full`; the 4 px spacing grid is Tailwind's default scale.
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: [join(__dirname, 'src/**/*.{html,ts}'), join(__dirname, '../../libs/**/*.{html,ts}')],
  theme: {
    extend: {
      // Values are in `styles.scss` per theme; `rgba()` with a comma triplet works in old browsers, unlike `rgb(r g b / a)`.
      colors: Object.fromEntries(
        [
          'background',
          'surface',
          'surface-high',
          'outline',
          'text-primary',
          'text-secondary',
          'text-muted',
          'gold',
          'on-gold',
          'sage',
          'rose',
          'wine',
          'error',
          'mark',
        ].map((name) => [name, `rgba(var(--color-${name}), <alpha-value>)`]),
      ),
      fontFamily: {
        display: displayFont,
        text: ['Manrope', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      typography: () => ({
        // `prose` for legal texts: palette of the site instead of Tailwind grays.
        DEFAULT: {
          css: {
            '--tw-prose-body': color('text-secondary'),
            '--tw-prose-headings': color('text-primary'),
            '--tw-prose-lead': color('text-secondary'),
            '--tw-prose-links': color('gold'),
            '--tw-prose-bold': color('text-primary'),
            '--tw-prose-counters': color('text-muted'),
            '--tw-prose-bullets': color('outline'),
            '--tw-prose-hr': color('outline'),
            '--tw-prose-quotes': color('text-primary'),
            '--tw-prose-quote-borders': color('gold'),
            '--tw-prose-captions': color('text-muted'),
            '--tw-prose-code': color('text-primary'),
            '--tw-prose-pre-code': color('text-primary'),
            '--tw-prose-pre-bg': color('surface'),
            '--tw-prose-th-borders': color('outline'),
            '--tw-prose-td-borders': color('outline'),
            // Cormorant has a small x-height: headings are larger than the prose defaults.
            'h1, h2, h3, h4': { fontFamily: displayFont.join(', '), fontWeight: '700' },
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
