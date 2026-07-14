import { Routes } from '@angular/router';
import { Lang, PAGE_PATHS } from './core/i18n/language';

/** Pages of one language subtree; slugs come from PAGE_PATHS per language. */
function langRoutes(lang: Lang): Routes {
  return [
    {
      path: PAGE_PATHS.home[lang],
      pathMatch: 'full',
      loadComponent: () => import('./pages/home').then((m) => m.HomePage),
      data: { lang, page: 'home' },
    },
    {
      path: PAGE_PATHS.beforeWeStart[lang],
      loadComponent: () => import('./pages/before-we-start').then((m) => m.BeforeWeStartPage),
      data: { lang, page: 'beforeWeStart' },
    },
    {
      path: PAGE_PATHS.wordRegistration[lang],
      loadComponent: () => import('./pages/word-registration').then((m) => m.WordRegistrationPage),
      data: { lang, page: 'wordRegistration' },
    },
    {
      path: PAGE_PATHS.clockDrawing[lang],
      loadComponent: () => import('./pages/clock-drawing').then((m) => m.ClockDrawingPage),
      data: { lang, page: 'clockDrawing' },
    },
    {
      path: PAGE_PATHS.wordScoring[lang],
      loadComponent: () => import('./pages/word-scoring').then((m) => m.WordScoringPage),
      data: { lang, page: 'wordScoring' },
    },
    {
      path: PAGE_PATHS.clockScoring[lang],
      loadComponent: () => import('./pages/clock-scoring').then((m) => m.ClockScoringPage),
      data: { lang, page: 'clockScoring' },
    },
    {
      path: PAGE_PATHS.results[lang],
      loadComponent: () => import('./pages/results').then((m) => m.ResultsPage),
      data: { lang, page: 'results' },
    },
  ];
}

export const routes: Routes = [
  { path: 'es', children: langRoutes('es') },
  { path: 'en', children: langRoutes('en') },
  { path: '', redirectTo: 'es', pathMatch: 'full' },
  { path: '**', redirectTo: 'es' },
];
