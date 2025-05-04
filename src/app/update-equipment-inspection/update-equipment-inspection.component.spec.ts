import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEquipmentInspectionComponent } from './update-equipment-inspection.component';

describe('UpdateEquipmentInspectionComponent', () => {
  let component: UpdateEquipmentInspectionComponent;
  let fixture: ComponentFixture<UpdateEquipmentInspectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateEquipmentInspectionComponent]
    });
    fixture = TestBed.createComponent(UpdateEquipmentInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
