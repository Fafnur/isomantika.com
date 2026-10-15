# Mantikai — AI tarot readings for your question

**[mantikai.com](https://mantikai.com)** · iOS and Android · English, Русский, Español

Mantikai is a tarot app that reads the cards for _your_ question. Ask what is on your mind, draw the cards, and get
an interpretation written for your situation — not a generic card meaning copied from a book. Each card is read
in its position in the spread, so the same card says different things in "the past" and in "what to do".

## How it works

1. **Ask a question** — about love, work, a decision, or just the day ahead.
2. **Draw the cards** — pick a spread and pull the cards yourself.
3. **Get your reading** — an AI interpretation of every card in its position and of the spread as a whole.

## Spreads

- **Card of the day** — one card and a short reading to start the day.
- **Three cards** — past, present, future: how you got here and where things are heading.
- **The cross** — the essence of the situation, what not to do, what to do, and the outcome.

## Why Mantikai

- **Readings for your question.** The interpretation takes your question and each card's position into account.
- **The classic deck.** The Rider–Waite tarot, first published in 1909.
- **Choose your card back.** Pick the design you like for your deck.
- **Three languages.** The app and the readings are available in English, Russian and Spanish.
- **Reading history.** Every spread is saved, so you can come back to it later.
- **Daily readings.** One card of the day and three spreads with a question every day (limits reset daily at
  00:00 UTC).

## Get the app

Coming soon to the App Store and Google Play. Follow [mantikai.com](https://mantikai.com) for the launch.

## Support

Questions, ideas or problems with the app — write to **[support@mantikai.com](mailto:support@mantikai.com)**.

Mantikai is made for entertainment. Readings are not predictions and are not a substitute for professional
advice. The app is intended for users aged 18 and over.

---

## About this repository

This is the source of the [mantikai.com](https://mantikai.com) website: a static site built with Angular (prerendered,
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
