import { Component, Input } from '@angular/core';
import * as models from '../types/Skeleton';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [NgbModule, FormsModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  @Input() student!: models.StudentInfo;
  inputRemark: string = '';

  giveRemark(): void{
    // console.log(this.inputRemark);
    this.student.approvalRemarks = this.inputRemark;
    // console.log(this.student.approvalRemarks);
  }

/*   wasApproved(): boolean{
    if(this.student.approvalStatus == models.ApprovalStatus.APPROVED)
        return true;
    return false;
  }

  wasPending(): boolean{
    if(this.student.approvalStatus == models.ApprovalStatus.PENDING)
      return true;
    return false;
  } */



  approveStudent(): void{
    this.student.approvalStatus = models.ApprovalStatus.APPROVED;
    
  }

  rejectStudent(): void{
    this.student.approvalStatus = models.ApprovalStatus.REJECTED;
  }

}
