import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PATHS, SITE } from '@isomantika/core';
import { Button } from '@isomantika/ui/buttons';

interface Question {
  readonly question: string;
  readonly answer: string;
  readonly link?: { readonly label: string; readonly path: string };
}

@Component({
  selector: 'imk-support-page',
  imports: [RouterLink, Button],
  templateUrl: './support-page.html',
  host: { class: 'block max-w-3xl' },
})
export class SupportPage {
  protected readonly site = SITE;
  protected readonly paths = PATHS;

  protected readonly questions: Question[] = [
    {
      question: $localize`:Support FAQ|Question:What is Isomantika?`,
      answer: $localize`:Support FAQ|Answer to «What is Isomantika?»:Isomantika is a tarot app for iOS and Android. You ask a question, draw cards from the classic Rider–Waite deck, and AI writes an interpretation of the spread for your question — in English, Russian or Spanish.`,
    },
    {
      question: $localize`:Support FAQ|Question:How many readings can I do per day?`,
      answer: $localize`:Support FAQ|Answer about daily limits; Three Cards and The Cross are spread names in the app:Every day you get 1 Card of the Day and 3 readings with a question (Three Cards and The Cross share these 3). The limits reset at midnight UTC; the Home screen shows how many are left.`,
    },
    {
      question: $localize`:Support FAQ|Question:How do I change the language or the card back?`,
      answer: $localize`:Support FAQ|Answer; «Settings → Appearance» must match the app menu:Open Settings → Appearance. There you can choose the language (System, English, Russian or Spanish) and one of five card back designs.`,
    },
    {
      question: $localize`:Support FAQ|Question:Why do I need to sign in?`,
      answer: $localize`:Support FAQ|Answer about sign-in:Your readings and history are stored in your account, so they are not lost when you change or reinstall your phone, and daily limits are counted per account. You can sign in with Google or Apple.`,
    },
    {
      question: $localize`:Support FAQ|Question:Where can I find my past readings?`,
      answer: $localize`:Support FAQ|Answer; «History» is the tab name in the app:In the History tab. Every reading is saved there automatically.`,
    },
    {
      question: $localize`:Support FAQ|Question:How do I remove a reading from history?`,
      answer: $localize`:Support FAQ|Answer about removing a reading from history:In History, swipe the reading away and confirm. Removing a reading doesn't give back a reading for today.`,
    },
    {
      question: $localize`:Support FAQ|Question:How do I delete my account?`,
      answer: $localize`:Support FAQ|Answer; «Settings → Account → Delete account» must match the app menu:Open Settings → Account → Delete account. Your account and all your readings are deleted immediately and permanently.`,
      link: {
        label: $localize`:Support FAQ|Link to the account deletion page:More about deleting your account`,
        path: PATHS.deleteAccount,
      },
    },
    {
      question: $localize`:Support FAQ|Question:Are the readings predictions?`,
      answer: $localize`:Support FAQ|Answer about entertainment purpose:No. Isomantika is made for entertainment. Interpretations are written by AI: treat them as a prompt for reflection, not as a prediction or professional advice.`,
    },
    {
      question: $localize`:Support FAQ|Question:How do I contact support from the app?`,
      answer: $localize`:Support FAQ|Answer; «Settings → About → Contact support» must match the app menu:Open Settings → About → Contact support. The email already contains the app version and your user ID, which helps us answer faster.`,
    },
  ];
}
