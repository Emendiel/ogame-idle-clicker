import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Planet } from '../game.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {
  planets!: Planet[];

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.planets = this.gameService.getPlanets();
  }
}
