import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClinicalSymptomsComponent } from './update-clinical-symptoms.component';

describe('UpdateClinicalSymptomsComponent', () => {
  let component: UpdateClinicalSymptomsComponent;
  let fixture: ComponentFixture<UpdateClinicalSymptomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateClinicalSymptomsComponent]
    });
    fixture = TestBed.createComponent(UpdateClinicalSymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
