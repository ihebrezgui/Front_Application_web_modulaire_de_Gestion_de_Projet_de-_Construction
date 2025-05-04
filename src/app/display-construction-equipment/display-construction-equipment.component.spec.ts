import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayConstructionEquipmentComponent } from './display-construction-equipment.component';

describe('DisplayConstructionEquipmentComponent', () => {
  let component: DisplayConstructionEquipmentComponent;
  let fixture: ComponentFixture<DisplayConstructionEquipmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayConstructionEquipmentComponent]
    });
    fixture = TestBed.createComponent(DisplayConstructionEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
