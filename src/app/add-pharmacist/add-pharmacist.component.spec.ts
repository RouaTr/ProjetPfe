import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPharmacistComponent } from './add-pharmacist.component';

describe('AddPharmacistComponent', () => {
  let component: AddPharmacistComponent;
  let fixture: ComponentFixture<AddPharmacistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPharmacistComponent]
    });
    fixture = TestBed.createComponent(AddPharmacistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
