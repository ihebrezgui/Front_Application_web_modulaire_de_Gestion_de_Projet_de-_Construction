import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentInspectionFrontaddComponent } from './equipment-inspection-frontadd.component';

describe('EquipmentInspectionFrontaddComponent', () => {
  let component: EquipmentInspectionFrontaddComponent;
  let fixture: ComponentFixture<EquipmentInspectionFrontaddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipmentInspectionFrontaddComponent]
    });
    fixture = TestBed.createComponent(EquipmentInspectionFrontaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
