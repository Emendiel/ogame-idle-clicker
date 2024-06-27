import { Pipe, PipeTransform, inject } from '@angular/core';
import { Building, ResourceTier } from '../game/game.model';
import { GameService } from '../game/game.service';

@Pipe({
  name: 'highestTier',
  standalone: true
})
export class HighestTierPipe implements PipeTransform {
  #gameService = inject(GameService);

  transform(building: Building): ResourceTier {
    return this.#gameService.getHihestTier(building.resourceCost);
  }

}
