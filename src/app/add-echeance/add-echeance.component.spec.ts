import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEcheanceComponent } from './add-echeance.component';

describe('AddEcheanceComponent', () => {
  let component: AddEcheanceComponent;
  let fixture: ComponentFixture<AddEcheanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEcheanceComponent]
    });
    fixture = TestBed.createComponent(AddEcheanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
