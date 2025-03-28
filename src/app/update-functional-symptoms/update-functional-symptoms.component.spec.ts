import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFunctionalSymptomsComponent } from './update-functional-symptoms.component';

describe('UpdateFunctionalSymptomsComponent', () => {
  let component: UpdateFunctionalSymptomsComponent;
  let fixture: ComponentFixture<UpdateFunctionalSymptomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateFunctionalSymptomsComponent]
    });
    fixture = TestBed.createComponent(UpdateFunctionalSymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
