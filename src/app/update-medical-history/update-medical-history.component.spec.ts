import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMedicalHistoryComponent } from './update-medical-history.component';

describe('UpdateMedicalHistoryComponent', () => {
  let component: UpdateMedicalHistoryComponent;
  let fixture: ComponentFixture<UpdateMedicalHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMedicalHistoryComponent]
    });
    fixture = TestBed.createComponent(UpdateMedicalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
