import { Component } from '@angular/core';
import { CreditPlanService } from '../creditplan.service';
import { AcadCreditPlan } from '../creditplans/models/acadcreditplan';
import { CourseInfo } from '../creditplans/models/courseinfo';
import { ElectiveCatPlan } from '../creditplans/models/electivecatplan';
import { CatCreditsEarned } from '../creditplans/models/studentinfo';
import { Decision, DecisionStatus } from '../creditplans/models/decisionstatus';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CreditPlanApprovalRequest } from '../creditplans/models/creditplanapprovalreq';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-displaycreditplan',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgbTooltipModule
  ],
  templateUrl: './displaycreditplan.component.html',
})

export class DisplayCreditPlanComponent {
  plan: AcadCreditPlan | null = null;
  remarks: FormControl = new FormControl('');
  DecisionStatus: typeof DecisionStatus = DecisionStatus;
  Decision: typeof Decision = Decision;

  constructor(
    private creditPlanService: CreditPlanService
  ) {
    this.creditPlanService.creditPlanEvent.subscribe((plan: AcadCreditPlan | null) => {
      this.plan = plan;
    });
  }

  totalCreditsEarned(): number {
    var total = 0;
    this.plan?.studentInfo.creditsEarned.forEach((cred: CatCreditsEarned) => {
      total += cred.earned;
    })
    return total;
  }

  totalCreditRange(): string {
    var min: number = 0;
    var max: number = 0;

    this.plan?.corePlan.forEach((core: CourseInfo) => {
      min += core.credits;
      max += core.credits;
    });

    this.plan?.electivePlan.forEach((ele: ElectiveCatPlan) => {
      min += ele.minCredits;
      max += ele.maxCredits;
    });

    return min.toString() + ' - ' + max.toString();
  }

  rejectCreditPlan(plan: AcadCreditPlan) {
    if (this.remarks.value.replace(' ', '').length == 0) {
      alert('Remarks are mandatory for rejections.');
      return;
    }
    
    var request: CreditPlanApprovalRequest = {
      decisions: []
    };

    plan.decisionStatus = DecisionStatus.REJECTED;
    plan.decisionRemarks = this.remarks.value.replace(' ', '');

    request.decisions.push({
      id: plan.id,
      decision: Decision.REJECT,
      remarks: plan.decisionRemarks
    });

    this.remarks.patchValue('');

    this.creditPlanService.submitCreditPlanDecisions(request)
      .then(() => {
        alert('Submission was sucessful.');

      }).catch(() => {
        alert('Submission was not sucessful.');
        plan.decisionStatus = DecisionStatus.PENDING;
        plan.decisionRemarks = '';
      });
  }

  acceptCreditPlan(plan: AcadCreditPlan) {
    if (this.remarks.value.replace(' ', '').length == 0 && this.plan?.atRisk) {
      alert('Remarks are mandatory for accepting risky credit plans.');
      return;
    }

    var request: CreditPlanApprovalRequest = {
      decisions: []
    };

    plan.decisionStatus = DecisionStatus.ACCEPTED;
    plan.decisionRemarks = 'It is a safe credit plan';

    if(this.plan?.atRisk)
      plan.decisionRemarks = this.remarks.value.replace(' ', '');

    request.decisions.push({
      id: plan.id,
      decision: Decision.ACCEPT,
      remarks: plan.decisionRemarks
    });

    this.remarks.patchValue('');

    this.creditPlanService.submitCreditPlanDecisions(request)
      .then(() => {
        alert('Submission was sucessful.');

      }).catch(() => {
        alert('Submission was not sucessful.');
        plan.decisionStatus = DecisionStatus.PENDING;
        plan.decisionRemarks = '';
      });
  }
}
