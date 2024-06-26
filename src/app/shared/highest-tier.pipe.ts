import { Pipe, PipeTransform } from '@angular/core';
import { Building, ResourceTier, ResourceTierMapping } from '../game/game.model';

@Pipe({
  name: 'highestTier',
  standalone: true
})
export class HighestTierPipe implements PipeTransform {

  transform(building: Building): ResourceTier {
    const tiers = building.resourceCost.map(req => ResourceTierMapping[req.type]);

    return tiers.reduce((highestTier, currentTier) => {
      if (ResourceTier[highestTier] > ResourceTier[currentTier]) {
        return highestTier;
      }

      return currentTier;
    }, ResourceTier.Tier1);
  }

}
