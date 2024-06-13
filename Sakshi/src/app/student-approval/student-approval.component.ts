import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  NgbAccordionModule,
  NgbNavModule,
  NgbTypeahead,
  NgbTypeaheadModule,
  NgbTypeaheadSelectItemEvent,
} from '@ng-bootstrap/ng-bootstrap';
import { ApprovalRequest, ApprovalStatus, StudentInfo } from '../models';
import { RouterModule, RouterOutlet } from '@angular/router';
import {
  Subject,
  OperatorFunction,
  Observable,
  debounceTime,
  distinctUntilChanged,
  filter,
  merge,
  map,
} from 'rxjs';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { STUDENTS_DATA } from '../student-info-data';

@Component({
  selector: 'app-student-approval',
  standalone: true,
  imports: [
    NgbAccordionModule,
    RouterOutlet,
    RouterModule,
    NgbTypeaheadModule,
    FormsModule,
    NgbNavModule,
    NgbTypeahead,
    JsonPipe,
  ],
  templateUrl: './student-approval.component.html',
  styleUrl: './student-approval.component.css',
})
export class StudentApprovalComponent implements AfterViewInit {
  students!: StudentInfo[];
  atRisk: StudentInfo[] = [];
  notAtRisk: StudentInfo[] = [];
  filteredStudent: StudentInfo = {} as StudentInfo;
  isApproved = false;
  approvalStatus: StudentInfo[] = [];
  ApprovalStatus = ApprovalStatus;
  selectstudent = false;
  student: any;
  remarks!: StudentInfo

  active = 1;

  //constructor initialized
  constructor() {
    this.students = STUDENTS_DATA.infos;
    console.log(this.students);
    this.atRisk = this.students.filter(
      (student) =>
        student.atRisk && student.approvalStatus === ApprovalStatus.PENDING
    );
    this.notAtRisk = this.students.filter(
      (student) =>
        !student.atRisk && student.approvalStatus === ApprovalStatus.PENDING
    );
  }

  //searching logic
  model: any;

  @ViewChild('instance', { static: true })
  instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  filteredResults: StudentInfo[] = [];

  ngAfterViewInit() {
    if (this.instance) {
      this.instance.isPopupOpen = () => false;
    }
  }


  selectRollNo(event: { target: { value: any; }; }, type: string){
    const rollNo = event.target.value;
    if (type === 'atRisk') {
      this.atRisk = this.atRisk.filter(student => student.rollNo === rollNo);
    } else if (type === 'notAtRisk') {
      this.notAtRisk = this.notAtRisk.filter(student => student.rollNo === rollNo);
    }
  }

  onselect() {
    console.log(this.model);

    this.student = this.students.filter((term) => {
      return term.rollNo == this.model.split(' ')[1];
      console.log(this.model.split(' ')[1], term.rollNo);
    })[0];
    if (this.model == ' ') {
      return;
    } else {
      this.selectstudent = true;
    }
  }

  onStudentSelected(event: NgbTypeaheadSelectItemEvent<StudentInfo>): void {
    this.filteredStudent = event.item;
  }

  //function for student search
  search: OperatorFunction<string, readonly StudentInfo[]> = (
    text$: Observable<string>
  ) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$.pipe(
      filter(() => this.instance && !this.instance.isPopupOpen)
    );
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) => {
        const trimmedTerm = term.trim().toLowerCase();
        if (trimmedTerm === '') {
          return this.students;
        } else {
          const filteredResults = this.filterStudents(trimmedTerm);
          // Calculate the maximum number of results that can be displayed
          const maxResults = Math.min(filteredResults.length, 5);
          return filteredResults.slice(0, maxResults);
        }
      })
    );
  };

  //Search Student list
  filterStudents(term: string): StudentInfo[] {
    const lowerTerm = term.toLowerCase();
    return this.students.filter(
      (student) =>
        student.name.toLowerCase().includes(lowerTerm) ||
        student.rollNo.toLowerCase().includes(lowerTerm)
    );
  }

  formatter = (result: StudentInfo) => {
    this.filteredStudent = result;
    return result.name;
  };

  //Approve function
  approveStudent(): void {
    if (
      !this.filteredStudent.atRisk &&
      this.filteredStudent.approvalStatus === ApprovalStatus.PENDING
    ) {
      const approvalRequest: ApprovalRequest = {
        rollNo: this.filteredStudent.rollNo,
        isApproved: true,
        remarks: 'Approved',
      };
      this.download(approvalRequest);
      this.sendApprovalRequest(approvalRequest);
      alert('Successfully Approved');
    }
  }

  //Download Function for Json data
  private download(data: any): void {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(data));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'data.json');
    document.body.appendChild(downloadAnchorNode); // Required for Firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  //Reject Button function
  rejectStudent(): void {
    if (this.filteredStudent.approvalStatus === ApprovalStatus.PENDING) {
      const approvalRequest: ApprovalRequest = {
        rollNo: this.filteredStudent.rollNo,
        isApproved: true,
        remarks: 'Rejected',
      };

      this.sendApprovalRequest(approvalRequest);
      this.download(approvalRequest);
      alert('Rejected Successfully');
    }
  }

  //ApprovalRequest function
  sendApprovalRequest(approvalRequest: ApprovalRequest): void {
    console.log('Approval request sent successfully');

    // Update approval status locally
    this.students.forEach((student) => {
      if (student.rollNo === approvalRequest.rollNo) {
        student.approvalStatus = approvalRequest.isApproved
          ? ApprovalStatus.APPROVED
          : ApprovalStatus.REJECTED;
        student.approvalRemarks = approvalRequest.remarks;
      }
    });

    // If approved, remove from atRisk or notAtRisk list
    if (approvalRequest.isApproved) {
      const index = this.atRisk.findIndex(
        (student) => student.rollNo === approvalRequest.rollNo
      );
      if (index !== -1) {
        this.atRisk.splice(index, 1);
      } else {
        const index = this.notAtRisk.findIndex(
          (student) => student.rollNo === approvalRequest.rollNo
        );
        if (index !== -1) {
          this.notAtRisk.splice(index, 1);
        }
      }
    }
  }

  //Approve All function
  approveAll() {
    this.students.forEach((student) => {
      if (
        student.atRisk === false &&
        student.approvalStatus === ApprovalStatus.PENDING
      ) {
        student.approvalStatus = ApprovalStatus.APPROVED;
      }
    });

    // Creates an array of roll numbers of approved students
    const approvedRollNos = this.students
      .filter((student) => student.approvalStatus === ApprovalStatus.APPROVED)
      .map((student) => student.rollNo);

    // Update the notAtRisk list by filtering out the approved students
    this.notAtRisk = this.notAtRisk.filter(
      (student) => !approvedRollNos.includes(student.rollNo)
    );

    this.download(this.students);
    console.log('All students approved successfully.');
    alert('All approved Successfully.');
  }

  approvedStudent(): void {
    this.students.forEach((student) => {
      if (student.approvalStatus === ApprovalStatus.APPROVED) {
        console.log('Already Approved');
        alert('Already Approved');
      }
    });
  }
}
