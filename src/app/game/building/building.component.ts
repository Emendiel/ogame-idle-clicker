import { Component, Input } from '@angular/core';
import { Building } from '../game.model';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html'
})
export class BuildingComponent {
  @Input() building!: Building;

  upgradeBuilding() {
    this.building.level += 1;
    this.building.productionRate += 1;
  }
}
