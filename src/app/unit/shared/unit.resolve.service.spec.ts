import { TestBed } from '@angular/core/testing';

import { Unit.ResolveService } from './unit.resolve.service';

describe('Unit.ResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Unit.ResolveService = TestBed.get(Unit.ResolveService);
    expect(service).toBeTruthy();
  });
});
