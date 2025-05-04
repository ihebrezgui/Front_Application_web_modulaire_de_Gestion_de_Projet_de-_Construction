import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListterreComponent } from './listterre.component';

describe('ListterreComponent', () => {
  let component: ListterreComponent;
  let fixture: ComponentFixture<ListterreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListterreComponent]
    });
    fixture = TestBed.createComponent(ListterreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
