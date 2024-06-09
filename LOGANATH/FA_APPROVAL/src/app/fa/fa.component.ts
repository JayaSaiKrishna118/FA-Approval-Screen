import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StudentInfo, ApprovalRequest, ApprovalStatus} from '../model/datatype';
import { Studentinfo } from '../model/students.json';
import { Observable, OperatorFunction, debounceTime, distinctUntilChanged, map } from 'rxjs';
//TODO: add accepted/rejected part in left side
//TODO: maximize info shown per screen size
//TODO: alter the student details
//TODO: make the core and elective part without button
//TODO: use typeahead for search
//TODO: remove all rounded-pill and use light version
//TODO: use previous semester core and cgpa to display (3/ credits done)
//TODO: shift approve or reject above
//TODO: make an approachable code
@Component({
  selector: 'app-fa',
  standalone: true,
  imports: [NgbModule,ReactiveFormsModule],
  templateUrl: './fa.component.html',
  styleUrl: './fa.component.css'
})

export class FaComponent {
  students : StudentInfo[] = [];
  filtereditems : string[] = [];
  notatrisk : StudentInfo[] = [];
  searchstr = new FormControl('',{nonNullable:true});
  newremarks = new FormControl('',{nonNullable:true});
  isstudsel : boolean = false;
  selstudroll !: StudentInfo;
  backdrops : number = 0;
  backlogs = new Map<string,number>();

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(350),
			distinctUntilChanged(),
			map((term) =>
				term.length < 1 ? [] : this.searchfilter(term),
			),
		);

  constructor(){
    this.students = Studentinfo;
    for(let s of this.students){
      if(!s.atRisk) this.notatrisk.push(s);
      this.past(s);
      this.backlogs.set(s.rollNo,this.backdrops);
    }
  }
  
  searchfilter(text:string) : string[]{
    this.filtereditems = [];
    for(let stud of this.students){
      if(stud.rollNo.toLowerCase().indexOf(text)>-1) this.filtereditems.push(`${stud.rollNo} - ${stud.name}`)
    }
    return this.filtereditems
  }

  searchclick(event : any,str: string){
    if(str == "") return;
    this.selstudroll = this.students.filter((item) => {
      return (item.rollNo==str.split(' ')[0]);
      })[0];
    this.isstudsel = true;
  }
  
  remarks(){
    this.selstudroll.approvalRemarks = this.newremarks.value;
  }

  approve_reject(isapp : boolean){
    let student :ApprovalRequest = {
      "rollNo" : this.selstudroll.rollNo,
      "isApproved" : isapp ,
      "remarks" : this.selstudroll.approvalRemarks
    };
    if(isapp) this.selstudroll.approvalStatus = ApprovalStatus.APPROVED;
    else if(!isapp) this.selstudroll.approvalStatus = ApprovalStatus.REJECTED;
    const blob = new Blob([JSON.stringify(student)],{type:'application/json'})
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'output.json';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  approve_all(){
    var students: ApprovalRequest[] = [];
    for(let stud of this.notatrisk){
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
    this.notatrisk = [];
  }

  pending(stud : StudentInfo){
    if(stud.approvalStatus==ApprovalStatus.PENDING) return "PENDING";
    else if(stud.approvalStatus==ApprovalStatus.REJECTED) return "REJECTED";
    else return "APPROVED";
  }

  past(student:StudentInfo){
    this.backdrops = 0;
    for(let cour of student.pastCourses){
      if(cour.credits_acquired<cour.total_credits) this.backdrops++;
    }
  }

}
