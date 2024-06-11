import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { STUDENT, StudentInfo, StudentInfoGetRequest } from '../../models';
import { StudentMainComponent } from '../student-main.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [NgbAccordionModule,StudentMainComponent,CommonModule],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit{
  student: any
  name!: StudentInfo[]
  program!: StudentInfo[]
  studentService: any
  filteredStudents: StudentInfo[] = []


  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe((student: any) => {
      this.student = student;
      this.filterStudents(); // Call the filter function after fetching students
    });
  }

  filterStudents(): void {
  const rollNo= this.route.snapshot.paramMap.get('rollNo');
  this.student=STUDENT.infos.find((student: { rollNo: string | null; }) => student.rollNo === rollNo);
  }
}
