import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lang, pageUrl } from '../core/i18n/language';
import { TRANSLATIONS } from '../core/i18n/translations';
import { TestState } from '../core/test-state';

@Component({
  selector: 'app-clock-scoring',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './clock-scoring.html',
  styleUrl: './clock-scoring.scss',
})
export class ClockScoringPage {
  protected readonly state = inject(TestState);

  readonly lang = input.required<Lang>();

  protected readonly t = computed(() => TRANSLATIONS[this.lang()]);
  protected readonly backUrl = computed(() => pageUrl('wordScoring', this.lang()));
  protected readonly nextUrl = computed(() => pageUrl('results', this.lang()));

  protected setPoints(points: 0 | 2): void {
    this.state.clockPoints.set(points);
  }
}
