import { InjectionToken } from '@angular/core';

import { SITE } from '@mantikai/core';

export interface AnalyticsConfig {
  /** GA4 measurement ID (`G-…`); empty — off. */
  readonly googleAnalyticsId: string;
  /** Yandex Metrica counter; 0 — off. */
  readonly yandexMetrikaId: number;
}

export const ANALYTICS_CONFIG = new InjectionToken<AnalyticsConfig>('ANALYTICS_CONFIG', {
  providedIn: 'root',
  factory: () => SITE.analytics,
});
