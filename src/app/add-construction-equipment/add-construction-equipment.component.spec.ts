import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConstructionEquipmentComponent } from './add-construction-equipment.component';

describe('AddConstructionEquipmentComponent', () => {
  let component: AddConstructionEquipmentComponent;
  let fixture: ComponentFixture<AddConstructionEquipmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddConstructionEquipmentComponent]
    });
    fixture = TestBed.createComponent(AddConstructionEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
