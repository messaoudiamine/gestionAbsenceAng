import { TestBed } from '@angular/core/testing';

import { AnneescolairesService } from './anneescolaires.service';

describe('AnneescolairesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnneescolairesService = TestBed.get(AnneescolairesService);
    expect(service).toBeTruthy();
  });
});
