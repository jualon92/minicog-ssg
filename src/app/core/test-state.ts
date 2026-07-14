import { computed, Injectable, signal } from '@angular/core';

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

  reset(): void {
    this.wordSetIndex.set(0);
    this.wordPoints.set(0);
    this.clockPoints.set(null);
  }
}
