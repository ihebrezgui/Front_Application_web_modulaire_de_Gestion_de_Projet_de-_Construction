import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterTerreComponent } from './ajouter-terre.component';

describe('AjouterTerreComponent', () => {
  let component: AjouterTerreComponent;
  let fixture: ComponentFixture<AjouterTerreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterTerreComponent]
    });
    fixture = TestBed.createComponent(AjouterTerreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
