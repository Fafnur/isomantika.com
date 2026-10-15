import { Route } from '@angular/router';

import { PATHS, toRoutes } from '@mantikai/core';

export const appRoutes: Route[] = toRoutes([
  { path: PATHS.home, pathMatch: 'full', loadComponent: () => import('@mantikai/home/page') },
  { path: PATHS.privacy, loadComponent: () => import('@mantikai/privacy/page') },
  { path: PATHS.terms, loadComponent: () => import('@mantikai/terms/page') },
  { path: PATHS.consent, loadComponent: () => import('@mantikai/consent/page') },
  { path: PATHS.support, loadComponent: () => import('@mantikai/support/page') },
  { path: PATHS.deleteAccount, loadComponent: () => import('@mantikai/delete-account/page') },
  { path: PATHS.contact, loadComponent: () => import('@mantikai/contact/page') },
  { path: PATHS.notFound, loadComponent: () => import('@mantikai/not-found/page') },
  // Must be the last one.
  { path: PATHS.any, loadComponent: () => import('@mantikai/not-found/page') },
]);
