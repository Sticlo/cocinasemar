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
import { ScrollMotionService } from '../services/scroll-motion.service';

@Directive({
  selector: '[appScrollParallax]',
  standalone: true,
})
export class ScrollParallaxDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly scrollMotion = inject(ScrollMotionService);
  private readonly animations = inject(AnimationPreferencesService);

  @Input() appScrollParallax = 0.14;

  private unregister?: () => void;
  private lastMove = Number.NaN;

  constructor() {
    effect(() => {
      this.animations.disabled();
      this.animations.mobilePerf();
      this.syncMotion();
    });
  }

  ngOnDestroy(): void {
    this.unregister?.();
  }

  private syncMotion(): void {
    this.unregister?.();
    this.unregister = undefined;
    this.lastMove = Number.NaN;

    const host = this.el.nativeElement;

    if (!isPlatformBrowser(this.platformId) || !this.animations.isParallaxEnabled()) {
      host.classList.remove('scroll-parallax');
      host.style.transform = '';
      return;
    }

    host.classList.add('scroll-parallax');
    this.unregister = this.scrollMotion.register(() => this.applyParallax());
  }

  private applyParallax(): void {
    const host = this.el.nativeElement;
    const rect = host.getBoundingClientRect();

    if (!this.scrollMotion.isNearViewport(rect)) {
      return;
    }

    const viewport = this.scrollMotion.getViewportHeight();
    const centerOffset = rect.top + rect.height * 0.5 - viewport * 0.5;
    const move = centerOffset * this.appScrollParallax * this.animations.getParallaxScale() * -1;

    if (!Number.isNaN(this.lastMove) && Math.abs(move - this.lastMove) < 0.5) {
      return;
    }

    this.lastMove = move;
    host.style.transform = `translate3d(0, ${move.toFixed(1)}px, 0)`;
  }
}
