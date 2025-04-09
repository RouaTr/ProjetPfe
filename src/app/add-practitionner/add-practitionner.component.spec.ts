import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPractitionnerComponent } from './add-practitionner.component';

describe('AddPractitionnerComponent', () => {
  let component: AddPractitionnerComponent;
  let fixture: ComponentFixture<AddPractitionnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPractitionnerComponent]
    });
    fixture = TestBed.createComponent(AddPractitionnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
