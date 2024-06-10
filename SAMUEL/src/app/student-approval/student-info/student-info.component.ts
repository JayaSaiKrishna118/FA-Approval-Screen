import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgbAccordionCollapse,NgbAccordionItem, NgbAccordionModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import { ApprovalRequest, ApprovalStatus, StudentInfo } from '../../models';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentInfoService } from '../services/student-info.service';
import { HttpClientModule } from '@angular/common/http';
import { JsonUtils } from '../../utils/json-utils';

@Component({
  selector: 'app-student-info',
  standalone: true,
  imports: [NgbAccordionModule, NgbAccordionItem, NgbAccordionCollapse, ReactiveFormsModule, CommonModule, HttpClientModule, NgbAlertModule],
  providers: [StudentInfoService],
  templateUrl: './student-info.component.html',
  styleUrl: './student-info.component.css'
})
export class StudentInfoComponent implements OnInit {
  approvalStatus = ApprovalStatus;
  studentInfo!: StudentInfo;
  approvalForm!: FormGroup;

  @Output() studentInfoUpdated = new EventEmitter<StudentInfo>();
  showAlert = false;
  alertMessage = '';
  isCoreHovered = false;
  isElectiveHovered = false;

  @ViewChild('coreCoursesPanel') coreCoursesPanel: NgbAccordionItem | undefined;
  @ViewChild('electiveCoursesPanel') electiveCoursesPanel: NgbAccordionItem | undefined;

  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private studentInfoService: StudentInfoService
  ) {
    this.buildApprovalForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const rollNo = params['rollNo'];
      this.getStudentInfo(rollNo);
    });
  }



  ngAfterViewInit() {
    console.log('Core Courses Panel:', this.coreCoursesPanel);
    console.log('Elective Courses Panel:', this.electiveCoursesPanel);
  }

  buildApprovalForm() {
    this.approvalForm = this.fb.group({
      remarks: ['']
    });
  }

  getStudentInfo(rollNo: string): void {
    this.studentInfoService.getStudentInfo(rollNo).subscribe({
      next: data => {
        if (data) {
          this.studentInfo = data;
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }
 
  handleMouseEnter(panelId: string) {
    if (panelId === 'coreCoursesPanel') {
      this.isCoreHovered = true;
      this.coreCoursesPanel?.expand();
      this.electiveCoursesPanel?.collapse();
    } else if (panelId === 'electiveCoursesPanel') {
      this.isElectiveHovered = true;
      this.electiveCoursesPanel?.expand();
      this.coreCoursesPanel?.collapse();
    }
  }

  handleMouseLeave(panelId: string) {
    if (panelId === 'coreCoursesPanel') {
      this.isCoreHovered = false;
      setTimeout(() => {
        if (!this.isCoreHovered) {
          this.coreCoursesPanel?.collapse();
        }
      }, 300); // Small delay to ensure smooth transition
    } else if (panelId === 'electiveCoursesPanel') {
      this.isElectiveHovered = false;
      setTimeout(() => {
        if (!this.isElectiveHovered) {
          this.electiveCoursesPanel?.collapse();
        }
      }, 300); // Small delay to ensure smooth transition
    }
  }

  handleTouchStart(panelId: string) {
    this.handleMouseEnter(panelId);
  }

  handleTouchEnd(panelId: string) {
    setTimeout(() => {
      if (panelId === 'coreCoursesPanel') {
        this.isCoreHovered = false;
      } else if (panelId === 'electiveCoursesPanel') {
        this.isElectiveHovered = false;
      }
    }, 300); // Small delay to ensure the panel stays open
  }

  saveRequest(student: StudentInfo, status: ApprovalStatus, isApproved = false): void {
    const remarks: string = this.approvalForm.get('remarks')?.value.trim();
    let request: ApprovalRequest = {
      rollNo: student.rollNo,
      isApproved: isApproved,
      remarks: remarks
    };
    student.approvalStatus = status;
    student.approvalRemarks = remarks;
    this.studentInfoUpdated.emit(student);
    this.showAlertMessage(`Student with rollNo:${student.rollNo} have been ${student.approvalStatus} successfully!`);
    JsonUtils.download(request)
    
    
  }

  showAlertMessage(message: string): void {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000); // Hide the alert after 3 seconds
  }



}
