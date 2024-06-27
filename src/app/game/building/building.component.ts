import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Building } from '../game.model';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html'
})
export class BuildingComponent {
  @Input() owned = false;
  @Input() canBuild = false;
  @Input() building!: Building;

  @Output() buildBuilding: EventEmitter<Building> = new EventEmitter();

  upgrade() {
    this.building.level += 1;
    this.building.productionRate += 1;
  }

  async build() {
    this.buildBuilding.emit(this.building);
  }

  displayPercent(building: Building): number {
    return building.productionRateProgress * 100 / building.productionRateNbSeconds;
  }
}
