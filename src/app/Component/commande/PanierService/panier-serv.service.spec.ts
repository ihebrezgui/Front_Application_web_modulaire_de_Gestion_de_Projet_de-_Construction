import { TestBed } from '@angular/core/testing';

import { PanierServService } from './panier-serv.service';

describe('PanierServService', () => {
  let service: PanierServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanierServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
