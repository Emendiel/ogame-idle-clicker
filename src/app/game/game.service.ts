import { Injectable, inject } from '@angular/core';
import { Planet, UserGameState } from './game.model';
import { GameDbService } from './service/game-db.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  #gameDBService = inject(GameDbService);

  async getUserGameState(): Promise<UserGameState> {
    const timestamp = new Date();
    const state = await this.#gameDBService.getUserGameState();
    if (state) {
      return state;
    } else {
      return {
        type: 'Save',
        savedAt: timestamp,
        planets: []
      };
    }
  }

  async saveUserGameState(planets: Planet[], isAuto = false): Promise<UserGameState> {
    const timestamp = new Date();
    let gameState: UserGameState;

    if (isAuto) {
      const LastAutoSave = await this.#gameDBService.getLastAutoSave();

      if (LastAutoSave) {
        LastAutoSave.savedAt = new Date();
        gameState = LastAutoSave;
      } else {
        gameState = {
          type: 'AutoSave',
          savedAt: timestamp,
          planets: planets
        }
      }

    } else {
      gameState = {
        type: 'Save',
        savedAt: timestamp,
        planets: planets
      }
    }

    await this.#gameDBService.saveUserGameState(gameState);

    return gameState;
  }

  async clearUserGameState(): Promise<void> {
    await this.#gameDBService.clearUserGameState();
  }

  incrementResources(planets: Planet[], nbSeconds = 1) {
    planets.forEach(planet => {
      planet.resources.forEach(resource => {
        const building = planet.buildings
        .filter(building => building.resourceType.toLowerCase() === resource.type.toLowerCase());
        const productionRate = building
          .reduce((sum, building) => sum + building.productionRate, 0);
        resource.amount += productionRate * nbSeconds;
      });
    });
  }
}
