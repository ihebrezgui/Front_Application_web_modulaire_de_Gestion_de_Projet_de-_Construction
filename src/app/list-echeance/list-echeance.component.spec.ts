import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEcheanceComponent } from './list-echeance.component';

describe('ListEcheanceComponent', () => {
  let component: ListEcheanceComponent;
  let fixture: ComponentFixture<ListEcheanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListEcheanceComponent]
    });
    fixture = TestBed.createComponent(ListEcheanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
