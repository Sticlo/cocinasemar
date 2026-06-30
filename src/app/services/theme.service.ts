import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

const STORAGE_KEY = 'emar-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  readonly darkMode = signal(false);

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;

    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved === 'dark' || (saved !== 'light' && prefersDark);

    this.applyTheme(isDark, false);
  }

  toggle(): void {
    this.applyTheme(!this.darkMode());
  }

  private applyTheme(dark: boolean, persist = true): void {
    this.darkMode.set(dark);

    if (!isPlatformBrowser(this.platformId)) return;

    document.documentElement.classList.toggle('dark-theme', dark);

    if (persist) {
      localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
    }
  }
}
