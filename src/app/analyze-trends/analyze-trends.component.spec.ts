import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeTrendsComponent } from './analyze-trends.component';

describe('AnalyzeTrendsComponent', () => {
  let component: AnalyzeTrendsComponent;
  let fixture: ComponentFixture<AnalyzeTrendsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyzeTrendsComponent]
    });
    fixture = TestBed.createComponent(AnalyzeTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
