import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  readonly isDark = signal(false);

  constructor() {
    this.setDarkMode(globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false);
  }

  toggle(): void {
    this.setDarkMode(!this.isDark());
  }

  private setDarkMode(isDark: boolean): void {
    this.isDark.set(isDark);
    this.document.documentElement.classList.toggle('dark', isDark);
  }
}
