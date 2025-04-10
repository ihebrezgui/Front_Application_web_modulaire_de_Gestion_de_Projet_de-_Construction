import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontressourceComponent } from './frontressource.component';

describe('FrontressourceComponent', () => {
  let component: FrontressourceComponent;
  let fixture: ComponentFixture<FrontressourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrontressourceComponent]
    });
    fixture = TestBed.createComponent(FrontressourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
