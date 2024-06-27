import { Injectable, inject } from '@angular/core';
import { Building, BuildingType, BuildingTypeResourceMapping, Planet, Resource, ResourceTier, ResourceTierMapping, ResourceType, UserGameState } from './game.model';
import { GameDbService } from './service/game-db.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  #resourceList!: Resource[];
  #buildingList!: Building[];
  #gameDBService = inject(GameDbService);

  async initGameService(): Promise<void> {
    this.#resourceList = Object.values(ResourceType).map((type, index) => ({
      id: index + 1,
      type: type as ResourceType,
      amount: 0,
      tier: ResourceTierMapping[type as ResourceType]
    }));

    this.#buildingList = Object.values(BuildingType).map((type, index) => ({
      id: index + 1,
      type: type as BuildingType,
      resourceCost: [],
      resourceProduction: BuildingTypeResourceMapping[type as BuildingType],
      level: 1,
      productionRate: 1,
      productionRateProgress: 0,
      productionRateNbSeconds: 10,
    }));

  }

  getBuildingList(): Building[] {
    return this.#buildingList;
  }

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
        const amountResource: number[] = [];

        const buildings = planet.buildings
        .filter(building => building.resourceProduction === resource.type);

        buildings.forEach((building) => {
          if (building.productionRateProgress < building.productionRateNbSeconds) {
            building.productionRateProgress = building.productionRateProgress + building.productionRate
          } else {
            building.productionRateProgress = 0;

            amountResource.push(building.productionRate);
          }
        });

        if (amountResource.length > 0) {
          resource.amount += amountResource.reduce(amount => amount);
        }

        /* const productionRate = buildings
          .reduce((sum, building) => sum + building.productionRate, 0);

        resource.amount += productionRate * nbSeconds; */
      });
    });
  }

  findBuilding(type: string): Building {
    const building = this.#buildingList.find((building) => {
      return building.type === type
    });

    if (!building) {
      throw new Error('Building of type ' + type + ' not found')
    }

    return Object.assign({}, building);
  }

  findResourceByType(resourceType: ResourceType, amount = 0): Resource {
    const resource = this.#resourceList.find((resource) => {
      return resource.type === resourceType
    });

    if (!resource) {
      throw new Error('Resource of type ' + resourceType + ' not found');
    }
    const planetResource = Object.assign({}, resource);
    planetResource.amount = amount;
      
    return planetResource;
  }

  getHihestTier(resourceList: Resource[]): ResourceTier {
    const tiers = resourceList.map(req => ResourceTierMapping[req.type]);

    return tiers.reduce((highestTier, currentTier) => {
      if (ResourceTier[highestTier] > ResourceTier[currentTier]) {
        return highestTier;
      }

      return currentTier;
    }, ResourceTier.Tier1);
  }
}
