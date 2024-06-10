import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentSearchComponent } from './student-search/student-search.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentApprovalComponent } from './student-approval/student-approval.component';



interface StudentInfo {
  rollNo: string;
  name: string;
  atRisk: boolean;
}

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    StudentApprovalComponent, 
  ],
})
export class AppComponent implements OnInit {
  title = 'credit-plan-sys';
  panelOpenState1 = false;
  panelOpenState2 = false;
  students: StudentInfo[] = [];
  atRiskStudents: StudentInfo[] = [];
  notAtRiskStudents: StudentInfo[] = [];

  constructor() {}
  ngOnInit() {}
}
