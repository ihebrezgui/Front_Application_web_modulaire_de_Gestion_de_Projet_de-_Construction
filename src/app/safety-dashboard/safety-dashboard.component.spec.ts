import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyDashboardComponent } from './safety-dashboard.component';

describe('SafetyDashboardComponent', () => {
  let component: SafetyDashboardComponent;
  let fixture: ComponentFixture<SafetyDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SafetyDashboardComponent]
    });
    fixture = TestBed.createComponent(SafetyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
