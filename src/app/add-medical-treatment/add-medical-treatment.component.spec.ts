import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicalTreatmentComponent } from './add-medical-treatment.component';

describe('AddMedicalTreatmentComponent', () => {
  let component: AddMedicalTreatmentComponent;
  let fixture: ComponentFixture<AddMedicalTreatmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMedicalTreatmentComponent]
    });
    fixture = TestBed.createComponent(AddMedicalTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
