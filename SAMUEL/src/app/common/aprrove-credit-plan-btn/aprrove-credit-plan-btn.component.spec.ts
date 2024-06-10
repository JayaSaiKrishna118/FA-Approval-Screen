import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprroveCreditPlanBtnComponent } from './aprrove-credit-plan-btn.component';

describe('AprroveCreditPlanBtnComponent', () => {
  let component: AprroveCreditPlanBtnComponent;
  let fixture: ComponentFixture<AprroveCreditPlanBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AprroveCreditPlanBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AprroveCreditPlanBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
