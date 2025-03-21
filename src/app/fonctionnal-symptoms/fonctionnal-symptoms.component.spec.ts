import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FonctionnalSymptomsComponent } from './fonctionnal-symptoms.component';

describe('FonctionnalSymptomsComponent', () => {
  let component: FonctionnalSymptomsComponent;
  let fixture: ComponentFixture<FonctionnalSymptomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FonctionnalSymptomsComponent]
    });
    fixture = TestBed.createComponent(FonctionnalSymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
