import { Component, signal } from '@angular/core';
import { FAQ } from '../../data/faq';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  readonly preguntas = FAQ;
  readonly abierta = signal<number | null>(0);

  alternar(index: number): void {
    this.abierta.update((actual) => (actual === index ? null : index));
  }
}
