import { Route } from '@angular/router';

import { PATHS, SeoRouteData, toRoutes } from '@mantikai/core';

const notFound: SeoRouteData = { noindex: true };

export const appRoutes: Route[] = toRoutes([
  {
    path: PATHS.home,
    pathMatch: 'full',
    loadComponent: () => import('@mantikai/home/page'),
    data: {
      description: $localize`:Home page|Meta description of the home page:Mantikai is an AI tarot app: ask a question, draw the cards and get a reading in your language.`,
    } satisfies SeoRouteData,
  },
  {
    path: PATHS.privacy,
    loadComponent: () => import('@mantikai/privacy/page'),
    title: $localize`:Privacy page|Page title in the browser tab:Privacy Policy`,
    data: {
      description: $localize`:Privacy page|Meta description:How the Mantikai app and website collect, use and protect personal data.`,
    } satisfies SeoRouteData,
  },
  {
    path: PATHS.terms,
    loadComponent: () => import('@mantikai/terms/page'),
    title: $localize`:Terms page|Page title in the browser tab:Terms of Use`,
    data: {
      description: $localize`:Terms page|Meta description:Terms of use of the Mantikai app and website.`,
    } satisfies SeoRouteData,
  },
  {
    path: PATHS.consent,
    loadComponent: () => import('@mantikai/consent/page'),
    title: $localize`:Consent page|Page title in the browser tab:Consent to Personal Data Processing`,
    data: {
      description: $localize`:Consent page|Meta description:Consent to the processing of personal data sent through the Mantikai contact form.`,
    } satisfies SeoRouteData,
  },
  {
    path: PATHS.support,
    loadComponent: () => import('@mantikai/support/page'),
    title: $localize`:Support page|Page title in the browser tab:Support`,
    data: {
      description: $localize`:Support page|Meta description:Answers to common questions about Mantikai and how to contact support.`,
    } satisfies SeoRouteData,
  },
  {
    path: PATHS.deleteAccount,
    loadComponent: () => import('@mantikai/delete-account/page'),
    title: $localize`:Delete account page|Page title in the browser tab:Delete Account`,
    data: {
      description: $localize`:Delete account page|Meta description:How to delete your Mantikai account and what happens to your data.`,
    } satisfies SeoRouteData,
  },
  {
    path: PATHS.contact,
    loadComponent: () => import('@mantikai/contact/page'),
    title: $localize`:Contact page|Page title in the browser tab:Contact Us`,
    data: {
      description: $localize`:Contact page|Meta description:Send a message to the Mantikai team.`,
    } satisfies SeoRouteData,
  },
  {
    path: PATHS.notFound,
    loadComponent: () => import('@mantikai/not-found/page'),
    title: $localize`:Not found page|Page title in the browser tab:Page not found`,
    data: notFound,
  },
  // Must be the last one.
  {
    path: PATHS.any,
    loadComponent: () => import('@mantikai/not-found/page'),
    title: $localize`:Not found page|Page title in the browser tab:Page not found`,
    data: notFound,
  },
]);
