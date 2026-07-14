import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { Lang } from '../core/i18n/language';
import { TRANSLATIONS } from '../core/i18n/translations';
import { TtsService } from '../core/tts';

let nextId = 0;

/**
 * "Read aloud" toggle for a block of text, backed by the native
 * Web Speech API. Renders only after hydration (the feature is
 * browser-only), so prerendered HTML stays consistent.
 */
@Component({
  selector: 'app-tts-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tts-button.html',
  styleUrl: './tts-button.scss',
})
export class TtsButton {
  protected readonly tts = inject(TtsService);

  readonly text = input.required<string>();
  readonly lang = input.required<Lang>();

  protected readonly ready = signal(false);
  private readonly id = `tts-${nextId++}`;
  protected readonly pressed = computed(() => this.tts.speakingId() === this.id);
  protected readonly labels = computed(() => TRANSLATIONS[this.lang()].tts);

  constructor() {
    afterNextRender(() => this.ready.set(true));
  }

  protected toggle(): void {
    this.tts.toggle(this.id, this.text(), this.lang());
  }
}
