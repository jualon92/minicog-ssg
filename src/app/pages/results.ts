import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Lang, pageUrl } from '../core/i18n/language';
import { TRANSLATIONS } from '../core/i18n/translations';
import { TestState } from '../core/test-state';

@Component({
  selector: 'app-results',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class ResultsPage {
  protected readonly state = inject(TestState);
  private readonly router = inject(Router);

  readonly lang = input.required<Lang>();

  protected readonly t = computed(() => TRANSLATIONS[this.lang()]);
  protected readonly clockPoints = computed(() => this.state.clockPoints() ?? 0);

  protected repeat(): void {
    this.state.reset();
    this.router.navigateByUrl(pageUrl('wordRegistration', this.lang()));
  }
}
