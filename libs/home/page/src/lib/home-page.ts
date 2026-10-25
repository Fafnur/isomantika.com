import { IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { Component, inject, LOCALE_ID } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FRAGMENTS, getLocale, PATHS } from '@isomantika/core';
import { StoreButtons } from '@isomantika/ui/store-buttons';

import { SpreadDiagram, SpreadType } from './spread-diagram/spread-diagram';

interface Spread {
  readonly type: SpreadType;
  readonly title: string;
  readonly description: string;
  readonly positions: string[];
}

interface Section {
  readonly title: string;
  readonly spreads: Spread[];
}

interface Screenshot {
  readonly name: string;
  readonly caption: string;
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
  selector: 'imk-home-page',
  imports: [NgOptimizedImage, RouterLink, StoreButtons, SpreadDiagram],
  templateUrl: './home-page.html',
  providers: [{ provide: IMAGE_LOADER, useValue: cardLoader }],
  host: { class: 'block' },
})
export class HomePage {
  protected readonly paths = PATHS;
  protected readonly fragments = FRAGMENTS;
  /** Screenshots and the video are in the language of the page. */
  protected readonly locale = getLocale(inject(LOCALE_ID)).id;

  protected readonly cards = ['major_17', 'major_18', 'major_19'];

  protected readonly steps: Item[] = [
    {
      title: $localize`:Home page|How it works, step 1 title:Ask your question`,
      text: $localize`:Home page|How it works, step 1 text:About love, work or a choice you are facing — in your own words.`,
    },
    {
      title: $localize`:Home page|How it works, step 2 title:Draw the cards`,
      text: $localize`:Home page|How it works, step 2 text:Pick one of 12 spreads, draw your cards from a fan of the shuffled deck and watch them turn over.`,
    },
    {
      title: $localize`:Home page|How it works, step 3 title:Read the interpretation`,
      text: $localize`:Home page|How it works, step 3 text:Every card is read in its place in the spread, then what it all means for you. The reading is finished and saved even if you close the app.`,
    },
  ];

  // Sections, spreads, descriptions and positions are the same as in the app, in the same order.
  protected readonly sections: Section[] = [
    {
      title: $localize`:Home page|Spread section name, as in the app:Quick answer`,
      spreads: [
        {
          type: 'daily',
          title: $localize`:Spread name|Name of the one-card spread in the app:Card of the Day`,
          description: $localize`:Home page|Description of the Card of the Day spread, as in the app:A hint for the day ahead`,
          positions: [$localize`:Spread position|Card of the Day position, as in the app:Card of the day`],
        },
        {
          type: 'yesNo',
          title: $localize`:Spread name|Name of the Yes or No spread in the app:Yes or No`,
          description: $localize`:Home page|Description of the Yes or No spread, as in the app:A clear answer to your question`,
          positions: [
            $localize`:Spread position|Yes or No position 1, as in the app:The heart of the question`,
            $localize`:Spread position|Yes or No position 2, as in the app:What influences it`,
            $localize`:Spread position|Final position of a spread, as in the app:Outcome`,
          ],
        },
      ],
    },
    {
      title: $localize`:Home page|Spread section name, as in the app:Love`,
      spreads: [
        {
          type: 'feelings',
          title: $localize`:Spread name|Name of the Their Feelings spread in the app:Their Feelings`,
          description: $localize`:Home page|Description of the Their Feelings spread, as in the app:What they think, feel and intend`,
          positions: [
            $localize`:Spread position|Their Feelings position 1, as in the app:Thoughts`,
            $localize`:Spread position|Their Feelings position 2, as in the app:Feelings`,
            $localize`:Spread position|Their Feelings position 3, as in the app:Intentions`,
          ],
        },
        {
          type: 'relationship',
          title: $localize`:Spread name|Name of the Relationship spread in the app:Relationship`,
          description: $localize`:Home page|Description of the Relationship spread, as in the app:You, your partner, your bond, what stands in the way and advice`,
          positions: [
            $localize`:Spread position|Relationship position 1, as in the app:Me`,
            $localize`:Spread position|Relationship position 2, as in the app:Partner`,
            $localize`:Spread position|Relationship position 3, as in the app:Our bond`,
            $localize`:Spread position|Position of a spread, as in the app:What stands in the way`,
            $localize`:Spread position|Position of a spread, as in the app:Advice`,
          ],
        },
        {
          type: 'reconciliation',
          title: $localize`:Spread name|Name of the Reconciliation spread in the app:Reconciliation`,
          description: $localize`:Home page|Description of the Reconciliation spread, as in the app:After a breakup or quarrel: is there a chance to get back together`,
          positions: [
            $localize`:Spread position|Reconciliation position 1, as in the app:What drove us apart`,
            $localize`:Spread position|Reconciliation position 2, as in the app:Their feelings now`,
            $localize`:Reconciliation spread position|Position 3, as in the app:What stands in the way`,
            $localize`:Spread position|Position of a spread, as in the app:Advice`,
            $localize`:Spread position|Reconciliation position 5, as in the app:Is there a chance`,
          ],
        },
        {
          type: 'newLove',
          title: $localize`:Spread name|Name of the New Love spread in the app:New Love`,
          description: $localize`:Home page|Description of the New Love spread, as in the app:What holds you back, what draws love, where to look and advice`,
          positions: [
            $localize`:Spread position|New Love position 1, as in the app:What holds me back`,
            $localize`:Spread position|New Love position 2, as in the app:What draws love`,
            $localize`:Spread position|New Love position 3, as in the app:Where to look`,
            $localize`:Spread position|Position of a spread, as in the app:Advice`,
          ],
        },
      ],
    },
    {
      title: $localize`:Home page|Spread section name, as in the app:Situation and choice`,
      spreads: [
        {
          type: 'three',
          title: $localize`:Spread name|Name of the three-card spread in the app:Three Cards`,
          description: $localize`:Home page|Description of the Three Cards spread, as in the app:Past, present and future of your question`,
          positions: [
            $localize`:Spread position|Position of a spread, as in the app:Past`,
            $localize`:Spread position|Position of a spread, as in the app:Present`,
            $localize`:Spread position|Position of a spread, as in the app:Future`,
          ],
        },
        {
          type: 'cross',
          title: $localize`:Spread name|Name of the four-card cross spread in the app:The Cross`,
          description: $localize`:Home page|Description of The Cross spread, as in the app:The heart of the matter, what to avoid, what to do and the outcome`,
          positions: [
            $localize`:Spread position|The Cross position 1, as in the app:The essence`,
            $localize`:Spread position|The Cross position 2, as in the app:What not to do`,
            $localize`:Spread position|The Cross position 3, as in the app:What to do`,
            $localize`:The Cross spread position|Position 4, as in the app:Outcome`,
          ],
        },
        {
          type: 'twoPaths',
          title: $localize`:Spread name|Name of the Two Paths spread in the app:Two Paths`,
          description: $localize`:Home page|Description of the Two Paths spread, as in the app:Where each of two options leads`,
          positions: [
            $localize`:Spread position|Two Paths position 1, as in the app:Situation`,
            $localize`:Spread position|Two Paths position 2, as in the app:Path 1 — how it unfolds`,
            $localize`:Spread position|Two Paths position 3, as in the app:Path 1 — outcome`,
            $localize`:Spread position|Two Paths position 4, as in the app:Path 2 — how it unfolds`,
            $localize`:Spread position|Two Paths position 5, as in the app:Path 2 — outcome`,
            $localize`:Spread position|Position of a spread, as in the app:Advice`,
          ],
        },
        {
          type: 'horseshoe',
          title: $localize`:Spread name|Name of the Horseshoe spread in the app:Horseshoe`,
          description: $localize`:Home page|Description of the Horseshoe spread, as in the app:Past, present and future, how to act, people around you, challenges and the outcome`,
          positions: [
            $localize`:Spread position|Position of a spread, as in the app:Past`,
            $localize`:Spread position|Position of a spread, as in the app:Present`,
            $localize`:Spread position|Position of a spread, as in the app:Future`,
            $localize`:Spread position|Horseshoe position 4, as in the app:How to act`,
            $localize`:Spread position|Horseshoe position 5, as in the app:Surroundings`,
            $localize`:Spread position|Horseshoe position 6, as in the app:Challenges`,
            $localize`:Spread position|Final position of a spread, as in the app:Outcome`,
          ],
        },
        {
          type: 'wish',
          title: $localize`:Spread name|Name of the Wish spread in the app:Wish`,
          description: $localize`:Home page|Description of the Wish spread, as in the app:Will your wish come true, and what will help`,
          positions: [
            $localize`:Spread position|Wish position 1, as in the app:The heart of the wish`,
            $localize`:Spread position|Position of a spread, as in the app:My strength`,
            $localize`:Spread position|Position of a spread, as in the app:What stands in the way`,
            $localize`:Spread position|Wish position 4, as in the app:What will help`,
            $localize`:Spread position|Wish position 5, as in the app:Will it come true`,
          ],
        },
      ],
    },
    {
      title: $localize`:Home page|Spread section name, as in the app:Work`,
      spreads: [
        {
          type: 'career',
          title: $localize`:Spread name|Name of the Career spread in the app:Career`,
          description: $localize`:Home page|Description of the Career spread, as in the app:Where you are, the obstacle, your strength, advice and outlook`,
          positions: [
            $localize`:Spread position|Career position 1, as in the app:Where I am now`,
            $localize`:Spread position|Career position 2, as in the app:Obstacle`,
            $localize`:Spread position|Position of a spread, as in the app:My strength`,
            $localize`:Spread position|Position of a spread, as in the app:Advice`,
            $localize`:Spread position|Career position 5, as in the app:Outlook`,
          ],
        },
      ],
    },
  ];

  protected readonly features: Item[] = [
    {
      title: $localize`:Home page|Feature title:An interpretation for your question`,
      text: $localize`:Home page|Feature text:Not a list of card meanings: each card is read in its place in the spread and tied to what you asked.`,
    },
    {
      title: $localize`:Home page|Feature title:Yes or No, decided by the cards`,
      text: $localize`:Home page|Feature text about the Yes or No spread:The answer comes from the cards you draw, not from AI guesswork: the same cards always give the same answer, and the reading explains it.`,
    },
    {
      title: $localize`:Home page|Feature title; Two Paths is a spread name in the app:Two Paths, by name`,
      text: $localize`:Home page|Feature text about the Two Paths spread; Stay and Move are examples of options:Name both options yourself, for example «Stay» and «Move», and the reading talks about each of them by name.`,
    },
    {
      title: $localize`:Home page|Feature title:The original 1909 deck`,
      text: $localize`:Home page|Feature text:All 78 cards of the original 1909 Rider–Waite deck, the one most tarot readers learn from, toned to the app colors. Choose one of five card backs.`,
    },
    {
      title: $localize`:Home page|Feature title:A guide to every card`,
      text: $localize`:Home page|Feature text about the card guide:All 78 cards with keywords and meanings — in general, in love, at work — and advice, plus every spread explained position by position. Tap a card in a reading to open it.`,
    },
    {
      title: $localize`:Home page|Feature title:History of readings`,
      text: $localize`:Home page|Feature text about history:Every reading is saved and grouped by day, so you can come back to it when things unfold.`,
    },
    {
      title: $localize`:Home page|Feature title:Three languages`,
      text: $localize`:Home page|Feature text:The app and the interpretations are in English, Russian and Spanish.`,
    },
    {
      title: $localize`:Home page|Feature title:Dark or light`,
      text: $localize`:Home page|Feature text about themes:A dark theme like the night sky, a light one like old parchment — or let your phone decide.`,
    },
    {
      title: $localize`:Home page|Feature title:Your questions stay private`,
      text: $localize`:Home page|Feature text about privacy:Sign in with Google or Apple. Your questions and readings never go to analytics, and you can turn analytics off.`,
    },
  ];

  // Same files as in the store listings, in the same order: `public/screenshots/{locale}/{name}.webp`, 480 × 1044.
  protected readonly screenshots: Screenshot[] = [
    { name: '01', caption: $localize`:Home page|Caption of a screenshot, as in the store listing:A reading for your question` },
    { name: '02', caption: $localize`:Home page|Caption of a screenshot, as in the store listing:Yes or No? The cards decide` },
    { name: '03', caption: $localize`:Home page|Caption of a screenshot, as in the store listing:12 spreads for love, work and choices` },
    { name: '04', caption: $localize`:Home page|Caption of a screenshot, as in the store listing:Draw your own cards` },
    { name: '05', caption: $localize`:Home page|Caption of a screenshot, as in the store listing:The original 1909 deck` },
    { name: '06', caption: $localize`:Home page|Caption of a screenshot, as in the store listing:Every card explained` },
  ];

  // Same strings as on the support page: one translation for both.
  protected readonly questions: Item[] = [
    {
      title: $localize`:Support FAQ|Question:How many readings can I do per day?`,
      text: $localize`:Support FAQ|Answer about daily limits; Cards of the Day is the plural of a spread name in the app:Every day you get 2 Cards of the Day and 6 readings in the other spreads. The limits reset at midnight UTC; the Home screen shows how many are left.`,
    },
    {
      title: $localize`:Support FAQ|Question:Why do I need to sign in?`,
      text: $localize`:Support FAQ|Answer about sign-in:Your readings and history are stored in your account, so they are not lost when you change or reinstall your phone, and daily limits are counted per account. You can sign in with Google or Apple.`,
    },
    {
      title: $localize`:Support FAQ|Question:Are the readings predictions?`,
      text: $localize`:Support FAQ|Answer about entertainment purpose:No. Isomantika is made for entertainment. Interpretations are written by AI: treat them as a prompt for reflection, not as a prediction or professional advice.`,
    },
  ];
}
