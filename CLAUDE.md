# mantikai.com

Сайт мобильного приложения Mantikai (AI-таро): маркетинговая страница, юридические документы, поддержка,
форма обратной связи. Чистая статика: Angular SSG → GitHub Pages. Полный план — `docs/plan.md`.

## Стек

- Nx-монорепа, Yarn 4 (`nodeLinker: node-modules`). Только `yarn`, не `npm`.
- Angular 22: standalone, zoneless, гидрация. `OnPush` — по умолчанию в Angular 22: `changeDetection` в компонентах
  не пишем; `Eager` (бывший `Default`) — только с обоснованием в `docs/decisions.md`. Сборщик `@angular/build` (esbuild).
- SSG: `outputMode: "static"`, все серверные роуты `RenderMode.Prerender`. Express/Node-сервера нет.
- Стили: глобальный `apps/site/src/styles.scss`, **Tailwind 3.4** (`apps/site/tailwind.config.js`, Angular
  подхватывает его сам). Не v4: сайт должен работать в старых браузерах из `.browserslistrc`. Токены — в
  `theme.extend` конфига. Модификаторы прозрачности (`bg-gold/50`) — да, утилиты `bg-opacity-*` выключены.
- Старые браузеры: синтаксис понижает сборка, недостающие API — точечные модули `core-js/stable/*` в
  `polyfills` (`apps/site/project.json`). Новый API в коде или в бандле Angular — добавить модуль туда.
  `.ts`-файл в `polyfills` не класть: Angular тогда считает приложение zone-based и ломает пререндер.
- Тесты: Vitest через `@angular/build:unit-test`; e2e — Playwright по собранной статике (`site:serve-static`
  на `http-server`), Chromium desktop + mobile.

## Переводы

- Строки в шаблонах — `i18n="Meaning|Description"`, в коде — `$localize`, без `@@id`.
- `i18n` — только на элементе, где один текст без вложенных тегов (иначе обернуть текст в `<span>`).
- Плейсхолдеры в `$localize` — с именем: `` $localize`:Meaning|Description:Привет, ${name}:name:` ``.
- После изменения строк: `yarn nx extract-i18n site` → в `apps/site/src/locale/messages.{ru,es}.xlf` добавить или
  обновить `<target>` для новых и изменённых `trans-unit`, удалить устаревшие (скилл `update-i18n`). Без перевода
  сборка падает (`i18nMissingTranslation: error`).
- Адреса — со слешем на конце (`/privacy/`, `/ru/support/`).

## Проекты

- `apps/site` — сайт (префикс селекторов `mk`).
- `apps/site-e2e` — e2e.
- `libs/*` — библиотеки, импорт только через алиас `@mantikai/<имя>`.

## Команды

```sh
yarn nx serve site
yarn nx build site            # все локали + 404.html
yarn nx extract-i18n site
yarn nx serve-static site
yarn nx run-many -t lint test build e2e
```

## Скиллы

- `.claude/skills/angular-developer` — официальный скилл Angular (`angular/skills`): справочник по сигналам,
  Signal Forms, роутингу, SSR/пререндеру, ARIA, тестам. Обновление: `npx skills update -p`; версия
  зафиксирована в `skills-lock.json`. Файлы скилла руками не править.
- `.claude/skills/update-vendors` — свой скилл обновления зависимостей («обнови вендоры»): `nx migrate`, `ncu` с
  исключениями (Tailwind 3, vitest по peer `@angular/build`), проверки старых браузеров, PR в `main`.
- `.claude/skills/update-i18n` — обновление переводов («обнови переводы»): извлечь строки, добавить новые
  `trans-unit` с переводом в `messages.{ru,es}.xlf`, удалить устаревшие, проверить.
- Где скилл Angular расходится с правилами ниже — побеждают правила этого файла: вместо `ng generate`/`ng build` —
  генераторы и таргеты Nx (`yarn nx g …`, `yarn nx build site`), стили — Tailwind в шаблонах без файлов
  стилей у компонентов.

## Правила работы

- **Перед выполнением любой задачи — grill me.** Сначала расспроси владельца о неочевидных решениях
  (поведение, UX, тексты, крайние случаи), предложи варианты с рекомендацией; код — только после ответов.
- **Каждая задача — в отдельной ветке** от свежего `main`: `feature/<номер>-<кратко>` (`feature/1.2-ssg-i18n`),
  исправления — `fix/<кратко>`. В `main` — только через PR, напрямую не коммитим. История линейная: перед мёржем —
  `git rebase main` и `git push --force-with-lease`, мёрж — «Rebase and merge», без merge-коммитов.
- Коммиты — `[тип] Кратко в повелительном наклонении` по-английски: `[feat] 2.1: Tokens and typography`,
  `[fix] …`, `[refactor] …`, `[docs] …`, `[ci] …`, `[chore] …`.
- **Nx — только через генераторы** (`yarn nx g @nx/angular:library …`, `yarn nx g @nx/angular:component …`),
  сначала с `--dry-run`. Умолчания генераторов (префикс `mk`, `OnPush`, без файлов стилей) — в `nx.json`.
- Библиотеки — в `libs/`, приложения — в `apps/`.
- Сигналы везде: `signal`, `computed`, `input()`, `output()`, `viewChild()`; без `@Input`/`@Output`/RxJS там,
  где хватает сигналов. API сверять с актуальной документацией angular.dev и nx.dev.
- Свои сигналы — с префиксом `$`: `readonly $open = signal(false)`, `$items = computed(…)`. Входы — с `$` и alias
  без него: `readonly $mode = input('text', { alias: 'mode' })`, в шаблоне `[mode]`. Без `$` — `output()` и поля,
  имена которых задаёт контракт (`FormValueControl`: `value`, `touched`, `disabled`…).
- Слушатели и привязки хоста — только в `host: {}`, без `@HostListener`/`@HostBinding`. Обработчики — `onX` по
  действию, без типа события: `onClose`, не `onCloseClick`. Состояния — классы `is-*` (`'[class.is-open]': '$open()'`).
- Кнопки и ссылки — атрибутные директивы на нативных элементах (`button[mkButton]`, `a[mkButton]`) с классами в
  `host`, без компонентов-обёрток.
- Пустые `imports: []` и `host: {}` не пишем. Зависимости — `inject()` в `private readonly` поля.
- Классы Tailwind — в шаблонах и `host: { class: '…' }`. У компонентов нет своих файлов стилей.
- Формы — Angular Signal Forms.
- Задача готова, когда `lint`, `test`, `build`, `e2e` зелёные; статус — в `docs/progress.md`.
- Принятые решения и отступления от плана — в `docs/decisions.md`.
- `README.md` — витрина на GitHub: сверху на английском дублирует тексты главной, ниже — раздел для разработчиков.
  Меняются тексты главной — обновлять README в той же задаче.
- Не расширять объём задачи: то, что в плане помечено «Не входит», без явной просьбы не делаем.
- Не писать юридические тексты, не добавлять персональные данные владельца, никаких секретов в репозитории.
