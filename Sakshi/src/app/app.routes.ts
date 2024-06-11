import { Routes } from '@angular/router';
import { StudentMainComponent } from './student-main/student-main.component';
import { StudentDetailsComponent } from './student-main/student-details/student-details.component';

export const routes: Routes = [
    {path:'', redirectTo:'student-main', pathMatch:'full'},
    {path:'student-main',component:StudentMainComponent},
    {path:'student-main/:rollNo', component:StudentDetailsComponent}
];
