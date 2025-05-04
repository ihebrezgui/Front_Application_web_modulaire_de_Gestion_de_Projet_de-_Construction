import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPapierComponent } from './list-papier.component';

describe('ListPapierComponent', () => {
  let component: ListPapierComponent;
  let fixture: ComponentFixture<ListPapierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPapierComponent]
    });
    fixture = TestBed.createComponent(ListPapierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
