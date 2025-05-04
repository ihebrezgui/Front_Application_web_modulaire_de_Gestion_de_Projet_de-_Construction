import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratfrontComponent } from './contratfront.component';

describe('ContratfrontComponent', () => {
  let component: ContratfrontComponent;
  let fixture: ComponentFixture<ContratfrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContratfrontComponent]
    });
    fixture = TestBed.createComponent(ContratfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
