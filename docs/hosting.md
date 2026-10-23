# Хостинг

Сайт — статика на своём сервере (`130.49.174.192`, nginx). CI на push в `main` проверяет и собирает сайт, затем
отправляет `dist/apps/site/browser/` rsync в `/var/www/isomantika.com` (`--delete`). Конфиг nginx —
[`deploy/nginx/isomantika.com.conf`](../deploy/nginx/isomantika.com.conf), сертификат — Let's Encrypt (certbot).

## Секреты репозитория (Settings → Secrets and variables → Actions)

| Секрет           | Значение                                             |
| ---------------- | ---------------------------------------------------- |
| `DEPLOY_HOST`    | `130.49.174.192`                                     |
| `DEPLOY_PORT`    | порт SSH                                             |
| `DEPLOY_USER`    | пользователь, которому доступна запись в папку сайта |
| `DEPLOY_SSH_KEY` | приватный ключ этого пользователя                    |
| `DEPLOY_PATH`    | `/var/www/isomantika.com`                            |

## Первая настройка сервера

1. Папки: `mkdir -p /var/www/isomantika.com /var/www/certbot`, владелец папки сайта — `DEPLOY_USER`.
2. DNS у регистратора: `A isomantika.com → 130.49.174.192`, записи `AAAA` удалить (у сервера нет IPv6),
   `www` — `CNAME isomantika.com`. TXT `_github-pages-challenge-…` можно удалить.
3. Сначала nginx только с HTTP, чтобы выпустить сертификат: в `/etc/nginx/conf.d/isomantika.com.conf` — `map`
   и первый блок `server` (порт 80) из конфига репозитория; `nginx -t && systemctl reload nginx`.
4. Сертификат: `certbot certonly --webroot -w /var/www/certbot -d isomantika.com -d www.isomantika.com`.
   Продление — таймер certbot; после продления nginx перечитывает сертификат:
   `--deploy-hook "systemctl reload nginx"` (сохраняется в настройках продления).
5. Полный конфиг из репозитория вместо временного, `nginx -t && systemctl reload nginx`.
6. Перезапустить последний CI на `main` (или запушить) — сайт приедет на сервер.
7. Отключить GitHub Pages: Settings → Pages → Unpublish, Custom domain очистить.

## Изменение конфига nginx

Конфиг в репозитории — источник правды; на сервер его копируют руками, CI отправляет только файлы сайта.
