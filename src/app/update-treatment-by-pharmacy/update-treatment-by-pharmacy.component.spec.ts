import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTreatmentByPharmacyComponent } from './update-treatment-by-pharmacy.component';

describe('UpdateTreatmentByPharmacyComponent', () => {
  let component: UpdateTreatmentByPharmacyComponent;
  let fixture: ComponentFixture<UpdateTreatmentByPharmacyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTreatmentByPharmacyComponent]
    });
    fixture = TestBed.createComponent(UpdateTreatmentByPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
