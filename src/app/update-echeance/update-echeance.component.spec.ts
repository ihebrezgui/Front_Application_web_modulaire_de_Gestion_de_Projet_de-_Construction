import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEcheanceComponent } from './update-echeance.component';

describe('UpdateEcheanceComponent', () => {
  let component: UpdateEcheanceComponent;
  let fixture: ComponentFixture<UpdateEcheanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateEcheanceComponent]
    });
    fixture = TestBed.createComponent(UpdateEcheanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
