# Задачи для репозитория приложения (mantikai), связанные с сайтом

Добавить в `docs/plan.md` приложения (этап 5) и выполнить там. A.2 нужна до задачи 4.1 сайта.

**A.1. Ссылки на документы без префикса для английского.** Сайт отдаёт английскую версию из корня
(`mantikai.com/privacy`), русскую и испанскую — с префиксом (`/ru/privacy`, `/es/privacy`). В `AppLinks`
(`lib/core/config/app_links.dart`) `privacyPolicy` и `terms` для `en` строят адрес без префикса, для остальных
языков — с префиксом. Добавить `support(languageCode)` по тому же правилу (`/support`, `/ru/support`). Юнит-тест
на все три языка. Записать в `docs/decisions.md`.

**A.2. Edge Function `contact` для формы на сайте.** Миграция: таблица `contact_messages` (id uuid, created_at,
name text, email text, telegram text null, topic text check in ('question','bug','account_deletion','other'),
message text, locale text, ip_hash text); RLS включён, политик нет — доступ только у service role. Функция
`supabase/functions/contact` (в `config.toml` — `verify_jwt = false`: запросы идут с сайта без входа):
- только POST и OPTIONS; CORS — только источники из секрета `CONTACT_ALLOWED_ORIGINS`
  (`https://mantikai.com`, для разработки `http://localhost:4200`);
- валидация как на сайте (имя до 100, email, ник `^@?[A-Za-z0-9_]{5,32}$` или пусто, тема из списка,
  сообщение 10–2000, `locale` из `en|ru|es`) → 400 `invalid_request`;
- заполнено поле-ловушка `website` или `elapsedMs < 3000` → 200 без сохранения (бот не должен понять, что его
  отсекли);
- лимит: не больше 5 сообщений в час с одного `ip_hash` (sha256 от IP из `x-forwarded-for` + секрет
  `CONTACT_IP_SALT`) → 429 `rate_limited`;
- запись в таблицу, затем уведомление в Telegram (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`): тема, имя, email,
  ник, язык, текст. Ошибка Telegram логируется и не ломает ответ — сообщение уже сохранено;
- ответ 200 `{ ok: true }`.
Структура как у `reading` и `delete-account`: `handler.ts` с зависимостями через интерфейс, `index.ts` —
связывание, Deno-тесты обработчика (валидация, ловушка, лимит, сбой Telegram), pgTAP-тест: anon и
authenticated не читают и не пишут `contact_messages`. Секреты — в `supabase/.env.example` без значений.
Записать в `docs/decisions.md`.
