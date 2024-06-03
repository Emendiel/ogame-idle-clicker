import { Component, Input, inject } from '@angular/core';
import { Planet, Resource } from '../game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html'
})
export class ResourceComponent {
  @Input() resource!: Resource;

  #gameService = inject(GameService);

  async collectResource() {
    this.resource.amount += 1;
  }
}
