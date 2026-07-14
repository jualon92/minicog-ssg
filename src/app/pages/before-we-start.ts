import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lang, pageUrl } from '../core/i18n/language';
import { TRANSLATIONS } from '../core/i18n/translations';

@Component({
  selector: 'app-before-we-start',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './before-we-start.html',
  styleUrl: './before-we-start.scss',
})
export class BeforeWeStartPage {
  readonly lang = input.required<Lang>();

  protected readonly t = computed(() => TRANSLATIONS[this.lang()]);
  protected readonly backUrl = computed(() => pageUrl('home', this.lang()));
  protected readonly nextUrl = computed(() => pageUrl('wordRegistration', this.lang()));
}
