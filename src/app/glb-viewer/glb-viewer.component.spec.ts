import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlbViewerComponent } from './glb-viewer.component';

describe('GlbViewerComponent', () => {
  let component: GlbViewerComponent;
  let fixture: ComponentFixture<GlbViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlbViewerComponent]
    });
    fixture = TestBed.createComponent(GlbViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
