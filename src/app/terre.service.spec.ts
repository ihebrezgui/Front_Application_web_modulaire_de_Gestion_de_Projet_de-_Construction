import { TestBed } from '@angular/core/testing';

import { TerreService } from './TerreService.service';

describe('TerreService', () => {
  let service: TerreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
