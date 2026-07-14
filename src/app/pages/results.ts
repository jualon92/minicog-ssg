import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Lang, LOCALE, pageUrl } from '../core/i18n/language';
import { TRANSLATIONS } from '../core/i18n/translations';
import { TestState } from '../core/test-state';

@Component({
  selector: 'app-results',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class ResultsPage {
  protected readonly state = inject(TestState);
  private readonly router = inject(Router);

  readonly lang = input.required<Lang>();

  protected readonly t = computed(() => TRANSLATIONS[this.lang()]);
  protected readonly clockRated = computed(() => this.state.clockPoints() !== null);
  protected readonly clockScoringUrl = computed(() => pageUrl('clockScoring', this.lang()));

  /** Plain-language reading of the total score, by cut-point band. */
  protected readonly interpretation = computed(() => {
    const total = this.state.totalPoints();
    const bands = this.t().results.interpretationByScore;
    const text = total <= 2 ? bands.belowCut : total === 3 ? bands.borderline : bands.aboveCut;
    return text.replace('{score}', String(total));
  });

  /** Web Share API is mobile-only territory; elsewhere the button copies. */
  protected readonly canShare = signal(false);
  protected readonly shareStatus = signal('');

  constructor() {
    afterNextRender(() => this.canShare.set('share' in navigator));
  }

  protected async share(): Promise<void> {
    const text = this.shareText();
    if (this.canShare()) {
      try {
        await navigator.share({ text });
      } catch {
        // The user dismissed the native share sheet — nothing to report.
      }
      return;
    }
    await navigator.clipboard.writeText(text);
    this.shareStatus.set(this.t().results.copied);
  }

  protected repeat(): void {
    this.state.reset();
    this.router.navigateByUrl(pageUrl('wordRegistration', this.lang()));
  }

  /**
   * Self-contained summary: date, breakdown, word list version and the
   * interpretation + disclaimer, so the score never travels without context.
   */
  private shareText(): string {
    const t = this.t();
    const r = t.results;
    const date = new Date().toLocaleDateString(LOCALE[this.lang()]);
    const version = `${t.wordRegistration.setName} ${this.state.wordSetIndex() + 1}`;
    return [
      `${r.shareTitle} — ${date}`,
      `${r.wordRecall}: ${this.state.wordPoints()} / 3`,
      `${r.clockDrawing}: ${this.state.clockPoints() ?? 0} / 2`,
      `${r.totalScore}: ${this.state.totalPoints()} / 5 (${version})`,
      '',
      this.interpretation(),
      '',
      t.common.disclaimer,
    ].join('\n');
  }
}
