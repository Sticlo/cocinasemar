import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

const STORAGE_KEY = 'emar-animations';
const MOBILE_PERF_QUERY = '(max-width: 900px), (hover: none) and (pointer: coarse)';

@Injectable({ providedIn: 'root' })
export class AnimationPreferencesService {
  private readonly platformId = inject(PLATFORM_ID);

  /** Animaciones desactivadas manualmente (dispositivos lentos). */
  readonly disabled = signal(false);
  /** Dispositivo móvil: animaciones más cortas y parallax suave. */
  readonly mobilePerf = signal(false);

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;

    const isMobile = window.matchMedia(MOBILE_PERF_QUERY).matches;
    this.mobilePerf.set(isMobile);

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'off') {
      this.applyDisabled(true, false);
    } else {
      document.documentElement.classList.toggle('mobile-perf', isMobile);
    }

    this.initMobilePerf();
  }

  isMotionReduced(): boolean {
    if (!isPlatformBrowser(this.platformId)) return true;
    if (this.disabled()) return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  isMobilePerf(): boolean {
    return isPlatformBrowser(this.platformId) && this.mobilePerf() && !this.disabled();
  }

  isParallaxEnabled(): boolean {
    return !this.isMotionReduced();
  }

  getParallaxScale(): number {
    return this.isMobilePerf() ? 0.42 : 1;
  }

  scaleRevealDelay(delay: number): number {
    if (!this.isMobilePerf()) return delay;
    return Math.round(delay * 0.55);
  }

  scaleRevealDuration(duration: number): number {
    if (!this.isMobilePerf() || duration <= 0) return duration;
    return Math.round(duration * 0.82);
  }

  getHeroSlideIntervalMs(): number {
    return this.isMobilePerf() ? 7000 : 5500;
  }

  toggle(): void {
    this.applyDisabled(!this.disabled());
  }

  private initMobilePerf(): void {
    const media = window.matchMedia(MOBILE_PERF_QUERY);
    const sync = () => this.syncMobilePerf(media.matches);
    sync();
    media.addEventListener('change', sync);
  }

  private syncMobilePerf(matches: boolean): void {
    this.mobilePerf.set(matches);
    document.documentElement.classList.toggle('mobile-perf', matches && !this.disabled());
  }

  private applyDisabled(off: boolean, persist = true): void {
    this.disabled.set(off);

    if (!isPlatformBrowser(this.platformId)) return;

    document.documentElement.classList.toggle('animations-off', off);
    document.documentElement.classList.toggle(
      'mobile-perf',
      !off && window.matchMedia(MOBILE_PERF_QUERY).matches
    );

    if (persist) {
      localStorage.setItem(STORAGE_KEY, off ? 'off' : 'on');
    }

    if (off) {
      document.querySelectorAll('.scroll-reveal').forEach((el) => {
        el.classList.add('scroll-reveal--visible');
      });
      document.querySelectorAll('.scroll-parallax').forEach((el) => {
        (el as HTMLElement).style.transform = '';
      });
    }
  }
}
