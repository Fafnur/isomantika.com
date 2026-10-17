# Isomantika — ask a question, draw the cards

**[isomantika.com](https://isomantika.com)** · tarot app for iOS and Android · English, Русский, Español

Isomantika reads the classic Rider–Waite tarot for your question: every card in its place, in a calm interpretation — in
English, Russian or Spanish.

## How it works

1. **Ask your question** — about love, work or a choice you are facing — in your own words.
2. **Draw the cards** — pick a spread and draw from a shuffled deck of 78 cards.
3. **Read the interpretation** — every card is read in its position and tied to your question.

## Three spreads

- **Card of the Day** — a hint for the day ahead.
- **Three Cards** — past, present and future of your question.
- **The Cross** — the heart of the matter, what to avoid, what to do and the outcome.

## What makes it different

- **An interpretation for your question.** Not a list of card meanings: each card is read in its place in the spread
  and tied to what you asked.
- **The classic Rider–Waite deck.** All 78 cards of the 1909 Rider–Waite deck, the one most tarot books are written
  about.
- **Your card back.** Choose one of five card back designs.
- **Three languages.** The app and the interpretations are in English, Russian and Spanish.
- **History of readings.** Every reading is saved, so you can come back to it later.

Every day you get 1 Card of the Day and 3 readings with a question; the limits reset at midnight UTC.

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
SSG) in an Nx monorepo and deployed to GitHub Pages.

Requirements: Node.js 24 (`.nvmrc`), Yarn 4 via Corepack (`corepack enable`).

```sh
yarn install
yarn start    # dev server, http://localhost:4200
yarn build    # static site in dist/apps/site/browser
yarn serve    # build and serve the static site (like GitHub Pages)
yarn check    # lint, test, build, e2e
```

Plan, progress and decisions (in Russian): [`docs/plan.md`](docs/plan.md), [`docs/progress.md`](docs/progress.md),
[`docs/decisions.md`](docs/decisions.md).
