import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfAllPatientsComponent } from './list-of-all-patients.component';

describe('ListOfAllPatientsComponent', () => {
  let component: ListOfAllPatientsComponent;
  let fixture: ComponentFixture<ListOfAllPatientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfAllPatientsComponent]
    });
    fixture = TestBed.createComponent(ListOfAllPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
