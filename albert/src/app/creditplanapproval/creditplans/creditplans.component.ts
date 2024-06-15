import { Component, Input } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbAccordionModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { AcadCreditPlan } from './models/acadcreditplan';
import { Decision, DecisionStatus } from './models/decisionstatus';
import { CreditPlanApprovalRequest, CreditPlanDecision } from './models/creditplanapprovalreq';
import { CreditPlanService } from '../creditplan.service';

@Component({
  selector: 'app-creditplans',
  standalone: true,
  imports: [
    NgbAccordionModule,
    NgbTooltipModule,
    FontAwesomeModule
  ],
  templateUrl: './creditplans.component.html'
})

export class CreditPlansComponent {
  @Input({ required: true }) creditPlans!: AcadCreditPlan[];
  @Input({ required: true }) atRisk!: boolean;
  @Input({ required: true }) decisionStatus!: DecisionStatus;
  DecisionStatus: typeof DecisionStatus = DecisionStatus;

  constructor(
    private faLibrary: FaIconLibrary,
    private creditPlanService: CreditPlanService
  ) {
    this.faLibrary.addIcons(faCheck, faInfoCircle);
  }



  approveSafePlans() {
    var request: CreditPlanApprovalRequest = {
      decisions: []
    };

    for (let plan of this.creditPlans) {
      if (!plan.atRisk && plan.decisionStatus == DecisionStatus.PENDING) {
        plan.decisionStatus = DecisionStatus.ACCEPTED;
        plan.decisionRemarks = 'It is a safe credit plan';
        request.decisions.push({
          id: plan.id,
          decision: Decision.ACCEPT,
          remarks: 'Approved'
        })
      }
    }

    if (request.decisions.length == 0) {
      alert('There are no safe credit plans that need approval.');
      return;
    }

    this.creditPlanService.submitCreditPlanDecisions(request)
      .then(() => {
        alert('Submission was sucessful.');
      }).catch(() => {
        alert('Submission was not sucessful.');
        request.decisions.forEach((value: CreditPlanDecision) => {
          for (let plan of this.creditPlans) {
            if (plan.id = value.id) {
              plan.decisionStatus = DecisionStatus.PENDING;
              plan.decisionRemarks = ''
            }
          }
        })
      });

  }

  displayCreditPlan($event: any, creditPlan: AcadCreditPlan) {
    this.creditPlanService.emit(creditPlan);
  }

}
