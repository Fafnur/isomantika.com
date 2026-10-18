import { AnalyticsConfig } from '@isomantika/analytics';

/** Replaces `environment.ts` in the production build only (`fileReplacements`). Web Visor is never enabled. */
export const environment: { readonly analytics: AnalyticsConfig } = {
  analytics: {
    googleAnalyticsId: 'G-JSPZZKB9J8',
    yandexMetrikaId: 113662836,
  },
};
