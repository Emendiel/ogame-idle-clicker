import { Component, Input, inject } from '@angular/core';
import { Building, Planet } from '../game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html'
})
export class BuildingComponent {
  @Input() building!: Building;

  #gameService = inject(GameService);

  upgradeBuilding() {
    this.building.level += 1;
    this.building.productionRate += 1;
  }
}
