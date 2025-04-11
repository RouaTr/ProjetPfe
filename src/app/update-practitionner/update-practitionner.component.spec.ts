import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePractitionnerComponent } from './update-practitionner.component';

describe('UpdatePractitionnerComponent', () => {
  let component: UpdatePractitionnerComponent;
  let fixture: ComponentFixture<UpdatePractitionnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePractitionnerComponent]
    });
    fixture = TestBed.createComponent(UpdatePractitionnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
