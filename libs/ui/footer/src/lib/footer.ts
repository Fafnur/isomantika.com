import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ConsentService } from '@mantikai/analytics';
import { PATHS, SITE } from '@mantikai/core';

@Component({
  selector: 'mk-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  host: { role: 'contentinfo', class: 'block border-t border-outline/60' },
})
export class Footer {
  protected readonly site = SITE;
  protected readonly paths = PATHS;
  protected readonly year = new Date().getFullYear();
  protected readonly consent = inject(ConsentService);

  onCookieSettings(): void {
    this.consent.open();
  }
}
