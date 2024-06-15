import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbNavModule, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap'
import { Observable, OperatorFunction, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { CreditPlansComponent } from './creditplans/creditplans.component';
import { AcadCreditPlan } from './creditplans/models/acadcreditplan';
import { Data } from './creditplans/data';
import { DecisionStatus } from './creditplans/models/decisionstatus';
import { DisplayCreditPlanComponent } from './displaycreditplan/displaycreditplan.component';
import { CreditPlanService } from './creditplan.service';


@Component({
  selector: 'app-creditplanapproval',
  standalone: true,
  imports: [
    NgbNavModule,
    NgbTypeahead,
    NgbAccordionModule,
    FormsModule,
    CreditPlansComponent,
    DisplayCreditPlanComponent
  ],
  templateUrl: './creditplanapproval.component.html'
})


export class CreditplanapprovalComponent {
  activeTab: number = 0;
  model: any;
  states: string[] = [];
  creditPlans: AcadCreditPlan[] = [];
  DecisionStatus: typeof DecisionStatus = DecisionStatus;
  studentNames: string[] = [];

  constructor(
    private creditPlanService: CreditPlanService
  ) {
    this.creditPlans = Data.creditPlans.sort((a: AcadCreditPlan, b: AcadCreditPlan) => {
      if (a.studentInfo.name >= b.studentInfo.name)
        return 1;
      else
        return -1;
    });
    this.creditPlans.forEach((plan: AcadCreditPlan) => {
      this.studentNames.push(plan.studentInfo.name + ' (' + plan.studentInfo.program + ')')
    });
    this.getDecision();
  }

  formatter = (plan: AcadCreditPlan) => plan.studentInfo.name + ' (' + plan.studentInfo.program + ')';

  search: OperatorFunction<string, readonly AcadCreditPlan[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 1 ? [] : this.creditPlans.filter(
          (v: AcadCreditPlan) => {
            var text = v.studentInfo.name.toLowerCase() + ' ' + v.studentInfo.program.toLowerCase();
            return text.indexOf(term.toLowerCase()) > -1
          }),
      ),
    );

  navChange() {
    this.creditPlanService.emit(null);
  }

  getDecision(): string[] {
    return Object.keys(DecisionStatus);
  }

  toDecisionStatusObj(status: string): DecisionStatus {
    return status as DecisionStatus;
  }

  onSelect($event: any) {
    this.creditPlanService.emit($event.item);
  }


}
