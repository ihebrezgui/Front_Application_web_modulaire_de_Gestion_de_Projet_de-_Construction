import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayEquipmentInspectionComponent } from './display-equipment-inspection.component';

describe('DisplayEquipmentInspectionComponent', () => {
  let component: DisplayEquipmentInspectionComponent;
  let fixture: ComponentFixture<DisplayEquipmentInspectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayEquipmentInspectionComponent]
    });
    fixture = TestBed.createComponent(DisplayEquipmentInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
