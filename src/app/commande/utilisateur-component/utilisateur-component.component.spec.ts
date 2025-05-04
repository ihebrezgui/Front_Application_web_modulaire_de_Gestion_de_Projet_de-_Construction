import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilisateurComponentComponent } from './utilisateur-component.component';



describe('UtilisateurComponentComponent', () => {
  let component: UtilisateurComponentComponent;
  let fixture: ComponentFixture<UtilisateurComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtilisateurComponentComponent]
    });
    fixture = TestBed.createComponent(UtilisateurComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
