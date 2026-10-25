import { CdkMenu, CdkMenuItemRadio, CdkMenuTrigger } from '@angular/cdk/menu';
import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ThemeMode, ThemeService } from './theme.service';

interface Option {
  readonly mode: ThemeMode;
  readonly label: string;
}

/**
 * Theme switcher: dark (the default), light or the system one. The button icon follows the class on `<html>`, so it is
 * right before hydration too.
 */
@Component({
  selector: 'imk-theme-menu',
  imports: [NgTemplateOutlet, CdkMenuTrigger, CdkMenu, CdkMenuItemRadio],
  templateUrl: './theme-menu.html',
})
export class ThemeMenu {
  protected readonly theme = inject(ThemeService);

  // Names as in the app's settings.
  protected readonly options: Option[] = [
    { mode: 'dark', label: $localize`:Theme menu|Dark theme, as in the app settings:Dark` },
    { mode: 'light', label: $localize`:Theme menu|Light theme, as in the app settings:Light` },
    { mode: 'system', label: $localize`:Theme menu|Theme that follows the device settings, as in the app settings:System` },
  ];

  onSelect(mode: ThemeMode): void {
    this.theme.set(mode);
  }
}
