import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lang, pageUrl } from '../core/i18n/language';
import { TRANSLATIONS } from '../core/i18n/translations';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomePage {
  readonly lang = input.required<Lang>();

  protected readonly t = computed(() => TRANSLATIONS[this.lang()]);
  protected readonly startUrl = computed(() => pageUrl('beforeWeStart', this.lang()));
}
