import { Component, Input } from '@angular/core';
import { Resource } from '../game.model';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html'
})
export class ResourceComponent {
  @Input() resource!: Resource;

  collectResource() {
    this.resource.amount += 1;
  }
}
