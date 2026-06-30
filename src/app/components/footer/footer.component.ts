import { Component } from '@angular/core';
import { EMPRESA } from '../../data/empresa';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
}) export class FooterComponent {
  readonly empresa = EMPRESA;
  anio = new Date().getFullYear();
}
