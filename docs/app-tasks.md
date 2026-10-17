# Задачи для репозитория приложения (isomantika), связанные с сайтом

Добавить в `docs/plan.md` приложения (этап 5) и выполнить там. A.2 нужна до задачи 4.1 сайта.
A.3 нужна до выпуска: политика конфиденциальности обещает удаление убранных из истории раскладов в течение 48 часов.

**Статус (2026-10-15):** A.1–A.3 сделаны в репозитории приложения — задачи 5.6–5.8, ветка `feature/site-tasks`.
Отступления: ссылки со слешем на конце (`/privacy/`, `/ru/privacy/`); ловушка и `elapsedMs` проверяются до валидации;
поля обрезаются по краям перед проверкой длины. Для работы в облаке: `supabase db push`, секреты `CONTACT_*` и
`TELEGRAM_*`, `supabase functions deploy contact`.

**A.1. ✅ Ссылки на документы без префикса для английского.** Сайт отдаёт английскую версию из корня
(`isomantika.com/privacy`), русскую и испанскую — с префиксом (`/ru/privacy`, `/es/privacy`). В `AppLinks`
(`lib/core/config/app_links.dart`) `privacyPolicy` и `terms` для `en` строят адрес без префикса, для остальных
языков — с префиксом. Добавить `support(languageCode)` по тому же правилу (`/support`, `/ru/support`). Юнит-тест
на все три языка. Записать в `docs/decisions.md`.

**A.2. ✅ Edge Function `contact` для формы на сайте.** Миграция: таблица `contact_messages` (id uuid, created_at,
name text, email text, telegram text null, topic text check in ('question','bug','account_deletion','other'),
message text, locale text, ip_hash text); RLS включён, политик нет — доступ только у service role. Функция
`supabase/functions/contact` (в `config.toml` — `verify_jwt = false`: запросы идут с сайта без входа):
- только POST и OPTIONS; CORS — только источники из секрета `CONTACT_ALLOWED_ORIGINS`
  (`https://isomantika.com`, для разработки `http://localhost:4200`);
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

**A.3. ✅ Физическое удаление раскладов, убранных из истории.** Сейчас `hide_reading()` только ставит `hidden_at`, и
строка живёт до удаления аккаунта. Скрытые расклады нужны лишь для подсчёта лимита текущих суток UTC. Миграция:
включить расширение `pg_cron`; функция `purge_hidden_readings()` (security definer, `search_path = ''`, доступ только
у `service_role`) удаляет строки, где `hidden_at is not null` и `created_at` раньше начала текущих суток UTC;
задача cron раз в сутки в 00:15 UTC. Так расклад, убранный из истории, исчезает не позже чем через ~25 часов, а лимит
не обходится (сегодняшние скрытые расклады остаются до конца суток). pgTAP-тест: скрытый вчерашний расклад удаляется,
скрытый сегодняшний и видимый вчерашний остаются, `usage_for_user` до и после очистки возвращает одно и то же.
Записать в `docs/decisions.md`: срок «в течение 48 часов» зафиксирован в политике конфиденциальности.
