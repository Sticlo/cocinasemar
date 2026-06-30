import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, OnDestroy, PLATFORM_ID, signal } from '@angular/core';
import { EMPRESA } from '../../data/empresa';
import { ScrollMotionService } from '../../services/scroll-motion.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly scrollMotion = inject(ScrollMotionService);
  private unregisterScroll?: () => void;

  readonly theme = inject(ThemeService);
  readonly empresa = EMPRESA;

  menuAbierto = signal(false);
  scrolled = signal(false);
  scrollProgress = signal(0);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.unregisterScroll = this.scrollMotion.register(() => this.updateScrollState());
    }
  }

  toggleMenu() {
    this.menuAbierto.update((v) => {
      const next = !v;
      if (isPlatformBrowser(this.platformId)) {
        document.body.classList.toggle('nav-open', next);
      }
      return next;
    });
  }

  cerrarMenu() {
    this.menuAbierto.set(false);
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('nav-open');
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.cerrarMenu();
  }

  ngOnDestroy(): void {
    this.unregisterScroll?.();
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('nav-open');
    }
  }

  private updateScrollState(): void {
    const y = window.scrollY;
    const scrolled = y > 40;

    if (this.scrolled() !== scrolled) {
      this.scrolled.set(scrolled);
    }

    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const progress = max > 0 ? y / max : 0;

    if (Math.abs(this.scrollProgress() - progress) > 0.002) {
      this.scrollProgress.set(progress);
    }
  }
}
