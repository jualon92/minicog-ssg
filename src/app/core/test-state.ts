import { computed, Injectable, signal } from '@angular/core';
import { TRANSLATIONS } from './i18n/translations';

const WORD_SET_COUNT = TRANSLATIONS.es.wordRegistration.wordSets.length;

/**
 * In-memory state of the current test run (signals only, no persistence).
 * Word recall: 0-3 points. Clock drawing: 0 or 2 points. Total: 0-5.
 */
@Injectable({ providedIn: 'root' })
export class TestState {
  /** Index of the chosen word set (0-2). Deterministic default keeps prerender stable. */
  readonly wordSetIndex = signal(0);
  readonly wordPoints = signal(0);
  /** null until the tester rates the clock, to avoid pre-selecting an answer. */
  readonly clockPoints = signal<0 | 2 | null>(null);
  readonly totalPoints = computed(() => this.wordPoints() + (this.clockPoints() ?? 0));

  addWordPoint(delta: 1 | -1): void {
    this.wordPoints.update((points) => Math.min(3, Math.max(0, points + delta)));
  }

  /**
   * Starts a fresh run, rotating to the next word set: the protocol
   * recommends an alternative list for repeated administrations.
   */
  reset(): void {
    this.wordSetIndex.update((index) => (index + 1) % WORD_SET_COUNT);
    this.wordPoints.set(0);
    this.clockPoints.set(null);
  }
}
