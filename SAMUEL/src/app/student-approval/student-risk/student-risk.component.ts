import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbAccordionModule, NgbAlertModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ApprovalRequest, StudentInfo, ApprovalStatus } from '../../models';
import { HttpClientModule } from '@angular/common/http';
import { JsonUtils } from '../../utils/json-utils';
import { StudentInfoService } from '../services/student-info.service';

interface NavDataItem {
  id: number;
  data: {
    atRisk: StudentInfo[];
    notAtRisk: StudentInfo[];
  };
}
interface NavData {
  [key: string]: NavDataItem;
}

@Component({
  selector: 'app-student-risk',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, NgbAccordionModule, NgbNavModule, NgbAlertModule, RouterModule],
  templateUrl: './student-risk.component.html',
  styleUrl: './student-risk.component.css'
})
export class StudentRiskComponent implements OnInit, OnChanges {
  nav_data: NavData = {
    PENDING: {
      id: 1,
      data: {
        atRisk: [],
        notAtRisk: []
      }
    },
    APPROVED: {
      id: 2,
      data: {
        atRisk: [],
        notAtRisk: []
      }
    },
    REJECTED: {
      id: 3,
      data: {
        atRisk: [],
        notAtRisk: []
      }
    }
  };
  nav_data_keys = Object.keys(this.nav_data);
  active = 1;
  allApproved = signal(false);
  showAlert = signal(false);
  alertMessage = signal('');

  @Input() studentsInfo: StudentInfo[] = [];
  @Output() approveStudents = new EventEmitter<StudentInfo[]>();
  ngOnInit(): void {
    this.populateAllData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['studentsInfo'] && !changes['studentsInfo'].isFirstChange()) {
      this.populateAllData();
      console.log('Updated Students Info:', this.studentsInfo);
    }
  }

  populateAllData(): void {
    this.populateData(ApprovalStatus.PENDING);
    this.populateData(ApprovalStatus.APPROVED);
    this.populateData(ApprovalStatus.REJECTED);
  }

  populateData(status: ApprovalStatus): void {
    this.nav_data[status].data.notAtRisk = this.studentsInfo.filter(
      (s: StudentInfo) => !s.atRisk && s.approvalStatus === status
    );
    this.nav_data[status].data.atRisk = this.studentsInfo.filter(
      (s: StudentInfo) => s.atRisk && s.approvalStatus === status
    );
  }

  approveAll(studentList: StudentInfo[]): void {
    let approveRequests: ApprovalRequest[] = studentList.map(s => ({
      rollNo: s.rollNo,
      isApproved: true,
      remarks: ''
    }));

    this.approveStudents.emit(studentList)
    JsonUtils.download(approveRequests);
    this.showAlertMessage(`All students have been APPROVED successfully!`);
    this.allApproved.set(true);
  }

  showAlertMessage(message: string): void {
    this.alertMessage.set(message);
    this.showAlert.set(true);
    setTimeout(() => {
      this.showAlert.set(false);
    }, 3000);
  }
}
