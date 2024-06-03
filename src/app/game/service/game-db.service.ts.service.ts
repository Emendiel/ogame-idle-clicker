import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Planet } from '../game.model';

@Injectable({
  providedIn: 'root'
})
export class GameDbService extends Dexie {
  planets: Dexie.Table<Planet, number>;

  constructor() {
    super('GameDatabase');
    this.version(1).stores({
      planets: '++id, name, resources, buildings'
    });
    this.planets = this.table('planets');
  }

  async getPlanets(): Promise<Planet[]> {
    return this.planets.toArray();
  }

  async savePlanet(planet: Planet): Promise<number> {
    return this.planets.put(planet);
  }

  async deletePlanet(id: number): Promise<void> {
    return this.planets.delete(id);
  }
}
