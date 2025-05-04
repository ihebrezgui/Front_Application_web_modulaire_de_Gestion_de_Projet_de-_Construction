import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientcontartComponent } from './clientcontart.component';

describe('ClientcontartComponent', () => {
  let component: ClientcontartComponent;
  let fixture: ComponentFixture<ClientcontartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientcontartComponent]
    });
    fixture = TestBed.createComponent(ClientcontartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
