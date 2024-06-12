import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  NgbAccordionModule,
  NgbTypeahead,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import {
  ApprovalRequest,
  ApprovalStatus,
  StudentInfo,
  StudentInfoGetRequest,
} from '../models';
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
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-approval',
  standalone: true,
  imports: [
    NgbAccordionModule,
    RouterOutlet,
    RouterModule,
    NgbTypeaheadModule,
    FormsModule,
    NgbTypeahead,
    JsonPipe,
  ],
  templateUrl: './student-approval.component.html',
  styleUrl: './student-approval.component.css',
})
export class StudentApprovalComponent implements AfterViewInit {
  students: StudentInfo[] = [];
  atRisk: StudentInfo[] = [];
  notAtRisk: StudentInfo[] = [];
  filteredStudent: StudentInfo = {} as StudentInfo;
  isApproved = false;
  approvalStatus:StudentInfo[]=[]
  ApprovalStatus= ApprovalStatus;

  constructor() {
    this.students = STUDENTS_DATA.infos;
    console.log(this.students);
    this.atRisk = this.students.filter((student) => student.atRisk);
    this.notAtRisk = this.students.filter((student) => !student.atRisk);
  }

  //searching logic
  model: any;

  @ViewChild('instance', { static: true })
  instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  filteredResults: StudentInfo[] = [];

  ngAfterViewInit() {
    // Ensure instance is correctly initialized
    if (this.instance) {
      this.instance.isPopupOpen = () => false;
    }
  }

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
      map((term) =>
        term.trim() === '' ? this.students : this.filterStudents(term.trim())
      )
    );
  };

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

  approveStudent(): void {
    if (
      this.filteredStudent.atRisk &&
      this.filteredStudent.approvalStatus === ApprovalStatus.PENDING
    ) {
      const approvalRequest: ApprovalRequest = {
        rollNo: this.filteredStudent.rollNo,
        isApproved: true,
        remarks: 'Approved',
      };
      this.sendApprovalRequest(approvalRequest);
    }
  }

  rejectStudent(): void {
    if (
      this.filteredStudent.atRisk &&
      this.filteredStudent.approvalStatus === ApprovalStatus.PENDING
    ) {
      const approvalRequest: ApprovalRequest = {
        rollNo: this.filteredStudent.rollNo,

        isApproved: false,

        remarks: 'Rejected',
      };

      this.sendApprovalRequest(approvalRequest);
    }
  }

  sendApprovalRequest(approvalRequest: ApprovalRequest): void {
    console.log('Approval request sent successfully');

    // update the student info locally
    this.filteredStudent.approvalStatus = approvalRequest.isApproved
      ? ApprovalStatus.APPROVED
      : ApprovalStatus.REJECTED;

    this.filteredStudent.approvalRemarks = approvalRequest.remarks;
  }
  approveAll() {
    this.students.forEach((student) => {
      if (
        student.atRisk === false &&
        student.approvalStatus === ApprovalStatus.PENDING
      ) {
        student.approvalStatus = ApprovalStatus.APPROVED;
      }
    });
    console.log('All students approved successfully.');
  }
  updateStudent(student: StudentInfo) {
    const studentJson = JSON.stringify(student, null, 2);
    console.log('Student JSON:', studentJson);
  }
}
