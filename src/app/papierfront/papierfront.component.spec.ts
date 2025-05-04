import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PapierfrontComponent } from './papierfront.component';

describe('PapierfrontComponent', () => {
  let component: PapierfrontComponent;
  let fixture: ComponentFixture<PapierfrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PapierfrontComponent]
    });
    fixture = TestBed.createComponent(PapierfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
