import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Planet, UserGameState } from '../game.model';

@Injectable({
  providedIn: 'root'
})
export class GameDbService extends Dexie {
  userGameState: Dexie.Table<UserGameState, number>;

  constructor() {
    super('GameDatabase');
    this.version(1).stores({
      userGameState: '++id, type, savedAt, planets'
    });
    this.userGameState = this.table('userGameState');
  }

  async getLastAutoSave(): Promise<UserGameState | undefined> {
    return this.userGameState
      .where('type')
      .equals('AutoSave')
      .last();
  }

  async getUserGameState(): Promise<UserGameState | undefined> {
    return this.userGameState.toCollection().last();
  }

  async saveUserGameState(gameState: UserGameState): Promise<number> {
    const saveState = this.userGameState.put(gameState);
    this.cleanUpOldUserGameStates();
    return saveState;
  }

  async clearUserGameState(): Promise<void> {
    return this.userGameState.clear();
  }

  private async cleanUpOldUserGameStates(): Promise<void> {
    const count = await this.userGameState.where('type').equals('Save').count();

    if (5 < count) {
      const oldStates = await this.userGameState
        .orderBy('savedAt')
        .limit(count - 5)
        .toArray();
      const oldStatesIds = oldStates.map(state => state.id!);
      await this.userGameState.bulkDelete(oldStatesIds)
    }
  }
}