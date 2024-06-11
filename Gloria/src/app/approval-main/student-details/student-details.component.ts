import { Component, Input, OnInit } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { StudentInfo } from '../../models';
import { STUDENTS_DATA } from '../../student-details-data';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [NgbAccordionModule,RouterOutlet],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit {


  @Input()
  student!: StudentInfo;
constructor(private route: ActivatedRoute) { 
}
// student:StudentInfo = {} as StudentInfo;

ngOnInit(): void {
  const rollNo = this.route.snapshot.params['id'];
  this.getStudentInfo(rollNo);
}

getStudentInfo(rollNo: any): void{

  STUDENTS_DATA.infos.forEach(student =>
    {
      if(student.rollNo === rollNo)
        {
          this.student = student;
        }
    }
  );
}
}
