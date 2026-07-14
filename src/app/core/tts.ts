import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Lang, LOCALE } from './i18n/language';

/**
 * Text-to-speech over the native Web Speech API (speechSynthesis).
 * Platform-guarded so prerendering never touches browser globals.
 */
@Injectable({ providedIn: 'root' })
export class TtsService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** Id of the block currently being spoken, or null. */
  readonly speakingId = signal<string | null>(null);

  get available(): boolean {
    return this.isBrowser && 'speechSynthesis' in window;
  }

  toggle(id: string, text: string, lang: Lang): void {
    if (this.speakingId() === id) {
      this.stop();
    } else {
      this.speak(id, text, lang);
    }
  }

  speak(id: string, text: string, lang: Lang): void {
    if (!this.available) {
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LOCALE[lang];
    utterance.rate = 0.9;
    utterance.onend = () => this.speakingId.set(null);
    utterance.onerror = () => this.speakingId.set(null);
    this.speakingId.set(id);
    window.speechSynthesis.speak(utterance);
  }

  stop(): void {
    if (this.available) {
      window.speechSynthesis.cancel();
    }
    this.speakingId.set(null);
  }
}
