import { Component } from '@angular/core';
import { EMPRESA } from '../../data/empresa';

@Component({
  selector: 'app-call-float',
  standalone: true,
  templateUrl: './call-float.component.html',
  styleUrl: './call-float.component.scss',
})
export class CallFloatComponent {
  readonly empresa = EMPRESA;
}
