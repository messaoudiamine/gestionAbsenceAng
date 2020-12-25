import { TestBed } from '@angular/core/testing';

import { ProfesseursService } from './professeurs.service';

describe('ProfesseursService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfesseursService = TestBed.get(ProfesseursService);
    expect(service).toBeTruthy();
  });
});
