import { Component, Input, inject } from '@angular/core';
import { Building, Planet } from '../game.model';
import { PlanetService } from '../service/planet.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html'
})
export class PlanetComponent {
  @Input() buildingList!: Building[];
  @Input() planet!: Planet;

  #planetService = inject(PlanetService);

  canBuild(building: Building): boolean {
    return this.#planetService.canBuild(this.planet, building);
  }

  addBuilding(building: Building) {
    this.#planetService.build(this.planet, building);
  }
}
