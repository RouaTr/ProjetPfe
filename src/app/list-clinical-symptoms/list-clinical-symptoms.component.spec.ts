import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClinicalSymptomsComponent } from './list-clinical-symptoms.component';

describe('ListClinicalSymptomsComponent', () => {
  let component: ListClinicalSymptomsComponent;
  let fixture: ComponentFixture<ListClinicalSymptomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListClinicalSymptomsComponent]
    });
    fixture = TestBed.createComponent(ListClinicalSymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
