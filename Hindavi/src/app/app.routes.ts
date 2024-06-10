import { RouterModule, Routes } from '@angular/router';
import { StudentApprovalComponent } from './student-approval/student-approval.component';
import { DisplayJsonComponent } from './display-json/display-json.component';

export const routes: Routes = [
    {path: '', redirectTo:'student-approval', pathMatch: 'full' },
    { path: 'student-approval', component: StudentApprovalComponent},
    {path: 'displayJson', component: DisplayJsonComponent},  
];


