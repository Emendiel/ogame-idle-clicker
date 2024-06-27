import { Pipe, PipeTransform } from '@angular/core';
import { Building } from '../game/game.model';

@Pipe({
  name: 'buildingProductionPercent',
  standalone: true
})
export class BuildingProductionPercentPipe implements PipeTransform {

  transform(building: Building): number {
    return building.productionRateProgress * 100 / building.productionRateNbSeconds;
  }

}
