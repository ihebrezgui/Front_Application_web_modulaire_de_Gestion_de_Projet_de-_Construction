import { TestBed } from '@angular/core/testing';

import { RessourceServiceService } from './ressource-service.service';

describe('RessourceServiceService', () => {
  let service: RessourceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RessourceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
