import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMedicalTreatmentComponent } from './list-medical-treatment.component';

describe('ListMedicalTreatmentComponent', () => {
  let component: ListMedicalTreatmentComponent;
  let fixture: ComponentFixture<ListMedicalTreatmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListMedicalTreatmentComponent]
    });
    fixture = TestBed.createComponent(ListMedicalTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
