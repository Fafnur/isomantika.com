export type StoreId = 'appStore' | 'googlePlay';

/**
 * Brand, contacts and stores in one place: the brand is going to change.
 */
export const SITE = {
  name: 'Isomantika',
  origin: 'https://isomantika.com',
  email: 'support@isomantika.com',
  ogImage: '/og.png',
  /** Store pages; `null` until the app is published — the site shows «Coming soon» instead of a badge. */
  stores: {
    appStore: null,
    googlePlay: null,
  } as Record<StoreId, string | null>,
  /**
   * Contact form → Edge Function `contact` of the app's Supabase project. Public by design: the publishable key only
   * identifies the project; the function accepts requests from `CONTACT_ALLOWED_ORIGINS` only.
   */
  contact: {
    url: 'https://tkqknhgvonetrnysqgzi.supabase.co/functions/v1/contact',
    publishableKey: 'sb_publishable_0bd3mXNjLjeiJ6ox356K9A_XHlqUGLo',
  },
} as const;
