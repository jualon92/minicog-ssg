import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lang, pageUrl } from '../core/i18n/language';
import { TRANSLATIONS } from '../core/i18n/translations';
import { TestState } from '../core/test-state';
import { TtsButton } from '../shared/tts-button';

@Component({
  selector: 'app-word-registration',
  imports: [RouterLink, TtsButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './word-registration.html',
  styleUrl: './word-registration.scss',
})
export class WordRegistrationPage {
  protected readonly state = inject(TestState);

  readonly lang = input.required<Lang>();

  protected readonly t = computed(() => TRANSLATIONS[this.lang()]);
  protected readonly words = computed(
    () => this.t().wordRegistration.wordSets[this.state.wordSetIndex()],
  );
  protected readonly spokenText = computed(
    () => `${this.t().wordRegistration.pleaseListen} ${this.words().join(', ')}`,
  );
  protected readonly backUrl = computed(() => pageUrl('beforeWeStart', this.lang()));
  protected readonly nextUrl = computed(() => pageUrl('clockDrawing', this.lang()));

  protected chooseSet(index: number): void {
    this.state.wordSetIndex.set(index);
  }
}
