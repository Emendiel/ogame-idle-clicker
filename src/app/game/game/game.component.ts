import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { GameService } from '../game.service';
import { Planet, UserGameState } from '../game.model';
import * as moment from 'moment';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit, OnDestroy {
  userGameState!: UserGameState;
  #intervalIdResourceIncrement: any;
  #intervalIdAutoSave: any;

  #gameService = inject(GameService);

  async ngOnInit() {
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

  initializeGame(): Planet[] {
    return [
      {
        id: 1,
        name: 'Earth',
        resources: [{ id: 1, type: 'Metal', amount: 100 }],
        buildings: [{ id: 1, type: 'Mine', resourceType: 'Metal', level: 1, productionRate: 1 }]
      },
      {
        id: 2,
        name: 'Mars',
        resources: [{ id: 1, type: 'Metal', amount: 10 }],
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
      this.userGameState.planets = this.initializeGame();
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
