import { ViewportScroller } from '@angular/common';
import { EnvironmentProviders, inject, makeEnvironmentProviders, provideEnvironmentInitializer } from '@angular/core';
import { TitleStrategy, UrlSerializer } from '@angular/router';

import { SeoStrategy } from '../seo/seo.strategy';
import { TrailingSlashUrlSerializer } from './trailing-slash.serializer';

/**
 * Trailing-slash URLs, page metadata from routes, anchor offset for the sticky header. Add next to `provideRouter()`.
 */
export function provideSiteNavigation(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: UrlSerializer, useClass: TrailingSlashUrlSerializer },
    { provide: TitleStrategy, useClass: SeoStrategy },
    // Anchor scrolling stops below the sticky header (64 px) with some air.
    provideEnvironmentInitializer(() => inject(ViewportScroller).setOffset([0, 88])),
  ]);
}
