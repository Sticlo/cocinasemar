import { Component } from '@angular/core';
import { IMAGENES } from '../../data/imagenes';
import { ScrollRevealDirective, ScrollRevealVariant } from '../../directives/scroll-reveal.directive';
import { ScrollParallaxDirective } from '../../directives/scroll-parallax.directive';

@Component({
  selector: 'app-work-showcase',
  standalone: true,
  imports: [ScrollRevealDirective, ScrollParallaxDirective],
  templateUrl: './work-showcase.component.html',
  styleUrl: './work-showcase.component.scss',
})
export class WorkShowcaseComponent {
  readonly proyectos = [...IMAGENES.destacados];

  variant(index: number): ScrollRevealVariant {
    const variantes: ScrollRevealVariant[] = ['swing-left', 'zoom', 'swing-right'];
    return variantes[index % variantes.length];
  }
}
