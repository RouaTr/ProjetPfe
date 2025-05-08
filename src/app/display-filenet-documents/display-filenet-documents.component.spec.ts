import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFilenetDocumentsComponent } from './display-filenet-documents.component';

describe('DisplayFilenetDocumentsComponent', () => {
  let component: DisplayFilenetDocumentsComponent;
  let fixture: ComponentFixture<DisplayFilenetDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayFilenetDocumentsComponent]
    });
    fixture = TestBed.createComponent(DisplayFilenetDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
