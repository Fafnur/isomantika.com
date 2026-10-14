# Ход работ

## Этап 1. Каркас

- [x] **1.1. Рабочее пространство** — 2026-10-14. Nx + Angular 22 (`apps/site`, `apps/site-e2e`), Yarn 4,
      zoneless, `OnPush`, Tailwind v4, Vitest, Playwright, ESLint + Prettier. lint/test/build/e2e зелёные.
- [ ] **1.2. SSG и языки** — частично: `outputMode: "static"`, без Express, `serve-static` на `http-server`,
      e2e по статике. Осталось: i18n, роуты-заглушки, 404.html, `.nojekyll`, `CNAME`, контрактный e2e.
- [ ] 1.3. CI и деплой
