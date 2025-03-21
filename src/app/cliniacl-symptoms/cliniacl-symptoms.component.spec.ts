import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliniaclSymptomsComponent } from './cliniacl-symptoms.component';

describe('CliniaclSymptomsComponent', () => {
  let component: CliniaclSymptomsComponent;
  let fixture: ComponentFixture<CliniaclSymptomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CliniaclSymptomsComponent]
    });
    fixture = TestBed.createComponent(CliniaclSymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
