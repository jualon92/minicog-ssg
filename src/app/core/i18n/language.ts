export type Lang = 'es' | 'en';

export const LANGS: readonly Lang[] = ['es', 'en'] as const;

export type PageKey =
  | 'home'
  | 'beforeWeStart'
  | 'wordRegistration'
  | 'clockDrawing'
  | 'wordScoring'
  | 'clockScoring'
  | 'results';

/** URL slugs per page and language. Empty string = language root. */
export const PAGE_PATHS: Record<PageKey, Record<Lang, string>> = {
  home: { es: '', en: '' },
  beforeWeStart: { es: 'antes-de-empezar', en: 'before-we-start' },
  wordRegistration: { es: 'registro-tres-palabras', en: 'three-word-registration' },
  clockDrawing: { es: 'dibujo-del-reloj', en: 'clock-drawing' },
  wordScoring: { es: 'puntaje', en: 'scoring' },
  clockScoring: { es: 'puntaje-reloj', en: 'clock-score' },
  results: { es: 'resultados', en: 'results' },
};

/** Absolute in-app URL for a page in a given language, e.g. /es/dibujo-del-reloj */
export function pageUrl(page: PageKey, lang: Lang): string {
  const slug = PAGE_PATHS[page][lang];
  return slug ? `/${lang}/${slug}` : `/${lang}`;
}

export function otherLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}

export const SITE_URL = 'https://mini-cog-test.web.app';

export const LOCALE: Record<Lang, string> = { es: 'es-ES', en: 'en-US' };
