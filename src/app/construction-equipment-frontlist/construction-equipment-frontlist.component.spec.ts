import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionEquipmentFrontlistComponent } from './construction-equipment-frontlist.component';

describe('ConstructionEquipmentFrontlistComponent', () => {
  let component: ConstructionEquipmentFrontlistComponent;
  let fixture: ComponentFixture<ConstructionEquipmentFrontlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConstructionEquipmentFrontlistComponent]
    });
    fixture = TestBed.createComponent(ConstructionEquipmentFrontlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
