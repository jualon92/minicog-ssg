import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lang, pageUrl } from '../core/i18n/language';
import { TRANSLATIONS } from '../core/i18n/translations';
import { TtsButton } from '../shared/tts-button';

@Component({
  selector: 'app-clock-drawing',
  imports: [RouterLink, TtsButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './clock-drawing.html',
  styleUrl: './clock-drawing.scss',
})
export class ClockDrawingPage {
  readonly lang = input.required<Lang>();

  protected readonly t = computed(() => TRANSLATIONS[this.lang()]);
  protected readonly spokenText = computed(() => {
    const c = this.t().clockDrawing;
    return `${c.request} ${c.drawHour} ${c.clockTime}`;
  });
  protected readonly backUrl = computed(() => pageUrl('wordRegistration', this.lang()));
  protected readonly nextUrl = computed(() => pageUrl('wordScoring', this.lang()));
}
