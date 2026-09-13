import { Component } from '@angular/core';
import { IMAGENES } from '../../data/imagenes';
import { TRABAJOS } from '../../data/trabajos';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './benefits.component.html',
  styleUrl: './benefits.component.scss',
})
export class BenefitsComponent {
  readonly imagenDestacada = IMAGENES.destacados[1].imagen;
  readonly beneficios = TRABAJOS.beneficios;
}
