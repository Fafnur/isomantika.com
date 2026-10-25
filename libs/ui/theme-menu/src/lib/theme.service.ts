import { DOCUMENT } from '@angular/common';
import { inject, Service, signal } from '@angular/core';

import { LocalStorage } from '@isomantika/core';

export type ThemeMode = 'dark' | 'light' | 'system';

/** Also read by the script in `apps/site/src/index.html`, which applies the theme before the first paint. */
export const THEME_STORAGE_KEY = 'isomantika.theme';

const MODES: ThemeMode[] = ['dark', 'light', 'system'];

/** `theme-color` of the browser UI: the `background` of each theme (`styles.scss`). */
const THEME_COLORS = { dark: '#17182B', light: '#F6EFE3' } as const;

/**
 * The site theme: dark by default, light or the system one by choice. The theme is a class on `<html>` (`theme-light`,
 * `theme-system`, none for dark) that switches the color variables in `styles.scss`.
 */
@Service()
export class ThemeService {
  private readonly storage = inject(LocalStorage);
  private readonly document = inject(DOCUMENT);

  readonly $mode = signal<ThemeMode>(this.read());

  set(mode: ThemeMode): void {
    this.storage.setItem(THEME_STORAGE_KEY, mode);
    this.$mode.set(mode);

    const root = this.document.documentElement;
    root.classList.remove('theme-light', 'theme-system');
    if (mode !== 'dark') {
      root.classList.add(`theme-${mode}`);
    }

    const light =
      mode === 'light' || (mode === 'system' && !!this.document.defaultView?.matchMedia?.('(prefers-color-scheme: light)').matches);
    this.document.querySelector('meta[name="theme-color"]')?.setAttribute('content', light ? THEME_COLORS.light : THEME_COLORS.dark);
    this.document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', light ? 'light' : 'dark');
  }

  private read(): ThemeMode {
    const mode = this.storage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    return mode && MODES.includes(mode) ? mode : 'dark';
  }
}
