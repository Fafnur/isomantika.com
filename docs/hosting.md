# Хостинг

Сайт — статика на своём сервере (`130.49.174.192`, nginx). CI на push в `main` проверяет и собирает сайт, затем
отправляет `dist/apps/site/browser/` rsync в `/var/www/isomantika.com` (`--delete`). Конфиг nginx —
[`deploy/nginx/isomantika.com.conf`](../deploy/nginx/isomantika.com.conf), сертификат — Let's Encrypt (certbot).

## Секреты репозитория (Settings → Secrets and variables → Actions)

| Секрет           | Значение                           |
| ---------------- | ---------------------------------- |
| `DEPLOY_HOST`    | `130.49.174.192`                   |
| `DEPLOY_PORT`    | `61088`                            |
| `DEPLOY_USER`    | `developer`                        |
| `DEPLOY_SSH_KEY` | приватный ключ `isomantika-deploy` |
| `DEPLOY_PATH`    | `/var/www/isomantika.com`          |

## Первая настройка сервера

Сервер общий с fafn.ru (Ubuntu 24.04, nginx из `conf.d`, certbot с `certbot.timer`). Вход по SSH — порт 61088;
деплоит пользователь `developer`, у CI сайта свой ключ `isomantika-deploy`.

1. Папка сайта: `sudo install -d -o developer -g developer /var/www/isomantika.com`.
2. Ключ CI: публичный ключ `isomantika-deploy` — строкой в `/home/developer/.ssh/authorized_keys`, приватный —
   в секрет `DEPLOY_SSH_KEY`.
3. DNS у регистратора: `A isomantika.com → 130.49.174.192`, записи `AAAA` удалить (у сервера нет IPv6),
   `www` — `CNAME isomantika.com`. TXT `_github-pages-challenge-…` можно удалить. Дождаться, пока
   `dig +short isomantika.com` и `dig +short www.isomantika.com` отдают адрес сервера.
4. Сертификат: `sudo certbot certonly --nginx -d isomantika.com -d www.isomantika.com`. Продлевает `certbot.timer`.
5. Конфиг: `deploy/nginx/isomantika.com.conf` → `/etc/nginx/conf.d/isomantika.com.conf`,
   `sudo nginx -t && sudo systemctl reload nginx`.
6. Перезапустить последний CI на `main` (или смёржить PR) — сайт приедет на сервер.
7. Отключить GitHub Pages: Settings → Pages → Unpublish, Custom domain очистить.

## Изменение конфига nginx

Конфиг в репозитории — источник правды; на сервер его копируют руками, CI отправляет только файлы сайта.
