import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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

  onCookieSettings(): void {
    // Opens the consent banner (task 4.2).
  }
}
