import { Component, Input } from '@angular/core';
import { Planet } from '../game.model';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html'
})
export class PlanetComponent {
  @Input() planet!: Planet;
}
