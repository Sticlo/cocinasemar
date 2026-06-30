import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type ScrollListener = () => void;

@Injectable({ providedIn: 'root' })
export class ScrollMotionService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly listeners = new Set<ScrollListener>();
  private ticking = false;
  private initialized = false;
  private viewportHeight = 0;

  register(listener: ScrollListener): () => void {
    this.listeners.add(listener);
    this.init();
    this.scheduleTick(true);
    return () => this.listeners.delete(listener);
  }

  getViewportHeight(): number {
    if (!this.viewportHeight && isPlatformBrowser(this.platformId)) {
      this.viewportHeight = window.innerHeight;
    }
    return this.viewportHeight;
  }

  isNearViewport(rect: DOMRect, margin = 120): boolean {
    const viewport = this.getViewportHeight();
    return rect.bottom >= -margin && rect.top <= viewport + margin;
  }

  private init(): void {
    if (this.initialized || !isPlatformBrowser(this.platformId)) return;
    this.initialized = true;

    const onScroll = () => this.scheduleTick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }

  private scheduleTick(immediate = false): void {
    if (immediate) {
      this.runTick();
      return;
    }

    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => this.runTick());
  }

  private runTick(): void {
    this.ticking = false;
    if (!isPlatformBrowser(this.platformId)) return;

    this.viewportHeight = window.innerHeight;
    this.listeners.forEach((listener) => listener());
  }
}
