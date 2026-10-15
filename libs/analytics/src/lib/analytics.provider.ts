import { isPlatformBrowser } from '@angular/common';
import { effect, EnvironmentProviders, inject, makeEnvironmentProviders, PLATFORM_ID, provideEnvironmentInitializer } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import { AnalyticsService } from './analytics.service';
import { ConsentService } from './consent.service';

/**
 * Browser only: restores the consent, starts the counters once analytics is allowed and sends a page view for every
 * router navigation (the counters' own page tracking is off).
 */
export function provideAnalytics(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideEnvironmentInitializer(() => {
      if (!isPlatformBrowser(inject(PLATFORM_ID))) {
        return;
      }

      const consent = inject(ConsentService);
      const analytics = inject(AnalyticsService);
      const router = inject(Router);
      const title = inject(Title);
      if (!consent.enabled) {
        return;
      }

      consent.restore();
      effect(() => {
        if (consent.$analytics()) {
          analytics.start();
          analytics.pageView(router.url, title.getTitle());
        }
      });
      router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event) => analytics.pageView(event.urlAfterRedirects, title.getTitle()));
    }),
  ]);
}
