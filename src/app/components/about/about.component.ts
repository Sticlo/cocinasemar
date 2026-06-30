import { Component } from '@angular/core';
import { EMPRESA } from '../../data/empresa';
import { IMAGENES } from '../../data/imagenes';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { ScrollParallaxDirective } from '../../directives/scroll-parallax.directive';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ScrollRevealDirective, ScrollParallaxDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly empresa = EMPRESA;
  readonly imagenAbout = IMAGENES.about;

  valores = [
    {
      titulo: 'Calidad sin compromisos',
      texto: 'Materiales resistentes y acabados impecables en cada proyecto.',
    },
    {
      titulo: 'Atención personalizada',
      texto: 'Te asesoramos desde la idea hasta la instalación en tu hogar.',
    },
    {
      titulo: 'Confianza comprobada',
      texto: `${EMPRESA.calificacion} estrellas en Google con ${EMPRESA.opiniones} opiniones de clientes satisfechos.`,
    },
  ];
}
