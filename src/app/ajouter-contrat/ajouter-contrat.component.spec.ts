import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterContratComponent } from './ajouter-contrat.component';

describe('AjouterContratComponent', () => {
  let component: AjouterContratComponent;
  let fixture: ComponentFixture<AjouterContratComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterContratComponent]
    });
    fixture = TestBed.createComponent(AjouterContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
