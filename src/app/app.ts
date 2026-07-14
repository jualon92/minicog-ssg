import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DOCUMENT,
  inject,
  Injector,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Lang, otherLang, PageKey, pageUrl } from './core/i18n/language';
import { TRANSLATIONS } from './core/i18n/translations';
import { SeoService } from './core/seo';
import { TtsService } from './core/tts';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private readonly tts = inject(TtsService);
  private readonly doc = inject(DOCUMENT);
  private readonly injector = inject(Injector);

  protected readonly lang = signal<Lang>('es');
  protected readonly page = signal<PageKey>('home');
  protected readonly t = computed(() => TRANSLATIONS[this.lang()]);
  protected readonly homeUrl = computed(() => pageUrl('home', this.lang()));
  protected readonly altLang = computed(() => otherLang(this.lang()));
  protected readonly altUrl = computed(() => pageUrl(this.page(), this.altLang()));

  private firstNavigation = true;

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationStart) {
        // A11y: any ongoing speech stops when the user leaves the step.
        this.tts.stop();
      } else if (event instanceof NavigationEnd) {
        this.onNavigated();
      }
    });
  }

  protected skipToMain(event: Event): void {
    event.preventDefault();
    this.doc.getElementById('main-content')?.focus();
  }

  private onNavigated(): void {
    let route = this.router.routerState.snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const lang = (route.data['lang'] as Lang | undefined) ?? 'es';
    const page = (route.data['page'] as PageKey | undefined) ?? 'home';
    this.lang.set(lang);
    this.page.set(page);
    this.seo.apply(page, lang);

    // On the initial load the browser handles focus; only manage it on
    // subsequent in-app navigations (move focus to the new h1, which
    // also makes screen readers announce the new page).
    if (this.firstNavigation) {
      this.firstNavigation = false;
      return;
    }
    afterNextRender(
      () => this.doc.querySelector<HTMLHeadingElement>('main h1')?.focus(),
      { injector: this.injector },
    );
  }
}
