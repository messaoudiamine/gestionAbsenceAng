import { TestBed } from '@angular/core/testing';

import { SemestresService } from './semestres.service';

describe('SemestresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SemestresService = TestBed.get(SemestresService);
    expect(service).toBeTruthy();
  });
});
