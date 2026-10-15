import { Component, inject } from '@angular/core';
import { IMAGENES } from '../../data/imagenes';
import { ScrollRevealDirective, ScrollRevealVariant } from '../../directives/scroll-reveal.directive';
import { ScrollParallaxDirective } from '../../directives/scroll-parallax.directive';
import { LightboxItem, LightboxService } from '../../services/lightbox.service';

@Component({
  selector: 'app-work-showcase',
  standalone: true,
  imports: [ScrollRevealDirective, ScrollParallaxDirective],
  templateUrl: './work-showcase.component.html',
  styleUrl: './work-showcase.component.scss',
})
export class WorkShowcaseComponent {
  private readonly lightbox = inject(LightboxService);

  readonly proyectos = [...IMAGENES.destacados];

  private readonly fotos: LightboxItem[] = this.proyectos.map((p) => ({
    imagen: p.imagen,
    titulo: p.titulo,
    descripcion: p.estilo,
  }));

  verFoto(indice: number): void {
    this.lightbox.abrir(this.fotos, indice);
  }

  variant(index: number): ScrollRevealVariant {
    const variantes: ScrollRevealVariant[] = ['swing-left', 'zoom', 'swing-right'];
    return variantes[index % variantes.length];
  }
}
