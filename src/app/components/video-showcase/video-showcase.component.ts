import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { EMPRESA } from '../../data/empresa';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-video-showcase',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './video-showcase.component.html',
  styleUrl: './video-showcase.component.scss',
})
export class VideoShowcaseComponent {
  readonly empresa = EMPRESA;
  readonly video = {
    src: '/videos/trabajo-emar.mp4',
    poster: '/videos/trabajo-emar-poster.jpg',
  };

  readonly reproduciendo = signal(false);

  private readonly player = viewChild.required<ElementRef<HTMLVideoElement>>('player');

  reproducir(): void {
    const video = this.player().nativeElement;
    this.reproduciendo.set(true);
    video.play().catch(() => this.reproduciendo.set(false));
  }
}
