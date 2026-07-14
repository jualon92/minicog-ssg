import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lang, pageUrl } from '../core/i18n/language';
import { TRANSLATIONS } from '../core/i18n/translations';
import { TestState } from '../core/test-state';

@Component({
  selector: 'app-word-scoring',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './word-scoring.html',
  styleUrl: './word-scoring.scss',
})
export class WordScoringPage {
  protected readonly state = inject(TestState);

  readonly lang = input.required<Lang>();

  protected readonly t = computed(() => TRANSLATIONS[this.lang()]);
  protected readonly wordSetLabel = computed(() => {
    const w = this.t().wordRegistration;
    const index = this.state.wordSetIndex();
    return `${w.setName} ${index + 1}: ${w.wordSets[index].join(', ')}`;
  });
  protected readonly backUrl = computed(() => pageUrl('clockDrawing', this.lang()));
  protected readonly nextUrl = computed(() => pageUrl('clockScoring', this.lang()));

  protected add(delta: 1 | -1): void {
    this.state.addWordPoint(delta);
  }
}
