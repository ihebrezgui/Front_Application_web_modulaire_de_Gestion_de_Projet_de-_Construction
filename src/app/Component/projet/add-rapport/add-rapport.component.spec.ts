import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRapportComponent } from './add-rapport.component';

describe('AddRapportComponent', () => {
  let component: AddRapportComponent;
  let fixture: ComponentFixture<AddRapportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRapportComponent]
    });
    fixture = TestBed.createComponent(AddRapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
