import { TestBed } from '@angular/core/testing';

import { CommandeSerService } from './commande-ser.service';

describe('CommandeSerService', () => {
  let service: CommandeSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandeSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
