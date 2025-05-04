import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrefrontlistComponent } from './terrefrontlist.component';

describe('TerrefrontlistComponent', () => {
  let component: TerrefrontlistComponent;
  let fixture: ComponentFixture<TerrefrontlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TerrefrontlistComponent]
    });
    fixture = TestBed.createComponent(TerrefrontlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
