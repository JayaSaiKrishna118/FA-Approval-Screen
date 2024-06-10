
import { JsonPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit,inject, Type, TemplateRef, ViewChild } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbActiveModal, NgbDropdownModule, NgbModal, NgbModule, NgbTypeaheadModule, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { ApprovalStatus, StudentInfo, StudentInfoGetRequest } from './studentinfo.model';
import { ServiceService } from '../service.service';






@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
  NgFor, 
  NgIf, 
  FilterPipe, 
  FormsModule, 
  NgbTypeaheadModule, 
  JsonPipe, 
  NgClass, 
  NgbAccordionModule, 
  NgbModule, 
  NgStyle,],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @ViewChild('confirmationModal') confirmationModal!: TemplateRef<any>;
  @ViewChild('approveModal') approveModal!: TemplateRef<any>;
  @ViewChild('rejectModal') rejectModal!: TemplateRef<any>;
  
  students: StudentInfo[] = [];
  selectedStudent: StudentInfo | null = null;
  ApprovalStatus = ApprovalStatus;
  approvalRemarks: string = '';
  showApproveAllButton: boolean = false;
  //icon=faPlus
  constructor(private studentService: ServiceService,private modalService: NgbModal) {
    this.fetchStudentInfo();
  }
  ngOnInit(): void {
    // Initialization logic, if any
  }
  
  fetchStudentInfo(): void {
    this.studentService.getStudentInfo().subscribe(
      (data: StudentInfoGetRequest) => {
        this.students = data.info.map(student => ({
          ...student,
          approvalStatus: ApprovalStatus[student.approvalStatus as unknown as keyof typeof ApprovalStatus]
        })) || [];
      },
      (error) => {
        console.error('Error fetching student info:', error);
      }
    );
  }
  

  search: OperatorFunction<string, readonly StudentInfo[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term =>
        of(term.length < 1 ? [] : this.students.filter(v => 
          v.name.toLowerCase().includes(term.toLowerCase()) || 
          v.rollNo.toLowerCase().includes(term.toLowerCase()))
        )
      )
    );
  
  formatResult(value: any) {
    if (value) {
      return `${value.rollNo} - ${value.name}`;
    }
    return '';
  }

  onStudentSelected(event: NgbTypeaheadSelectItemEvent<StudentInfo>): void {
    this.selectedStudent = event.item;
  }

  selectStudent(student: StudentInfo): void {
    this.selectedStudent = student;
  }

  approveStudent(): void {
    if (this.selectedStudent) {
      this.selectedStudent.approvalStatus = ApprovalStatus.APPROVED;
      this.selectedStudent.approvalRemarks = this.approvalRemarks;
      
      // Convert enum value to string for JSON
      const updatedStudent = {
        ...this.selectedStudent,
        approvalStatus: ApprovalStatus[this.selectedStudent.approvalStatus]
      };
  
      const updatedData = JSON.stringify(updatedStudent, null, 2);
      this.downloadFile(updatedData, 'approved_student.json');
    }
  }
  
  rejectStudent(): void {
    if (this.selectedStudent) {
      this.selectedStudent.approvalStatus = ApprovalStatus.REJECTED;
      this.selectedStudent.approvalRemarks = this.approvalRemarks;
      
      // Convert enum value to string for JSON
      const updatedStudent = {
        ...this.selectedStudent,
        approvalStatus: ApprovalStatus[this.selectedStudent.approvalStatus]
      };
  
      const updatedData = JSON.stringify(updatedStudent, null, 2);
      this.downloadFile(updatedData, 'rejected_student.json');
    }
  }
  approveAllStudents(): void {
    const notAtRiskStudents = this.getStudentsNotAtRisk();
    this.showApproveAllButton=false

    notAtRiskStudents.forEach(student => {
      student.approvalStatus = ApprovalStatus.APPROVED; // Update enum value
    });

    // Convert enum values to strings
    const updatedData = notAtRiskStudents.map(student => ({
      ...student,
      approvalStatus: ApprovalStatus[student.approvalStatus] // Convert enum to string
    }));

    const jsonData = JSON.stringify(updatedData, null, 2);
    this.downloadFile(jsonData, 'approved_students.json');
  }

  downloadFile(data: string, filename: string): void {
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  getStudentsAtRisk(): StudentInfo[] {
    return this.students.filter(student => student.atRisk && student.approvalStatus==ApprovalStatus.PENDING);
  }
  
  getStudentsNotAtRisk(): StudentInfo[] {
    return this.students.filter(student => !student.atRisk && student.approvalStatus==ApprovalStatus.PENDING);
  }
  
  getApprovedStudents(): StudentInfo[] {
    return this.students.filter(student => student.approvalStatus === ApprovalStatus.APPROVED);
  }
  
  getRejectedStudents(): StudentInfo[] {
    return this.students.filter(student => student.approvalStatus === ApprovalStatus.REJECTED);
  }
  
  toggleApproveAllButton() {
    this.showApproveAllButton = !this.showApproveAllButton;
  }

  //for modal implementation
  openConfirmationModal() {
    this.modalService.open(this.confirmationModal);
  }
  confirmApproveAll(modal: any) {
    this.approveAllStudents();
    modal.close();
  }

  confirmApprove(modal: any) {
    this.approveStudent();
    modal.close();
  }

  confirmReject(modal: any) {
    this.rejectStudent();
    modal.close();
  }

  openApproveModal() {
    this.modalService.open(this.approveModal);
  }

  openRejectModal() {
    this.modalService.open(this.rejectModal);
  }

}
