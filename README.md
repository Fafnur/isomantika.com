# Isomantika — ask a question, draw the cards

**[isomantika.com](https://isomantika.com)** · tarot app for iOS and Android · English, Русский, Español

A tarot reading for your question, not a generic horoscope: every card is read in its place in the spread, then what it
all means for you.

12 spreads · The original 1909 deck · Free, no ads

## How it works

1. **Ask your question** — about love, work or a choice you are facing — in your own words.
2. **Draw the cards** — pick one of 12 spreads, draw your cards from a fan of the shuffled deck and watch them turn over.
3. **Read the interpretation** — every card is read in its place in the spread, then what it all means for you. The
   reading is finished and saved even if you close the app.

## 12 spreads

From one card to seven: for a quick answer, love, choices and work.

- **Quick answer:** Card of the Day — a hint for the day ahead; Yes or No — a clear answer to your question.
- **Love:** Their Feelings — what they think, feel and intend; Relationship — you, your partner, your bond, what stands
  in the way and advice; Reconciliation — after a breakup or quarrel: is there a chance to get back together; New Love —
  what holds you back, what draws love, where to look and advice.
- **Situation and choice:** Three Cards — past, present and future of your question; The Cross — the heart of the
  matter, what to avoid, what to do and the outcome; Two Paths — where each of two options leads; Horseshoe — past,
  present and future, how to act, people around you, challenges and the outcome; Wish — will your wish come true, and
  what will help.
- **Work:** Career — where you are, the obstacle, your strength, advice and outlook.

## What makes it different

- **An interpretation for your question.** Not a list of card meanings: each card is read in its place in the spread
  and tied to what you asked.
- **Yes or No, decided by the cards.** The answer comes from the cards you draw, not from AI guesswork: the same cards
  always give the same answer, and the reading explains it.
- **Two Paths, by name.** Name both options yourself, for example «Stay» and «Move», and the reading talks about each of
  them by name.
- **The original 1909 deck.** All 78 cards of the original 1909 Rider–Waite deck, the one most tarot readers learn from,
  toned to the app colors. Choose one of five card backs.
- **A guide to every card.** All 78 cards with keywords and meanings — in general, in love, at work — and advice, plus
  every spread explained position by position. Tap a card in a reading to open it.
- **History of readings.** Every reading is saved and grouped by day, so you can come back to it when things unfold.
- **Three languages.** The app and the interpretations are in English, Russian and Spanish.
- **Dark or light.** A dark theme like the night sky, a light one like old parchment — or let your phone decide.
- **Your questions stay private.** Sign in with Google or Apple. Your questions and readings never go to analytics, and
  you can turn analytics off.

Every day you get 2 Cards of the Day and 6 readings in the other spreads; the limits reset at midnight UTC.

## Get the app

Coming soon to the App Store and Google Play.

## Support

- [Questions and answers](https://isomantika.com/support/) · [Delete your account](https://isomantika.com/delete-account/)
- Write to **[support@isomantika.com](mailto:support@isomantika.com)**
- [Privacy Policy](https://isomantika.com/privacy/) · [Terms of Use](https://isomantika.com/terms/)

This app is made for entertainment. The app is intended for users aged 18 and over.

---

## About this repository

This is the source of the [isomantika.com](https://isomantika.com) website: a static site built with Angular (prerendered,
SSG) in an Nx monorepo and served by nginx on our own server.

Requirements: Node.js 24 (`.nvmrc`), Yarn 4 via Corepack (`corepack enable`).

```sh
yarn install
yarn start    # dev server, http://localhost:4200
yarn build    # static site in dist/apps/site/browser
yarn serve    # build and serve the static site (as in production)
yarn check    # lint, test, build, e2e
```

Brand: logo, colours, fonts and files — [`brandbook/`](brandbook/README.md).

Plan, progress and decisions (in Russian): [`docs/plan.md`](docs/plan.md), [`docs/progress.md`](docs/progress.md),
[`docs/decisions.md`](docs/decisions.md).
