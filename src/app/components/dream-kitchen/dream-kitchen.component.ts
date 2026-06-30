import { Component } from '@angular/core';
import { IMAGENES } from '../../data/imagenes';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { ScrollParallaxDirective } from '../../directives/scroll-parallax.directive';

@Component({
  selector: 'app-dream-kitchen',
  standalone: true,
  imports: [ScrollRevealDirective, ScrollParallaxDirective],
  templateUrl: './dream-kitchen.component.html',
  styleUrl: './dream-kitchen.component.scss',
})
export class DreamKitchenComponent {
  readonly imagenFondo = IMAGENES.dreamBackground;
}
