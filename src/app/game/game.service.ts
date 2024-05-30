import { Injectable } from '@angular/core';
import { Planet } from './game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private planets: Planet[] = [
    {
      id: 1,
      name: 'Earth',
      resources: [{ id: 1, type: 'Metal', amount: 100 }],
      buildings: [{ id: 1, type: 'Mine', level: 1, productionRate: 10 }]
    }
  ];

  getPlanets() {
    return this.planets;
  }
}
