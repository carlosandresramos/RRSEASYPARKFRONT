import { TestBed } from '@angular/core/testing';

import { PropietaryParkService } from './propietary-park.service';

describe('PropietaryParkService', () => {
  let service: PropietaryParkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropietaryParkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
