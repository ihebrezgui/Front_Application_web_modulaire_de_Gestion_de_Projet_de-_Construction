import { TestBed } from '@angular/core/testing';

import { ListFactureService } from './list-facture.service';

describe('ListFactureService', () => {
  let service: ListFactureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListFactureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
