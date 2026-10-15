import { Component, inject } from '@angular/core';
import { IMAGENES } from '../../data/imagenes';
import { TRABAJOS } from '../../data/trabajos';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { LightboxItem, LightboxService } from '../../services/lightbox.service';

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './benefits.component.html',
  styleUrl: './benefits.component.scss',
})
export class BenefitsComponent {
  private readonly lightbox = inject(LightboxService);

  readonly imagenDestacada = IMAGENES.destacados[1].imagen;
  readonly beneficios = TRABAJOS.beneficios;

  private readonly fotos: LightboxItem[] = this.beneficios.map((b) => ({
    imagen: b.imagen,
    titulo: b.titulo,
    descripcion: b.texto,
  }));

  verFoto(indice: number): void {
    this.lightbox.abrir(this.fotos, indice);
  }
}
