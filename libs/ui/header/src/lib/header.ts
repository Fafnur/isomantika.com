import { NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

import { FRAGMENTS, PATHS, SITE } from '@isomantika/core';
import { LanguageMenu } from '@isomantika/ui/language-menu';

/**
 * Site header: mark and wordmark, navigation (a disclosure menu on mobile), language menu.
 */
@Component({
  selector: 'imk-header',
  imports: [NgTemplateOutlet, RouterLink, LanguageMenu],
  templateUrl: './header.html',
  host: {
    role: 'banner',
    class:
      'sticky top-0 z-40 block border-b border-outline/60 bg-background supports-[backdrop-filter]:bg-background/80 supports-[backdrop-filter]:backdrop-blur',
    '(document:keydown.escape)': 'onEscape()',
  },
})
export class Header {
  protected readonly site = SITE;
  protected readonly paths = PATHS;
  protected readonly fragments = FRAGMENTS;
  protected readonly $open = signal(false);

  private readonly toggle = viewChild.required<ElementRef<HTMLButtonElement>>('toggle');

  constructor() {
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.$open.set(false));
  }

  onToggle(): void {
    this.$open.update((open) => !open);
  }

  onEscape(): void {
    if (this.$open()) {
      this.$open.set(false);
      this.toggle().nativeElement.focus();
    }
  }
}
