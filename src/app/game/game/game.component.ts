import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { GameService } from '../game.service';
import { Building, Planet, Resource, ResourceTier, ResourceTierMapping, ResourceType, UserGameState } from '../game.model';
import * as moment from 'moment';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit, OnDestroy {
  buildingList!: Building[];
  userGameState!: UserGameState;
  #intervalIdResourceIncrement: any;
  #intervalIdAutoSave: any;

  #gameService = inject(GameService);

  async ngOnInit() {
    this.#gameService.initGameService();
    
    this.initializeGame();

    await this.loadGame();

    this.startAutoSave();
    this.startResourceIncrement();
  }

  ngOnDestroy() {
    if (this.#intervalIdResourceIncrement) {
      clearInterval(this.#intervalIdResourceIncrement);
    }
    
    if (this.#intervalIdAutoSave) {
      clearInterval(this.#intervalIdAutoSave);
    }
  }

  initializeGame() {
    this.buildingList = [
      {
        id: 1,
        type: 'Quarry',
        resourceCost: [
          this.#gameService.findResourceByType(ResourceType.Stone, 10),
        ],
        resourceType: ResourceType.Stone,
        level: 1,
        productionRate: 1,
        productionRateProgress: 0,
        productionRateNbSeconds: 1,
      },
      {
        id: 2,
        type: 'Copper Mine',
        resourceCost: [
          this.#gameService.findResourceByType(ResourceType.Stone, 50),
          this.#gameService.findResourceByType(ResourceType.Copper, 10),
        ],
        resourceType: ResourceType.Copper,
        level: 1,
        productionRate: 1,
        productionRateProgress: 0,
        productionRateNbSeconds: 1,
      }
    ];
  }

  initUserGameState() {
    this.userGameState.planets = [
      {
        id: 1,
        name: 'Earth',
        resources: [
          this.#gameService.findResourceByType(ResourceType.Stone),
          this.#gameService.findResourceByType(ResourceType.Copper),
        ],
        buildings: []
      },
      {
        id: 2,
        name: 'Mars',
        resources: [this.#gameService.findResourceByType(ResourceType.Stone)],
        buildings: []
      }
    ];
  }

  async saveGame() {
    this.userGameState = await this.#gameService.saveUserGameState(this.userGameState.planets);
  }

  async loadGame() {
    this.userGameState = await this.#gameService.getUserGameState();
    
    if (this.userGameState.planets.length === 0) {
      this.initUserGameState();
    } else {
      this.computeUserGameState();
    }
  }

  computeUserGameState() {
    const now = moment();
    const savedAt = moment(this.userGameState.savedAt);
    const diff = now.diff(savedAt, 'seconds');

    this.#gameService.incrementResources(this.userGameState.planets, diff);
  }

  startAutoSave() {
    this.#intervalIdAutoSave = setInterval(async () => {
      this.userGameState = await this.#gameService.saveUserGameState(this.userGameState.planets, true);
    }, 5 * 1000 * 60);
  }

  startResourceIncrement() {
    this.#intervalIdResourceIncrement = setInterval(() => {
      this.#gameService.incrementResources(this.userGameState.planets);
    }, 1000);
  }

  getSavedAtFormatted(): string {
    return moment(this.userGameState.savedAt).fromNow();
  }
}
