import { Injectable, inject } from '@angular/core';
import { Planet } from './game.model';
import { GameDbService } from './service/game-db.service.ts.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  #gameDBService = inject(GameDbService);

  async getUserGameState(): Promise<Planet[]> {
    return this.#gameDBService.getPlanets();
  }

  async saveUserGameState(planets: Planet[]): Promise<void> {
    for (const planet of planets) {
      await this.#gameDBService.savePlanet(planet);
    }
  }

  async deletePlanet(id: number): Promise<void> {
    await this.#gameDBService.deletePlanet(id);
  }
}
