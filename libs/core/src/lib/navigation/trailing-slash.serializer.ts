import { Injectable } from '@angular/core';
import { DefaultUrlSerializer, UrlTree } from '@angular/router';

/**
 * GitHub Pages serves `/privacy/index.html` at `/privacy/` and redirects `/privacy` there (301).
 * Router links and the address bar keep the trailing slash so that reloads and crawlers get no redirect.
 */
@Injectable()
export class TrailingSlashUrlSerializer extends DefaultUrlSerializer {
  // `/privacy/` would otherwise end with an empty segment that matches no route.
  override parse(url: string): UrlTree {
    return super.parse(removeTrailingSlash(url));
  }

  override serialize(tree: UrlTree): string {
    return addTrailingSlash(super.serialize(tree));
  }
}

export function removeTrailingSlash(url: string): string {
  return url.replace(/^(.+?)\/+(?=[?#]|$)/, '$1');
}

export function addTrailingSlash(url: string): string {
  const [, path, rest] = /^([^?#]*)(.*)$/.exec(url) ?? ['', url, ''];

  return path.endsWith('/') ? url : `${path}/${rest}`;
}
