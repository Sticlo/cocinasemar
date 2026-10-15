import { Component, computed, inject, signal } from '@angular/core';
import { IMAGENES } from '../../data/imagenes';
import { ScrollRevealDirective, ScrollRevealVariant } from '../../directives/scroll-reveal.directive';
import { ScrollParallaxDirective } from '../../directives/scroll-parallax.directive';
import { LightboxItem, LightboxService } from '../../services/lightbox.service';

interface Proyecto {
  imagen: string;
  titulo: string;
  estilo: string;
}

const PREVIEW_COUNT = 6;

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [ScrollRevealDirective, ScrollParallaxDirective],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  private readonly lightbox = inject(LightboxService);

  readonly proyectos: Proyecto[] = [...IMAGENES.galeria];
  readonly expandido = signal(false);

  readonly proyectosVisibles = computed(() =>
    this.expandido() ? this.proyectos : this.proyectos.slice(0, PREVIEW_COUNT)
  );

  readonly restantes = this.proyectos.length - PREVIEW_COUNT;

  private readonly fotos: LightboxItem[] = this.proyectos.map((p) => ({
    imagen: p.imagen,
    titulo: p.titulo,
    descripcion: p.estilo,
  }));

  verFoto(indice: number): void {
    this.lightbox.abrir(this.fotos, indice);
  }

  alternarPortafolio(): void {
    this.expandido.update((value) => !value);
  }

  variantGaleria(index: number): ScrollRevealVariant {
    const variantes: ScrollRevealVariant[] = ['zoom', 'swing-left', 'swing-right'];
    return variantes[index % variantes.length];
  }
}
