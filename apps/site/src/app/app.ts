import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ConsentBanner } from '@isomantika/ui/consent-banner';
import { Footer } from '@isomantika/ui/footer';
import { Header } from '@isomantika/ui/header';
import { LanguageHint } from '@isomantika/ui/language-hint';

@Component({
  selector: 'imk-root',
  imports: [RouterOutlet, Header, Footer, LanguageHint, ConsentBanner],
  templateUrl: './app.html',
  host: { class: 'flex min-h-screen flex-col' },
})
export class App {}
