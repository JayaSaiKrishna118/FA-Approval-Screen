import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRiskComponent } from './student-risk.component';

describe('StudentRiskComponent', () => {
  let component: StudentRiskComponent;
  let fixture: ComponentFixture<StudentRiskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentRiskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
