import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTreatmentFormComponent } from './manage-treatment-form.component';

describe('ManageTreatmentFormComponent', () => {
  let component: ManageTreatmentFormComponent;
  let fixture: ComponentFixture<ManageTreatmentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageTreatmentFormComponent]
    });
    fixture = TestBed.createComponent(ManageTreatmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
