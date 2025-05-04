import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentInspectionFrontlistComponent } from './equipment-inspection-frontlist.component';

describe('EquipmentInspectionFrontlistComponent', () => {
  let component: EquipmentInspectionFrontlistComponent;
  let fixture: ComponentFixture<EquipmentInspectionFrontlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipmentInspectionFrontlistComponent]
    });
    fixture = TestBed.createComponent(EquipmentInspectionFrontlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
