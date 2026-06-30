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
  selector: '[appScrollFloat]',
  standalone: true,
})
export class ScrollFloatDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly scrollMotion = inject(ScrollMotionService);
  private readonly animations = inject(AnimationPreferencesService);

  @Input() appScrollFloat = 42;

  private unregister?: () => void;
  private lastOffset = Number.NaN;

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
    this.lastOffset = Number.NaN;

    const host = this.el.nativeElement;

    if (!isPlatformBrowser(this.platformId) || !this.animations.isParallaxEnabled()) {
      host.classList.remove('scroll-float');
      host.style.removeProperty('--scroll-float-y');
      host.style.removeProperty('--scroll-float-opacity');
      host.style.removeProperty('--scroll-float-blur');
      return;
    }

    host.classList.add('scroll-float');
    this.unregister = this.scrollMotion.register(() => this.applyFloat());
  }

  private applyFloat(): void {
    const host = this.el.nativeElement;
    const rect = host.getBoundingClientRect();

    if (!this.scrollMotion.isNearViewport(rect)) {
      return;
    }

    const viewport = this.scrollMotion.getViewportHeight();
    const elementCenter = rect.top + rect.height * 0.5;
    const viewportCenter = viewport * 0.5;
    const maxDistance = viewport * 0.55 + rect.height * 0.5;
    const distance = Math.abs(elementCenter - viewportCenter);
    const progress = 1 - Math.min(1, distance / maxDistance);
    const offset = (1 - progress) * this.appScrollFloat;

    if (!Number.isNaN(this.lastOffset) && Math.abs(offset - this.lastOffset) < 0.5) {
      return;
    }

    this.lastOffset = offset;
    const opacity = 0.35 + progress * 0.65;

    host.style.setProperty('--scroll-float-y', `${offset.toFixed(1)}px`);
    host.style.setProperty('--scroll-float-opacity', opacity.toFixed(3));
    host.style.setProperty('--scroll-float-blur', `${((1 - progress) * 8).toFixed(1)}px`);
  }
}
