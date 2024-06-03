import { TestBed } from '@angular/core/testing';

import { GameDbServiceTsService } from './game-db.service.ts.service';

describe('GameDbServiceTsService', () => {
  let service: GameDbServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameDbServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
