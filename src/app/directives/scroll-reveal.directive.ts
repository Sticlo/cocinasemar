import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  effect,
  ElementRef,
  Input,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { AnimationPreferencesService } from '../services/animation-preferences.service';

export type ScrollRevealVariant =
  | 'fade-up'
  | 'fade-left'
  | 'fade-right'
  | 'zoom'
  | 'fade'
  | 'rise-blur'
  | 'flip-up'
  | 'dramatic'
  | 'burst'
  | 'swing-left'
  | 'swing-right'
  | 'unfold'
  | 'spotlight'
  | 'drift-up'
  | 'cinema'
  | 'snap';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly animations = inject(AnimationPreferencesService);

  @Input() appScrollReveal: ScrollRevealVariant = 'fade-up';
  @Input() scrollRevealDelay = 0;
  @Input() scrollRevealDuration = 0;
  @Input() scrollRevealRootMargin = '0px 0px -6% 0px';

  private observer?: IntersectionObserver;

  constructor() {
    effect(() => {
      this.animations.disabled();
      this.animations.mobilePerf();
      this.syncMotion();
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private syncMotion(): void {
    const host = this.el.nativeElement;

    if (!isPlatformBrowser(this.platformId)) {
      this.showInstant(host);
      return;
    }

    if (this.animations.isMotionReduced()) {
      this.showInstant(host);
      return;
    }

    if (host.classList.contains('scroll-reveal--visible')) {
      host.classList.toggle('scroll-reveal--mobile-opt', this.animations.isMobilePerf());
      return;
    }

    this.setupObserver(host);
  }

  private showInstant(host: HTMLElement): void {
    this.observer?.disconnect();
    this.observer = undefined;
    host.classList.add('scroll-reveal', 'scroll-reveal--visible');
    host.classList.remove(
      ...Array.from(host.classList).filter((c) => c.startsWith('scroll-reveal--') && c !== 'scroll-reveal--visible')
    );
    host.style.removeProperty('--scroll-reveal-delay');
    host.style.removeProperty('--scroll-reveal-duration');
  }

  private setupObserver(host: HTMLElement): void {
    this.observer?.disconnect();

    host.classList.remove('scroll-reveal--visible');
    host.classList.add('scroll-reveal', `scroll-reveal--${this.appScrollReveal}`);

    if (this.animations.isMobilePerf()) {
      host.classList.add('scroll-reveal--mobile-opt');
    } else {
      host.classList.remove('scroll-reveal--mobile-opt');
    }

    const delay = this.animations.scaleRevealDelay(this.scrollRevealDelay);
    if (delay > 0) {
      host.style.setProperty('--scroll-reveal-delay', `${delay}ms`);
    } else {
      host.style.removeProperty('--scroll-reveal-delay');
    }

    const duration =
      this.scrollRevealDuration > 0
        ? this.animations.scaleRevealDuration(this.scrollRevealDuration)
        : 0;

    if (duration > 0) {
      host.style.setProperty('--scroll-reveal-duration', `${duration}ms`);
    } else {
      host.style.removeProperty('--scroll-reveal-duration');
    }

    const rootMargin = this.animations.isMobilePerf()
      ? '0px 0px 10% 0px'
      : this.scrollRevealRootMargin;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          host.classList.add('scroll-reveal--visible');
          this.observer?.unobserve(host);
          this.observer = undefined;
        });
      },
      { threshold: 0.05, rootMargin }
    );

    this.observer.observe(host);
    this.revealIfAlreadyVisible(host);
  }

  private revealIfAlreadyVisible(host: HTMLElement): void {
    requestAnimationFrame(() => {
      if (host.classList.contains('scroll-reveal--visible')) return;

      const rect = host.getBoundingClientRect();
      const viewport = window.innerHeight;
      if (rect.top < viewport * 0.95 && rect.bottom > viewport * 0.05) {
        host.classList.add('scroll-reveal--visible');
        this.observer?.unobserve(host);
        this.observer = undefined;
      }
    });
  }
}
