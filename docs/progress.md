# Ход работ

## Этап 1. Каркас

- [x] **1.1. Рабочее пространство** — 2026-10-14. Nx + Angular 22 (`apps/site`, `apps/site-e2e`), Yarn 4,
      zoneless, `OnPush`, Tailwind 3.4, Vitest, Playwright, ESLint + Prettier. lint/test/build/e2e зелёные.
- [x] **1.2. SSG и языки** — 2026-10-14. `@angular/localize` (en в корне, `ru/`, `es/`), роуты-заглушки, `404.html`,
      контрактный e2e (6 адресов приложения, `lang` главных, 404).
- [x] **1.3. CI и деплой** — 2026-10-14. `ci.yml`: PR — `nx affected`, `main` — `run-many` (lint, test, build, e2e,
      Prettier; кэш Yarn, Nx, браузеров Playwright), затем деплой `dist/apps/site/browser` на GitHub Pages.

## Этап 2. Дизайн и оболочка

- [x] **2.1. Токены и типографика** — 2026-10-15. Цвета и шрифты в `tailwind.config.js`, Cormorant Garamond и Manrope
      variable (latin + cyrillic, preload), базовые стили, `prose` для документов, фавиконы и `site.webmanifest`,
      кнопки `@mantikai/ui/buttons` (primary / secondary / ghost). e2e: иконки, манифест, шрифты, цвета.
      Бейджи сторов — ждут официальные файлы.
