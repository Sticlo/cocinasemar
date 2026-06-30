import { Component } from '@angular/core';
import { EMPRESA } from '../../data/empresa';

@Component({
  selector: 'app-whatsapp-float',
  standalone: true,
  templateUrl: './whatsapp-float.component.html',
  styleUrl: './whatsapp-float.component.scss',
})
export class WhatsappFloatComponent {
  readonly empresa = EMPRESA;
}
