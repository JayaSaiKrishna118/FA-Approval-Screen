import { Component, viewChild } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgbModule, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Studentinfo } from '../../students.json';
// import '../../Skeleton' ;
import * as models from '../../Skeleton';
import { NgFor, NgIf } from '@angular/common';
import { StudentComponent } from './student/student.component';
import { Observable, Subject, merge, OperatorFunction } from 'rxjs';
import { ViewChild } from '@angular/core';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbModule, FormsModule, NgFor, NgIf, StudentComponent, NgbTypeaheadModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent {
  // title: string = 'approvalPage';
  // variable: string = '';
  displayFlag: boolean = false;

  // notAtRiskandApproved: boolean = true;
  inputRemark: string = '';
  students: models.StudentInfo[] = Studentinfo;

  student: string = '';
  displayedData: models.StudentInfo[] = [];
  selectedStudent !: models.StudentInfo;
  approveAllClicked: boolean = false;

  displayText: string = '';

  model: string = '';
  preApproveAll(): boolean{
    for(let i = 0; i < this.students.length; i++){
      if(this.students[i].approvalStatus != models.ApprovalStatus.APPROVED && this.students[i].atRisk == false)
        return true;
      }
    return false;
  }

  filterStudent(student: models.StudentInfo): boolean{
    if(this.student){
      // let x = student;
      if (student.name.includes(this.student))  
        return true;
      if(student.rollNo.includes(this.student))
        return true;
      return false;
    }
    return false;
  }

  wasApproved(student: models.StudentInfo): boolean{
    if(student.approvalStatus == models.ApprovalStatus.APPROVED)
        return true;
    return false;
  }

  // isSelected(): boolean{
  //   this.displayFlag = true;
  //   if(!this.selectedStudent)
  //     return false;
  //   return true;
  // }

  searchResult(): string{
    // console.log(this.student);
    this.displayFlag = (this.student != '');
    this.displayedData = this.students.filter(c => this.filterStudent(c));

    return this.displayedData.toString();
    // console.log(this.displayedData);
  }


  onClick(student: models.StudentInfo): void{
    this.displayFlag = true;
    this.displayText = '';
    // if(this.student)  
      this.selectedStudent = student;

  }

  approveAll(): void{
    this.approveAllClicked = true;
    for(let i of this.students){
      if(!i.atRisk){
        i.approvalStatus = models.ApprovalStatus.APPROVED;
      }
    }

    this.downloadRequestObject();
  }

  approveStudent(): void{
    this.approveAllClicked = false;
    this.selectedStudent.approvalStatus = models.ApprovalStatus.APPROVED;
    this.downloadRequestObject();
    
  }

  giveRemark(): void{
    // console.log(this.inputRemark);
    this.selectedStudent.approvalRemarks = this.inputRemark;
    // console.log(this.student.approvalRemarks);
  }

  rejectStudent(): void{
    this.approveAllClicked = false;
    this.giveRemark();

    if(this.selectedStudent.approvalRemarks == ''){
      this.displayText = "Please remember to give the student a remark for rejection!";
      return;
    }
    
      this.selectedStudent.approvalStatus = models.ApprovalStatus.REJECTED;
      this.downloadRequestObject();
    
  }


  outFunction(): models.ApprovalRequest[]{
    
    let tempData: models.ApprovalRequest[] = []; 
    if(this.approveAllClicked){
      for(let i=0; i<this.students.length; i++){
        // let this.tempData = {};
        // this.tempData.isApproved = (this.students[i].approvalStatus == models.ApprovalStatus.APPROVED);
        // this.tempData.rollNo = this.students[i].rollNo;
        // this.tempData.remarks = this.students[i].approvalRemarks;
        if(this.students[i].atRisk == false){
          let student: models.ApprovalRequest = {
            isApproved : (this.students[i].approvalStatus == models.ApprovalStatus.APPROVED),
            rollNo : this.students[i].rollNo,
            remarks : this.students[i].approvalRemarks
          }

          tempData.push(student);
        }
        
      }
    }
    else{
      let student: models.ApprovalRequest = {
        isApproved : (this.selectedStudent.approvalStatus == models.ApprovalStatus.APPROVED),
        rollNo : this.selectedStudent.rollNo,
        remarks : this.selectedStudent.approvalRemarks
      }

      tempData.push(student);
    }

    // console.log(tempData);
    return tempData;
    // let obj: any = JSON.stringify(this.outputFile);
    // console.log(obj);
    
  }

  convertToJsonFile(): Blob{
    // this.outFunction();
    const sessionObject: models.ApprovalRequest[] = this.outFunction();
    const jsonString = JSON.stringify(sessionObject);
    const blob = new Blob([jsonString], { type: 'application/json' });
    return blob;
  }

  downloadRequestObject(){
    const blob = this.convertToJsonFile();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'network_calls.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  @ViewChild('instance', { static: true })
  instance!: NgbTypeahead;

	focus$ = new Subject<string>();
	click$ = new Subject<string>();

	search: OperatorFunction<string, readonly models.StudentInfo[]> = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
		const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
		const inputFocus$ = this.focus$;

		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			map((term) =>
				(term === '' ? this.students : this.students.filter((v) => this.filterStudent(v))).slice(0, 10),
			),
		);
	};
}
