import { Component } from '@angular/core';
import { IMAGENES } from '../../data/imagenes';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

type BeneficioIcon =
  | 'time'
  | 'peace'
  | 'investment'
  | 'advisor'
  | 'design'
  | 'elegance'
  | 'materials'
  | 'support'
  | 'function';

interface Beneficio {
  icon: BeneficioIcon;
  titulo: string;
  texto: string;
}

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './benefits.component.html',
  styleUrl: './benefits.component.scss',
})
export class BenefitsComponent {
  readonly imagenDestacada = IMAGENES.destacados[1].imagen;

  readonly beneficios: Beneficio[] = [
    {
      icon: 'time',
      titulo: 'Entrega puntual',
      texto: 'Cumplimiento en los tiempos de entrega acordados para tu proyecto.',
    },
    {
      icon: 'peace',
      titulo: 'Compra tranquila',
      texto: 'Tranquilidad en el proceso de compra, de principio a fin.',
    },
    {
      icon: 'investment',
      titulo: 'Inversión segura',
      texto: 'Excelente manejo de tu inversión con transparencia total.',
    },
    {
      icon: 'advisor',
      titulo: 'Asesoría personal',
      texto: 'Asesoramiento personalizado según tu espacio y estilo de vida.',
    },
    {
      icon: 'design',
      titulo: 'Diseño exclusivo',
      texto: 'Diseño único y pensado exclusivamente para ti y tu hogar.',
    },
    {
      icon: 'elegance',
      titulo: 'Estilo y confort',
      texto: 'Elegancia, funcionalidad, distinción, confort y exclusividad.',
    },
    {
      icon: 'materials',
      titulo: 'Materiales premium',
      texto: 'Materiales de alta calidad seleccionados para durar años.',
    },
    {
      icon: 'support',
      titulo: 'Postventa Emar',
      texto: 'Servicio post venta que respalda cada cocina instalada.',
    },
    {
      icon: 'function',
      titulo: 'Máxima funcionalidad',
      texto: 'Funcionalidad superior en cada rincón de tu cocina integral.',
    },
  ];
}
