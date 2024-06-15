import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Injectable, Input, OnInit, ViewChild, model } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import {
  NgbAccordionModule,
  NgbAlertModule,
  NgbNavModule,
  NgbTypeahead,
  NgbTypeaheadModule,
  NgbTypeaheadSelectItemEvent,
} from '@ng-bootstrap/ng-bootstrap';
import {
  Observable,
  OperatorFunction,
  Subject,
  debounceTime,
  distinctUntilChanged,
  merge,
  of,
} from 'rxjs';
import { filter, map } from 'rxjs/operators';
// import { StudentDetailsComponent } from './student-details/student-details.component';
import { ApprovalRequest, ApprovalStatus, StudentInfo, StudentInfoGetRequest } from '../models';
import { STUDENTS_DATA } from '../student-details-data';
import { ServiceService } from '../student-service';

const states = [
  'Gloria',
  'Femina',
  'John',
  'Emma'
]

@Injectable({
  providedIn :'root'
})

@Component({
  selector: 'app-approval-main',
  standalone: true,
  templateUrl: './approval-main.component.html',
  styleUrl: './approval-main.component.css',
  imports: [
    RouterModule,
    NgbAccordionModule,
    RouterOutlet,
    NgbAlertModule,
    NgbTypeaheadModule,
    FormsModule,
    JsonPipe,
    CommonModule,
    ReactiveFormsModule,
    NgbNavModule
  ],
  providers:[ServiceService],
})
export class ApprovalMainComponent implements OnInit {
  selectedStudent: StudentInfo  | undefined
  students: StudentInfo[] = [];
  atRisk: StudentInfo[] = [];
  notAtRisk: StudentInfo[] = [];
  pending: StudentInfo[] = [];
  click$ = new Subject<string>();
  focus$ = new Subject<string>();
  model: string ="" 
  searchControl = new FormControl();
  searchResults: StudentInfo[] = [];
  filteredStudent: StudentInfo = {} as StudentInfo;
  studentselected = false
  http: any;
  backdrops: number = 0;
  backlogs = new Map<string,number>();
  active=1;
  

  @ViewChild('instance', { static: true }) instance: NgbTypeahead | undefined;
  newremarks: any;
 
  

  ngOnInit(): void {
    this.students = STUDENTS_DATA.infos;
    this.atRisk = this.students.filter((student) => student.atRisk);
    this.notAtRisk = this.students.filter((student) => !student.atRisk);
    this.pending = this.students.filter((student) => student['pending']);
    // const h = this.atRisk;
  }

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((value: string) => {
        this.searchResults = this.students.filter((student) =>
          student.name.toLowerCase().includes(value.toLowerCase())
        );
      });

      // this.students = StudentInfo;
      for(let s of this.students){
        if(!s.atRisk) this.notAtRisk.push(s);
        this.past(s);
        this.backlogs.set(s.rollNo,this.backdrops);
      }
  }
onselect(student : StudentInfo){
 
  console.log(this.model)

  this.student = this.students.filter((term)=>{
    
    return term.rollNo== this.model.split(" ")[1]
    console.log(this.model.split(" ")[1] , term.rollNo);
  })[0];
  if(this.model==" ")
  {  return }
  else{
  this.studentselected= true
  }
}

  onStudentSelected(event: NgbTypeaheadSelectItemEvent<StudentInfo>): void
  {
this.selectedStudent =event.item;
  }

  sendData() {
    this.http.post('student-details-data.json', this.model).subscribe(
      (response: any) => console.log(response),
      (error: any) => console.log(error)
    );
  }

 

  search = (text$: Observable<string>): Observable<any[]> =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term: string) => {
        if (term.length < 1) {
          return [];
        } else {
          const filteredStudent = this.students
            .filter(
              (v) =>
                v.name.toLowerCase().includes(term.toLowerCase()) ||
                v.rollNo.toLowerCase().includes(term.toLowerCase())
            )
            .slice(0, 10);
          return filteredStudent.map(
            (student: StudentInfo) => `${student.name} ${student.rollNo}`
          );
        }
      })
    );


  selectStudent(studentName: StudentInfo) : void {
    
    this.selectedStudent = this.students[0];
  }

  onSearch(term: string): StudentInfo[] | void {
    this.search(of(term)).subscribe(
      (results) => (this.searchResults = results)
    );
    this.sendData();
    this.selectedStudent = this.searchResults.find(
      (student) => student.name === term || student.rollNo === term
    );
    if (this.selectedStudent) {
      // Display student details
      // ...
    } else {
      // handle the case when no student is found
    }

   
  }


  // @Input()
  
  @Input() 
  id : string=" "
  student! : StudentInfo
   filteredStudents: StudentInfo = {} as StudentInfo

   remarks(){
    this.student.approvalRemarks = this.newremarks.value;
  }

  approve_all(){
    // if(!this.selectedStudent?.atRisk)
    var students: ApprovalRequest[] = [];
    for(let stud of this.notAtRisk){
      let student :ApprovalRequest = {
        "rollNo" : stud.rollNo,
        "isApproved" : true ,
        "remarks" : stud.approvalRemarks
      };
      this.students.filter((item) => {
        return (item.rollNo==stud.rollNo);
      })[0].approvalStatus = ApprovalStatus.APPROVED;
      students.push(student);
      // console.log(student);
    }
    const blob = new Blob([JSON.stringify(students)],{type:'application/json'})
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'output.json';
    link.click();
    window.URL.revokeObjectURL(url);
    this.notAtRisk = [];
    alert("Successfully Approved All !")
  }

  approve_reject(isapp : boolean){

    // if(this.selectedStudent?.approvalStatus= ApprovalStatus.REJECTED)
    let student :ApprovalRequest = {
      "rollNo" : this.student.rollNo,
      "isApproved" : isapp ,
      "remarks" : this.student.approvalRemarks
    };
    if(isapp) {this.student.approvalStatus = ApprovalStatus.APPROVED;
    //  const h =false;
    console.log(this.student);
      alert("Approved Successfully !")
  }
   
    else if(!isapp) 
    {
      alert("Rejected Successfully !")
      this.student.approvalStatus = ApprovalStatus.REJECTED;}
    const blob = new Blob([JSON.stringify(student)],{type:'application/json'})
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'output.json';
    link.click();
    window.URL.revokeObjectURL(url);
    
    
  }


  Pending(student : StudentInfo){
    if(student.approvalStatus==ApprovalStatus.PENDING) return "PENDING";
    else if(student.approvalStatus==ApprovalStatus.REJECTED) return "REJECTED";
    else return "APPROVED";
  }

  past(student:StudentInfo){
    this.backdrops = 0;
    for(let cour of student['pastCourses']){
      if(cour.credits_acquired<cour.total_credits) this.backdrops++;
    }
  }

  

}