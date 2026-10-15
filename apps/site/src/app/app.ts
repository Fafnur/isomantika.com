import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ConsentBanner } from '@mantikai/ui/consent-banner';
import { Footer } from '@mantikai/ui/footer';
import { Header } from '@mantikai/ui/header';
import { LanguageHint } from '@mantikai/ui/language-hint';

@Component({
  selector: 'mk-root',
  imports: [RouterOutlet, Header, Footer, LanguageHint, ConsentBanner],
  templateUrl: './app.html',
  host: { class: 'flex min-h-screen flex-col' },
})
export class App {}
