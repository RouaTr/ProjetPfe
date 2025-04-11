import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePractitionnerAccessComponent } from './manage-practitionner-access.component';

describe('ManagePractitionnerAccessComponent', () => {
  let component: ManagePractitionnerAccessComponent;
  let fixture: ComponentFixture<ManagePractitionnerAccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePractitionnerAccessComponent]
    });
    fixture = TestBed.createComponent(ManagePractitionnerAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
