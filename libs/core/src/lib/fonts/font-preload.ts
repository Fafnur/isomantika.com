import { DOCUMENT } from '@angular/common';
import { EnvironmentProviders, inject, LOCALE_ID, makeEnvironmentProviders, provideEnvironmentInitializer } from '@angular/core';

import { getLocale, LocaleId } from '../locales/locales';

// Fonts of the first screen: body text (Manrope) and headings (Cormorant 700) in the locale's script. Latin on Russian
// pages (brand, «iOS») still loads through CSS — preloading it too slows the heading down on a slow connection.
const FONTS: Record<LocaleId, string[]> = {
  en: ['manrope-latin-wght-normal', 'cormorant-garamond-latin-700-normal'],
  es: ['manrope-latin-wght-normal', 'cormorant-garamond-latin-700-normal'],
  ru: ['manrope-cyrillic-wght-normal', 'cormorant-garamond-cyrillic-700-normal'],
};

/**
 * Server only (`app.config.server.ts`): preloads the fonts of the page's locale in the prerendered HTML.
 * `index.html` is shared by all locales and cannot know them; CSS discovers fonts too late for the heading (LCP).
 */
export function provideFontPreload(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideEnvironmentInitializer(() => {
      const document = inject(DOCUMENT);
      for (const font of FONTS[getLocale(inject(LOCALE_ID)).id]) {
        const link = document.createElement('link');
        // Attributes, not properties: the server DOM does not serialize `link.as`.
        link.setAttribute('rel', 'preload');
        link.setAttribute('as', 'font');
        link.setAttribute('type', 'font/woff2');
        link.setAttribute('href', `/fonts/${font}.woff2`);
        link.setAttribute('crossorigin', '');
        document.head.appendChild(link);
      }
    }),
  ]);
}
