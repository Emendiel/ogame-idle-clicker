import { TestBed } from '@angular/core/testing';

import { GameDbService } from './game-db.service';

describe('GameDbServiceTsService', () => {
  let service: GameDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
