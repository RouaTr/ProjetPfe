import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMedicalTreatmentComponent } from './update-medical-treatment.component';

describe('UpdateMedicalTreatmentComponent', () => {
  let component: UpdateMedicalTreatmentComponent;
  let fixture: ComponentFixture<UpdateMedicalTreatmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMedicalTreatmentComponent]
    });
    fixture = TestBed.createComponent(UpdateMedicalTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
