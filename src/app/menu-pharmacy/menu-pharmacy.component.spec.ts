import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPharmacyComponent } from './menu-pharmacy.component';

describe('MenuPharmacyComponent', () => {
  let component: MenuPharmacyComponent;
  let fixture: ComponentFixture<MenuPharmacyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuPharmacyComponent]
    });
    fixture = TestBed.createComponent(MenuPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
