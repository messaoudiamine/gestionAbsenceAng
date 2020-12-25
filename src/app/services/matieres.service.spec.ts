import { TestBed } from '@angular/core/testing';

import { MatieresService } from './matieres.service';

describe('MatieresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatieresService = TestBed.get(MatieresService);
    expect(service).toBeTruthy();
  });
});
