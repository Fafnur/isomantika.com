import type { LocaleId } from '../locales/locales';

export type StoreId = 'appStore' | 'googlePlay';

export interface Screenshot {
  /** File name without extension: `public/screenshots/{locale}/{name}.webp`. */
  readonly name: string;
  /** Locales that have their own file; the others fall back to English. */
  readonly locales: LocaleId[];
}

/**
 * Brand, contacts, stores and screenshots in one place: the brand is going to change.
 */
export const SITE = {
  name: 'Mantikai',
  origin: 'https://mantikai.com',
  email: 'support@mantikai.com',
  ogImage: '/og.png',
  /** Store pages; `null` until the app is published — the site shows «Coming soon» instead of a badge. */
  stores: {
    appStore: null,
    googlePlay: null,
  } as Record<StoreId, string | null>,
  /** App screenshots for the home page gallery; empty — the gallery is hidden. */
  screenshots: [] as Screenshot[],
} as const;
