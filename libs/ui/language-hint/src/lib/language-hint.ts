import { afterNextRender, Component, computed, inject, LOCALE_ID, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

import { ConsentService } from '@isomantika/analytics';
import { findPreferredLocale, getLocale, Locale, localeUrl, LocalStorage } from '@isomantika/core';

const STORAGE_KEY = 'imk-language-hint-closed';

/**
 * «This page is available in Russian»: shown when the browser language matches another locale of the site.
 * Browser only (not prerendered); closing is remembered.
 */
@Component({
  selector: 'imk-language-hint',
  templateUrl: './language-hint.html',
})
export class LanguageHint {
  private readonly router = inject(Router);
  private readonly storage = inject(LocalStorage);
  private readonly current = getLocale(inject(LOCALE_ID));
  private readonly $url = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  // Waits while the cookie banner is open: both live at the bottom of the screen.
  protected readonly $bannerOpen = inject(ConsentService).$bannerOpen;
  protected readonly $locale = signal<Locale | null>(null);
  protected readonly $href = computed(() => {
    const locale = this.$locale();
    return locale ? localeUrl(locale, this.$url()) : null;
  });

  constructor() {
    afterNextRender(() => {
      if (this.storage.getItem(STORAGE_KEY) !== '1') {
        this.$locale.set(findPreferredLocale(navigator.languages ?? [navigator.language], this.current.id));
      }
    });
  }

  onClose(): void {
    this.$locale.set(null);
    this.storage.setItem(STORAGE_KEY, '1');
  }
}

