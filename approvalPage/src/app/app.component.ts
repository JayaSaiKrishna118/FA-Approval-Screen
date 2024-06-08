import { Component } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgbAccordionBody, NgbAccordionItem, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Studentinfo } from '../../students.json';
// import '../../Skeleton' ;
import * as models from '../../Skeleton';
import { NgFor, NgIf } from '@angular/common';
import { StudentComponent } from './student/student.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbModule, FormsModule, NgFor, NgIf, StudentComponent],
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

  searchResult(): void{
    // console.log(this.student);
    this.displayFlag = (this.student != '');
    this.displayedData = this.students.filter(c => this.filterStudent(c));

    // console.log(this.displayedData);
  }


  onClick(student: models.StudentInfo): void{
    this.displayFlag = true;
    // if(this.student)  
      this.selectedStudent = student;
    // else{
    //   this.selectedStudent = {
    //     rollNo: '',
    //     name: '',
    //     program: '',
    //     atRisk: false,
    //     riskDecs: '',
    //     coreCourses: [],
    //     electiveCredits:[], 
    //     approvalStatus: models.ApprovalStatus.PENDING,
    //     approvalRemarks: '',
    //   };
    // }
    // // console.log(this.selectedStudent.name);
  }

  approveAll(): void{
    for(let i of this.students){
      if(!i.atRisk){
        i.approvalStatus = models.ApprovalStatus.APPROVED;
      }
    }

    this.downloadRequestObject();
  }

  approveStudent(): void{
    this.selectedStudent.approvalStatus = models.ApprovalStatus.APPROVED;
    this.downloadRequestObject();
    
  }

  giveRemark(): void{
    // console.log(this.inputRemark);
    this.selectedStudent.approvalRemarks = this.inputRemark;
    // console.log(this.student.approvalRemarks);
  }

  rejectStudent(): void{
    this.selectedStudent.approvalStatus = models.ApprovalStatus.REJECTED;
    this.downloadRequestObject();
  }


  outFunction(): models.ApprovalRequest[]{
    let tempData: models.ApprovalRequest[] = []; 
    for(let i=0; i<this.students.length; i++){
      // let this.tempData = {};
      // this.tempData.isApproved = (this.students[i].approvalStatus == models.ApprovalStatus.APPROVED);
      // this.tempData.rollNo = this.students[i].rollNo;
      // this.tempData.remarks = this.students[i].approvalRemarks;
      let student: models.ApprovalRequest = {
        isApproved : (this.students[i].approvalStatus == models.ApprovalStatus.APPROVED),
        rollNo : this.students[i].rollNo,
        remarks : this.students[i].approvalRemarks
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


}
