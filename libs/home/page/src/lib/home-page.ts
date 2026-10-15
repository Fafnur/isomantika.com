import { IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FRAGMENTS, PATHS, SITE } from '@mantikai/core';
import { StoreButtons } from '@mantikai/ui/store-buttons';

import { SpreadDiagram, SpreadType } from './spread-diagram/spread-diagram';

interface Spread {
  readonly type: SpreadType;
  readonly title: string;
  readonly description: string;
  readonly positions: string[];
}

interface Item {
  readonly title: string;
  readonly text: string;
}

/**
 * Card images in `public/cards/{name}-{width}.webp`, widths 120 and 240.
 */
function cardLoader(config: ImageLoaderConfig): string {
  return `/cards/${config.src}-${config.width && config.width > 120 ? 240 : 120}.webp`;
}

@Component({
  selector: 'mk-home-page',
  imports: [NgOptimizedImage, RouterLink, StoreButtons, SpreadDiagram],
  templateUrl: './home-page.html',
  providers: [{ provide: IMAGE_LOADER, useValue: cardLoader }],
  host: { class: 'block' },
})
export class HomePage {
  protected readonly paths = PATHS;
  protected readonly fragments = FRAGMENTS;
  protected readonly screenshots = SITE.screenshots;

  protected readonly cards = ['major_17', 'major_18', 'major_19'];

  protected readonly steps: Item[] = [
    {
      title: $localize`:Home page|How it works, step 1 title:Ask your question`,
      text: $localize`:Home page|How it works, step 1 text:About love, work or a choice you are facing — in your own words.`,
    },
    {
      title: $localize`:Home page|How it works, step 2 title:Draw the cards`,
      text: $localize`:Home page|How it works, step 2 text:Pick a spread and draw from a shuffled deck of 78 cards.`,
    },
    {
      title: $localize`:Home page|How it works, step 3 title:Read the interpretation`,
      text: $localize`:Home page|How it works, step 3 text:Every card is read in its position and tied to your question.`,
    },
  ];

  // Titles and descriptions match the spread names in the app.
  protected readonly spreads: Spread[] = [
    {
      type: 'daily',
      title: $localize`:Spread name|Name of the one-card spread in the app:Card of the Day`,
      description: $localize`:Home page|Description of the Card of the Day spread, as in the app:A hint for the day ahead`,
      positions: [$localize`:Home page|Card of the Day position:The day ahead`],
    },
    {
      type: 'three',
      title: $localize`:Spread name|Name of the three-card spread in the app:Three Cards`,
      description: $localize`:Home page|Description of the Three Cards spread, as in the app:Past, present and future of your question`,
      positions: [
        $localize`:Home page|Three Cards position 1:Past`,
        $localize`:Home page|Three Cards position 2:Present`,
        $localize`:Home page|Three Cards position 3:Future`,
      ],
    },
    {
      type: 'cross',
      title: $localize`:Spread name|Name of the four-card cross spread in the app:The Cross`,
      description: $localize`:Home page|Description of The Cross spread, as in the app:The heart of the matter, what to avoid, what to do and the outcome`,
      positions: [
        $localize`:Home page|The Cross position 1:The heart of the matter`,
        $localize`:Home page|The Cross position 2:What to avoid`,
        $localize`:Home page|The Cross position 3:What to do`,
        $localize`:Home page|The Cross position 4:The outcome`,
      ],
    },
  ];

  protected readonly features: Item[] = [
    {
      title: $localize`:Home page|Feature title:An interpretation for your question`,
      text: $localize`:Home page|Feature text:Not a list of card meanings: each card is read in its place in the spread and tied to what you asked.`,
    },
    {
      title: $localize`:Home page|Feature title:The classic Rider–Waite deck`,
      text: $localize`:Home page|Feature text:All 78 cards of the 1909 Rider–Waite deck, the one most tarot books are written about.`,
    },
    {
      title: $localize`:Home page|Feature title:Your card back`,
      text: $localize`:Home page|Feature text:Choose one of five card back designs.`,
    },
    {
      title: $localize`:Home page|Feature title:Three languages`,
      text: $localize`:Home page|Feature text:The app and the interpretations are in English, Russian and Spanish.`,
    },
    {
      title: $localize`:Home page|Feature title:History of readings`,
      text: $localize`:Home page|Feature text:Every reading is saved, so you can come back to it later.`,
    },
  ];

  // Same strings as on the support page: one translation for both.
  protected readonly questions: Item[] = [
    {
      title: $localize`:Support FAQ|Question:How many readings can I do per day?`,
      text: $localize`:Support FAQ|Answer about daily limits; Three Cards and The Cross are spread names in the app:Every day you get 1 Card of the Day and 3 readings with a question (Three Cards and The Cross share these 3). The limits reset at midnight UTC; the Home screen shows how many are left.`,
    },
    {
      title: $localize`:Support FAQ|Question:Why do I need to sign in?`,
      text: $localize`:Support FAQ|Answer about sign-in:Your readings and history are stored in your account, so they are not lost when you change or reinstall your phone, and daily limits are counted per account. You can sign in with Google or Apple.`,
    },
    {
      title: $localize`:Support FAQ|Question:Are the readings predictions?`,
      text: $localize`:Support FAQ|Answer about entertainment purpose:No. Mantikai is made for entertainment. Interpretations are written by AI: treat them as a prompt for reflection, not as a prediction or professional advice.`,
    },
  ];
}
