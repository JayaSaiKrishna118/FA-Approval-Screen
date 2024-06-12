import { Component, OnInit, SimpleChanges, inject } from '@angular/core';
import { StudentRiskComponent } from './student-risk/student-risk.component';
import { StudentSearchComponent } from './student-search/student-search.component';
import { RouterOutlet } from '@angular/router';
import { ApprovalStatus, StudentInfo } from '../models';
import { StudentInfoService } from './services/student-info.service';
import { HttpClientModule } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-student-approval',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, StudentRiskComponent, StudentSearchComponent],
  providers: [StudentInfoService],
  templateUrl: './student-approval.component.html',
})
export class StudentApprovalComponent implements OnInit {
  studentsInfo: StudentInfo[] = [];
  name!: string;
  studentApprovalUpdate = new EventEmitter<StudentInfo[]>();

  constructor(private studentInfoService: StudentInfoService) {}

  ngOnInit(): void {
    this.getStudentInfo();
  }

  getStudentInfo(): void {
    this.studentInfoService.getStudents().subscribe({
      next: (data) => {
        this.studentsInfo = data;        
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  approveAllStudents(studentList: StudentInfo[]): void {
    console.log("list to update", studentList)
    this.studentInfoService.approveAllStudents(studentList);
    console.log("Updated...", this.studentsInfo)
    // this.getStudentInfo();  // Refresh the list after approval
  }

}