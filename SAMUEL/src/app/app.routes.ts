import { Routes } from '@angular/router';
import { ApproveCreditPlanComponent } from './approve-credit-plan/approve-credit-plan.component';
import { StudentApprovalComponent } from './student-approval/student-approval.component';
import { StudentInfoComponent } from './student-approval/student-info/student-info.component';

export const routes: Routes = [
    { path:'', redirectTo:'approve-credit-plan', pathMatch:'full' }, 
    { path: 'approve-credit-plan', component: ApproveCreditPlanComponent },
    { path:'student-approval', component:StudentApprovalComponent, children: [
        { path: ':rollNo', component: StudentInfoComponent }
    ]}
];
