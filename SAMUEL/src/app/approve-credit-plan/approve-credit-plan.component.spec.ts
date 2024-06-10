import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCreditPlanComponent } from './approve-credit-plan.component';

describe('ApproveCreditPlanComponent', () => {
  let component: ApproveCreditPlanComponent;
  let fixture: ComponentFixture<ApproveCreditPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveCreditPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApproveCreditPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
