import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEquipmentInspectionComponent } from './add-equipment-inspection.component';

describe('AddEquipmentInspectionComponent', () => {
  let component: AddEquipmentInspectionComponent;
  let fixture: ComponentFixture<AddEquipmentInspectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEquipmentInspectionComponent]
    });
    fixture = TestBed.createComponent(AddEquipmentInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
