# mantikai.com

Сайт мобильного приложения Mantikai (AI-таро для iOS и Android): маркетинговая страница, юридические документы,
поддержка, форма обратной связи. Статика (Angular SSG) на GitHub Pages.

План — [`docs/plan.md`](docs/plan.md), ход работ — [`docs/progress.md`](docs/progress.md),
решения — [`docs/decisions.md`](docs/decisions.md).

## Требования

- Node.js ≥ 22
- Yarn 4 через Corepack: `corepack enable`

## Команды

```sh
yarn install
yarn nx serve site          # dev-сервер, http://localhost:4200
yarn nx build site          # статика в dist/apps/site/browser
yarn nx serve-static site   # собрать и раздать статику (как GitHub Pages)
yarn nx lint site
yarn nx test site           # Vitest
yarn nx e2e site-e2e        # Playwright по собранной статике
yarn nx run-many -t lint test build e2e
```
