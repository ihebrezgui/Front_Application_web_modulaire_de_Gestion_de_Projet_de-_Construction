import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PPEFrontlistComponent } from './ppe-frontlist.component';

describe('PPEFrontlistComponent', () => {
  let component: PPEFrontlistComponent;
  let fixture: ComponentFixture<PPEFrontlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PPEFrontlistComponent]
    });
    fixture = TestBed.createComponent(PPEFrontlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
