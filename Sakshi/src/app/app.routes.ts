import { Routes } from '@angular/router';
import path from 'path';
import { StudentApprovalComponent } from './student-approval/student-approval.component';
export const routes: Routes = [
{  path:'', redirectTo: 'student-approval', pathMatch: 'full'},
   { path: 'student-approval', component: StudentApprovalComponent
   },
]
