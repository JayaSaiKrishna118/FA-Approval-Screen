import { Component, OnInit, SimpleChanges, signal } from '@angular/core';
import { StudentRiskComponent } from './student-risk/student-risk.component';
import { StudentSearchComponent } from './student-search/student-search.component';
import { RouterOutlet } from '@angular/router';
import { ApprovalStatus, StudentInfo } from '../models';
import { StudentInfoService } from './services/student-info.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-student-approval',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule, StudentRiskComponent, StudentSearchComponent, ],
  providers: [StudentInfoService],
  templateUrl: './student-approval.component.html',
})
export class StudentApprovalComponent  implements OnInit{
  studentsInfo: StudentInfo[] = [];
  name!: string;

  constructor(private studentInfoService: StudentInfoService) {}

  ngOnInit(): void {
    this.getStudentInfo();
  }

  getStudentInfo(): void {
    this.studentInfoService.getStudentsInfo().subscribe({
      next: (data) => {
        this.studentsInfo = data.info;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  updateStudentList(updatedStudents: StudentInfo[]): void {
    console.log("UPDATED", updatedStudents)
    this.studentsInfo = this.studentsInfo.map(student => {
      const update = updatedStudents.find(u => u.rollNo === student.rollNo);
      return update ? { ...student, approvalStatus: ApprovalStatus.APPROVED } : student;
    });
  }
}
