import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

type ServicioIcon =
  | 'design'
  | 'fabrication'
  | 'install'
  | 'space'
  | 'warranty';

interface Servicio {
  icon: ServicioIcon;
  titulo: string;
  descripcion: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
}) export class ServicesComponent {
  servicios: Servicio[] = [
    {
      icon: 'design',
      titulo: 'Diseño personalizado',
      descripcion:
        'Creamos el plano ideal según tu espacio, estilo de vida y presupuesto. Render 3D incluido.',
    },
    {
      icon: 'fabrication',
      titulo: 'Fabricación propia',
      descripcion:
        'Trabajamos con maderas, melaminas y acabados de primera calidad.',
    },
    {
      icon: 'install',
      titulo: 'Instalación profesional',
      descripcion:
        'Nuestro equipo instala tu cocina con precisión milimétrica y sin sorpresas.',
    },
    {
      icon: 'space',
      titulo: 'Optimización de espacio',
      descripcion:
        'Aprovechamos cada centímetro con soluciones inteligentes de almacenamiento.',
    },
    {
      icon: 'warranty',
      titulo: 'Garantía Emar',
      descripcion:
        'Respaldamos nuestro trabajo con garantía en materiales, herrajes e instalación.',
    },
  ];
}
