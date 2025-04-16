import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePaiementComponent } from './update-paiement.component';

describe('UpdatePaiementComponent', () => {
  let component: UpdatePaiementComponent;
  let fixture: ComponentFixture<UpdatePaiementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePaiementComponent]
    });
    fixture = TestBed.createComponent(UpdatePaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
