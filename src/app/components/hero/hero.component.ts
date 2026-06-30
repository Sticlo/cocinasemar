import {
  afterNextRender,
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { EMPRESA } from '../../data/empresa';
import { IMAGENES } from '../../data/imagenes';
import { ScrollParallaxDirective } from '../../directives/scroll-parallax.directive';
import { AnimationPreferencesService } from '../../services/animation-preferences.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ScrollParallaxDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly animations = inject(AnimationPreferencesService);
  private slideTimer: ReturnType<typeof setInterval> | null = null;

  readonly empresa = EMPRESA;
  readonly slides = IMAGENES.galeria.map((proyecto) => ({
    imagen: proyecto.imagen,
    titulo: proyecto.titulo,
  }));
  readonly estrellas = [1, 2, 3, 4, 5];
  readonly playing = signal(false);
  readonly indice = signal(0);

  readonly motionReduced = computed(() => {
    this.animations.disabled();
    return this.animations.isMotionReduced();
  });

  readonly heroPlaying = computed(() => this.playing() && !this.motionReduced());

  readonly slideActual = computed(() => this.slides[this.indice()] ?? this.slides[0]);

  constructor() {
    effect(() => {
      this.animations.disabled();
      if (this.motionReduced()) {
        this.detenerRotacion();
        if (this.playing()) {
          this.playing.set(false);
        }
        return;
      }
      if (this.playing()) {
        this.iniciarRotacion();
      }
    });

    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      if (this.animations.isMotionReduced()) {
        return;
      }

      window.setTimeout(() => {
        this.playing.set(true);
        this.iniciarRotacion();
      }, 80);
    });
  }

  ngOnDestroy(): void {
    this.detenerRotacion();
  }

  private iniciarRotacion(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.animations.isMotionReduced()) return;
    if (this.slides.length < 2) return;

    this.detenerRotacion();
    this.slideTimer = setInterval(() => {
      this.indice.update((actual) => (actual + 1) % this.slides.length);
    }, this.animations.getHeroSlideIntervalMs());
  }

  private detenerRotacion(): void {
    if (this.slideTimer) {
      clearInterval(this.slideTimer);
      this.slideTimer = null;
    }
  }
}
