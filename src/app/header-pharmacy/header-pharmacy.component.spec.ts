import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPharmacyComponent } from './header-pharmacy.component';

describe('HeaderPharmacyComponent', () => {
  let component: HeaderPharmacyComponent;
  let fixture: ComponentFixture<HeaderPharmacyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderPharmacyComponent]
    });
    fixture = TestBed.createComponent(HeaderPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
