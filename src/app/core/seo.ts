import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Lang, LANGS, LOCALE, PageKey, pageUrl, SITE_URL } from './i18n/language';
import { TRANSLATIONS } from './i18n/translations';

const JSON_LD_ID = 'ld-json';

/**
 * Applies per-route SEO: title, description, canonical, hreflang alternates,
 * Open Graph tags, <html lang> and JSON-LD. Runs on every navigation, so the
 * prerendered HTML of each route ships with its own correct head.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly doc = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  apply(page: PageKey, lang: Lang): void {
    const t = TRANSLATIONS[lang];
    const seo = t.seo[page];
    const url = SITE_URL + pageUrl(page, lang);

    this.doc.documentElement.lang = lang;
    this.title.setTitle(seo.title);

    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:site_name', content: t.common.appName });
    this.meta.updateTag({ property: 'og:locale', content: LOCALE[lang].replace('-', '_') });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: seo.title });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });

    this.setLink('canonical', url);
    for (const l of LANGS) {
      this.setLink('alternate', SITE_URL + pageUrl(page, l), l);
    }
    this.setLink('alternate', SITE_URL + pageUrl(page, 'es'), 'x-default');

    if (page === 'home') {
      this.setJsonLd(this.homeSchema(lang, url));
    } else {
      this.removeJsonLd();
    }
  }

  private setLink(rel: string, href: string, hreflang?: string): void {
    const selector = hreflang
      ? `link[rel="${rel}"][hreflang="${hreflang}"]`
      : `link[rel="${rel}"]`;
    let link = this.doc.head.querySelector<HTMLLinkElement>(selector);
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', rel);
      if (hreflang) {
        link.setAttribute('hreflang', hreflang);
      }
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  private setJsonLd(schema: object): void {
    let script = this.doc.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
    if (!script) {
      script = this.doc.createElement('script');
      script.id = JSON_LD_ID;
      script.type = 'application/ld+json';
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }

  private removeJsonLd(): void {
    this.doc.getElementById(JSON_LD_ID)?.remove();
  }

  /** MedicalWebPage + FAQPage for the home/FAQ page. */
  private homeSchema(lang: Lang, url: string): object {
    const t = TRANSLATIONS[lang];
    const faq = [t.home.whatIsApp, t.home.whatIsMiniCog, t.home.whoIsThisFor];
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'MedicalWebPage',
          '@id': url,
          url,
          name: t.seo.home.title,
          description: t.seo.home.description,
          inLanguage: lang,
          about: {
            '@type': 'MedicalTest',
            name: 'Mini-Cog',
            usedToDiagnose: {
              '@type': 'MedicalCondition',
              name: lang === 'es' ? 'Deterioro cognitivo' : 'Cognitive impairment',
            },
          },
        },
        {
          '@type': 'FAQPage',
          inLanguage: lang,
          mainEntity: faq.map((item) => ({
            '@type': 'Question',
            name: item.title,
            acceptedAnswer: { '@type': 'Answer', text: item.description },
          })),
        },
      ],
    };
  }
}
