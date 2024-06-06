import { Injectable } from '@angular/core';
import { Building, Planet } from '../game.model';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  canBuild(planet: Planet, building: Building): boolean {
    return building.resourceCost.every(resourceCost => {
      const planetResource = planet.resources.find(r => r.type === resourceCost.type);
      return planetResource && planetResource.amount >= resourceCost.amount
    });
  }

  build(planet: Planet, building: Building): boolean {
    if (!this.canBuild(planet, building)) {
      return false;
    }

    building.resourceCost.forEach(resourceCost => {
      const planetResource = planet.resources.find(r => r.type === resourceCost.type);
      if (planetResource) {
        planetResource.amount -= resourceCost.amount;
      }
    });

    planet.buildings.push(building);

    return true;
  }
}
