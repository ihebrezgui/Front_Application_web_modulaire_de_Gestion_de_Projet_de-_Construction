import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPPEComponent } from './add-ppe.component';

describe('AddPPEComponent', () => {
  let component: AddPPEComponent;
  let fixture: ComponentFixture<AddPPEComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPPEComponent]
    });
    fixture = TestBed.createComponent(AddPPEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
