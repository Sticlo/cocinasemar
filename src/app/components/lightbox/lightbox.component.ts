import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  PLATFORM_ID,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { LightboxService } from '../../services/lightbox.service';

const SWIPE_MIN_PX = 50;

@Component({
  selector: 'app-lightbox',
  standalone: true,
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.scss',
})
export class LightboxComponent {
  readonly lightbox = inject(LightboxService);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly closeButton = viewChild<ElementRef<HTMLButtonElement>>('closeButton');
  private readonly thumbs = viewChild<ElementRef<HTMLElement>>('thumbs');

  private touchStartX: number | null = null;
  private touchStartY = 0;
  private focoPrevio: HTMLElement | null = null;

  constructor() {
    effect(() => {
      const abierto = this.lightbox.abierto();
      if (!isPlatformBrowser(this.platformId)) return;

      this.document.body.classList.toggle('lightbox-open', abierto);

      if (abierto) {
        this.focoPrevio = this.document.activeElement as HTMLElement | null;
        queueMicrotask(() => this.closeButton()?.nativeElement.focus());
      } else {
        this.focoPrevio?.focus?.();
        this.focoPrevio = null;
      }
    });

    effect(() => {
      const indice = this.lightbox.indice();
      if (!this.lightbox.abierto() || !isPlatformBrowser(this.platformId)) return;

      queueMicrotask(() => {
        const thumb = this.thumbs()?.nativeElement.children[indice] as HTMLElement | undefined;
        thumb?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      });
    });
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.lightbox.abierto()) return;

    switch (event.key) {
      case 'Escape':
        this.lightbox.cerrar();
        break;
      case 'ArrowRight':
        this.lightbox.siguiente();
        break;
      case 'ArrowLeft':
        this.lightbox.anterior();
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.lightbox.cerrar();
    }
  }

  onTouchStart(event: TouchEvent): void {
    const touch = event.touches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
  }

  onTouchEnd(event: TouchEvent): void {
    if (this.touchStartX === null) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - this.touchStartX;
    const dy = touch.clientY - this.touchStartY;
    this.touchStartX = null;

    if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy)) return;

    if (dx < 0) {
      this.lightbox.siguiente();
    } else {
      this.lightbox.anterior();
    }
  }
}
