# Решения

## 2026-10-14 — каркас (1.1)

- **Пакетный менеджер — Yarn 4** (`packageManager: yarn@4.18.1`, Corepack), `nodeLinker: node-modules`,
  `npmMinimalAgeGate: 0`. В `engines` запрещён npm. В плане для CI был кэш npm — в 1.3 кэшируем Yarn.
- **Стили — SCSS** для глобального `styles.scss`. Компоненты генерируются без файлов стилей (`style: none`).
- **Префикс селекторов — `mk`**, `changeDetection: OnPush` явно в умолчаниях генераторов `nx.json`.
- **Юнит-тесты — `@angular/build:unit-test` (Vitest)** вместо AnalogJS: официальный раннер Angular,
  меньше зависимостей.
- **Без Express:** `outputMode: "static"`, `server.ts` удалён; `main.server.ts` нужен для пререндера.
- **e2e:** по собранной статике через `http-server`, проекты Chromium desktop + mobile (Pixel 7).
- **`.browserslistrc`** — набор владельца (в корне), включая старые Chrome (> 63) и Firefox (> 66): сайт должен
  работать в старых браузерах. Предупреждение Angular о неподдерживаемых браузерах при сборке — ожидаемое.
- **Tailwind 3.4 вместо v4 (отступление от плана, 1.1 и 2.1).** v4 выдаёт `@layer`, `@property`, `color-mix()`;
  браузер без `@layer` (Chrome < 99, Firefox < 97, Safari < 15.4) отбрасывает все стили. v3 подключается
  встроенной поддержкой `@angular/build` (`apps/site/tailwind.config.js`, без PostCSS-конфига). Токены из плана
  (`--color-*`, `--font-*`) — в `theme.extend` конфига, имена классов те же (`bg-surface`, `text-gold`,
  `font-display`). Утилиты `*-opacity-*` выключены: дают `rgb(r g b / var(...))`, которого нет до Chrome 65.
- **Полифилы — точечный core-js** (`core-js/stable/*` списком в `polyfills` `apps/site/project.json`, ≈ 18 КБ gzip),
  не `core-js/stable` целиком. Рантайм Angular 22 использует `Object.hasOwn` (Chrome 93+), `Promise.allSettled`,
  `queueMicrotask`, `String.matchAll`, `Array.flat`. Проверено в Chromium с удалёнными API: с полифилами
  приложение гидрируется, без них — `Object.hasOwn is not a function`. `AbortController` (роутер, Chrome 66+)
  не полифилим: Chrome 64–65 практически не встречаются. Файл `polyfills.ts` не используем — с любым `.ts`
  в `polyfills` Angular подключает `zone.js` в серверную сборку и пререндер падает.
- **Prettier:** `printWidth: 140`, `singleQuote`, для `*.html` — парсер `angular`. Длину строк контролирует
  только Prettier, правила `max-len` в ESLint нет.
- **ESLint** — общий конфиг в корне (пресеты Nx для Angular и шаблонов, `eslint-config-prettier`), в проектах —
  только префикс селекторов. Сверх пресетов: `naming-convention`, `complexity`, `explicit-member-accessibility`
  (без `public`), `array-type: array-simple`, `consistent-type-definitions`, `no-shadow`, сортировка импортов
  `simple-import-sort` (группы: побочные, `node:`, пакеты, `@mantikai/*`, относительные), `import-x`
  (`first`, `newline-after-import`, `no-duplicates`). Angular: `prefer-signals`, `prefer-output-emitter-ref`,
  `prefer-host-metadata-property`, в шаблонах `prefer-self-closing-tags`. Без `eslint-plugin-rxjs-x` и
  типизированного линта: RxJS почти не используется, а типизированный линт заметно медленнее.
- **Скилл `angular-developer`** (`angular/skills`) установлен в `.claude/skills` через `npx skills add … --copy`,
  версия — в `skills-lock.json`. Скилл `angular-new-app` не ставили: приложение уже создано.

## 2026-10-14 — CI (1.3, часть 1)

- **Проверки на PR — до 1.2**, деплой — после 1.2: деплою нужны `404.html`, `.nojekyll`, `CNAME` и настройка Pages.
- **Node 24** зафиксирован в `.nvmrc` (CI и локально), не `lts/*`: с Node 25 Corepack не входит в поставку Node,
  а Yarn 4 ставится через него.
- **`dependencies` / `devDependencies`** — разделение оставляем: в `dependencies` то, что попадает в бандл.
- **Линейная история git:** ветки ребейзим на `main`, PR мёржим через «Rebase and merge».
- **Настройки репозитория GitHub:** разрешён только «Rebase and merge», ветки удаляются после мёржа. Ruleset `main`:
  только через PR (без обязательного ревью), обязательная проверка `Lint, test, build, e2e` на свежем `main`,
  линейная история, запрет force push и удаления. Раннер CI — `ubuntu-latest`.

## 2026-10-14 — деплой (1.3, часть 2)

- **Деплой заглушки до 1.2:** Pages успели включиться в режиме «Deploy from branch» и опубликовали README через
  Jekyll; чтобы его не проиндексировали, деплой из Actions сделан сразу. `noindex` на заглушку не ставим.
- **Pages — источник «GitHub Actions»** (`build_type: workflow`), домен `mantikai.com` — в настройках Pages.
  Файлы `CNAME` и `.nojekyll` не кладём: при деплое артефакта через Actions они не нужны. В режиме «Deploy from
  branch» GitHub коммитил бы `CNAME` в `main`, что запрещено ruleset.
- **DNS** — у reg.ru (NS не меняли): A/AAAA на адреса GitHub Pages, `www` → CNAME `fafnur.github.io`.

## 2026-10-14 — README и About репозитория

- **README — на английском, как маркетинговая страница** (индексируется, ссылка на сайт), ниже — раздел для
  разработчиков. Только факты из плана; «бесплатно» не пишем — монетизация в плане не описана. Ссылки на
  `/privacy`, `/terms`, `/support` добавить, когда страницы появятся (3.1, 3.2).
- **About репозитория:** описание, сайт `https://mantikai.com`, темы (`tarot`, `tarot-reading`, `ai`, `angular`, …).
