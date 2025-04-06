import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfMedicalPrescriptionsComponent } from './list-of-medical-prescriptions.component';

describe('ListOfMedicalPrescriptionsComponent', () => {
  let component: ListOfMedicalPrescriptionsComponent;
  let fixture: ComponentFixture<ListOfMedicalPrescriptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfMedicalPrescriptionsComponent]
    });
    fixture = TestBed.createComponent(ListOfMedicalPrescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
