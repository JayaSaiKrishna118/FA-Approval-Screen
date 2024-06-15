import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AcadCreditPlan } from './creditplans/models/acadcreditplan';
import { CreditPlanApprovalRequest } from './creditplans/models/creditplanapprovalreq';

@Injectable({
  providedIn: 'root'
})

export class CreditPlanService {
  private subject: Subject<AcadCreditPlan | null> = new Subject();
  
  constructor() { }

  creditPlanEvent = this.subject.asObservable();

  emit(plan: AcadCreditPlan | null) {
    this.subject.next(plan);
  }

  submitCreditPlanDecisions(request: CreditPlanApprovalRequest) {
    return new Promise((resolve, reject) => {
      console.log(request);
      this.subject.next(null);
      resolve('')
    });
  }

}
