import { Component, OnInit, inject } from '@angular/core';
import { GameService } from '../game.service';
import { Planet } from '../game.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {
  planets: Planet[] = [];

  #gameService = inject(GameService);

  async ngOnInit() {
    await this.loadGame();
  }

  initializeGame(): Planet[] {
    return [
      {
        id: 1,
        name: 'Earth',
        resources: [{ id: 1, type: 'Metal', amount: 100 }],
        buildings: [{ id: 1, type: 'Mine', level: 1, productionRate: 1 }]
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
    await this.#gameService.saveUserGameState(this.planets);
  }

  async loadGame() {
    this.planets = await this.#gameService.getUserGameState();
    if (this.planets.length === 0) {
      this.planets = this.initializeGame();
    }
  }
}
