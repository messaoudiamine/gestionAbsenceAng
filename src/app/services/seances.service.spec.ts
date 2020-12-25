import { TestBed } from '@angular/core/testing';

import { SeancesService } from './seances.service';

describe('SeancesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeancesService = TestBed.get(SeancesService);
    expect(service).toBeTruthy();
  });
});
