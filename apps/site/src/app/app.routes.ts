import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', loadComponent: () => import('./pages/home/home-page').then((m) => m.HomePage) },
  { path: 'privacy', loadComponent: () => import('./pages/privacy/privacy-page').then((m) => m.PrivacyPage) },
  { path: 'terms', loadComponent: () => import('./pages/terms/terms-page').then((m) => m.TermsPage) },
  { path: 'consent', loadComponent: () => import('./pages/consent/consent-page').then((m) => m.ConsentPage) },
  { path: 'support', loadComponent: () => import('./pages/support/support-page').then((m) => m.SupportPage) },
  {
    path: 'delete-account',
    loadComponent: () => import('./pages/delete-account/delete-account-page').then((m) => m.DeleteAccountPage),
  },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact-page').then((m) => m.ContactPage) },
  { path: '404', loadComponent: () => import('./pages/not-found/not-found-page').then((m) => m.NotFoundPage) },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found-page').then((m) => m.NotFoundPage) },
];
