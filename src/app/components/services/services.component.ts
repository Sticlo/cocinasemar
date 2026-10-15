import { Component, inject } from '@angular/core';
import { TRABAJOS } from '../../data/trabajos';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { LightboxItem, LightboxService } from '../../services/lightbox.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  private readonly lightbox = inject(LightboxService);

  readonly servicios = TRABAJOS.servicios;

  private readonly fotos: LightboxItem[] = this.servicios.map((s) => ({
    imagen: s.imagen,
    titulo: s.titulo,
    descripcion: s.descripcion,
  }));

  verFoto(indice: number): void {
    this.lightbox.abrir(this.fotos, indice);
  }
}
