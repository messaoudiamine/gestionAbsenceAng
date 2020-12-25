import { TestBed } from '@angular/core/testing';

import { ElevesService } from './eleves.service';

describe('ElevesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElevesService = TestBed.get(ElevesService);
    expect(service).toBeTruthy();
  });
});
