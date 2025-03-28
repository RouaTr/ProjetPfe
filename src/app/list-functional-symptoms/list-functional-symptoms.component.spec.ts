import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFunctionalSymptomsComponent } from './list-functional-symptoms.component';

describe('ListFunctionalSymptomsComponent', () => {
  let component: ListFunctionalSymptomsComponent;
  let fixture: ComponentFixture<ListFunctionalSymptomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFunctionalSymptomsComponent]
    });
    fixture = TestBed.createComponent(ListFunctionalSymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
