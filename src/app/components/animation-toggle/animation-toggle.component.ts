import { Component, inject } from '@angular/core';
import { AnimationPreferencesService } from '../../services/animation-preferences.service';

@Component({
  selector: 'app-animation-toggle',
  standalone: true,
  templateUrl: './animation-toggle.component.html',
  styleUrl: './animation-toggle.component.scss',
})
export class AnimationToggleComponent {
  readonly animations = inject(AnimationPreferencesService);

  toggle(): void {
    this.animations.toggle();
  }
}
