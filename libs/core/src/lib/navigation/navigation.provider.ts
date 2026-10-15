import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { TitleStrategy, UrlSerializer } from '@angular/router';

import { SeoStrategy } from '../seo/seo.strategy';
import { TrailingSlashUrlSerializer } from './trailing-slash.serializer';

/**
 * Trailing-slash URLs and page metadata from routes. Add next to `provideRouter()`.
 */
export function provideSiteNavigation(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: UrlSerializer, useClass: TrailingSlashUrlSerializer },
    { provide: TitleStrategy, useClass: SeoStrategy },
  ]);
}
