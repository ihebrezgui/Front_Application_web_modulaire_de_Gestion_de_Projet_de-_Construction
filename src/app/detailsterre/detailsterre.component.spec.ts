import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsterreComponent } from './detailsterre.component';

describe('DetailsterreComponent', () => {
  let component: DetailsterreComponent;
  let fixture: ComponentFixture<DetailsterreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsterreComponent]
    });
    fixture = TestBed.createComponent(DetailsterreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
