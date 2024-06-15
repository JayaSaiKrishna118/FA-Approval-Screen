import { Routes } from '@angular/router';
import { ApprovalMainComponent } from './approval-main/approval-main.component';
// import { StudentDetailsComponent } from './approval-main/student-details/student-details.component';
// import path from 'path';
export const routes: Routes = [

{ path:'', redirectTo: 'approval-main', pathMatch: 'full' },
     {path: 'approval-main', component: ApprovalMainComponent,
        // children:
        // [
        //     {
        //         path: ':id', component: StudentDetailsComponent
        //     }
        // ]
     },

];