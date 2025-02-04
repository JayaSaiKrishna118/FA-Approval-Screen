import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { StudentSearchComponent } from '../student-search/student-search.component';
import { StudentDetailComponent } from '../student-detail/student-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Student } from '../student';
import { Observable, OperatorFunction } from 'rxjs';
import { StudentCreditsData } from '../studentCredits';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { DisplayJsonComponent } from '../display-json/display-json.component';
import { StudentDataService } from '../student-data.service';


const rollNo = [
  '2021001',
  '2022002',
  '2021003',
  '2021004',
  '2021005',
  '2021006',
  '2021007',
  '2021008',
];

const name = [
  'John Doe',
  'Jane Smith',
  'Alice Johnson',
  'Bob Brown',
  'Charlie White',
  'David Black',
  'Eve Green',
  'Frank Brown',
  'Grace White',
  'Henry Black',
];

@Component({
  selector: 'app-student-approval',
  standalone: true,
  templateUrl: './student-approval.component.html',
  styleUrl: './student-approval.component.css',
  imports: [
    FontAwesomeModule,
    NgbAccordionModule,
    FormsModule,
    JsonPipe,
    StudentSearchComponent,
    StudentDetailComponent,
    NgbTypeaheadModule,
    RouterModule,
    DisplayJsonComponent,
  ],
})
export class StudentApprovalComponent {

  model: any;
  panelId: any;
  remarks: any;
  risk: any;
  faPlus = faPlus;
  faMinus = faMinus;
  students: Student[] = [];

  isCollapsedCore = false;
  isCollapseElective = false;

  coreCourses: { code: string; name: string; credits: number; slot: string }[] =
    [];
  electiveCredits: { code: string; min: number; max: number }[] = [];
  selectedStudent: Student | undefined;
  approvedStudentJson: string = '';


  constructor(private router: RouterModule, private studentDataService: StudentDataService){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student']) {
      console.log('New student data:', changes['student'].currentValue);
    }
  }
  ngOnInit(): void {
    this.getRollNo();
  }

  getRollNo(): void {
    this.students = StudentCreditsData.infos;
  }
  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) => {
        if (term.length < 2) return [];
        // Filter both roll numbers and names
        const rollNoMatches = rollNo.filter(
          (v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1
        );
        const nameMatches = name.filter(
          (v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1
        );
        // Combine and remove duplicates
        const combinedMatches = Array.from(
          new Set([...rollNoMatches, ...nameMatches])
        );
        return combinedMatches.slice(0, 10);
      })
    );

  //for accordion selection

  onStudentSelected(student: Student): void {
    this.selectedStudent = student;
    this.getCoreCourses();
    this.getElectives();
  }

  onItemSelect(event: any): void {
    const selectedItem = event.item;
    this.fetchStudentDetails(selectedItem);
  }

  fetchStudentDetails(selectedItem: string): void {
    this.selectedStudent = this.students.find(
      (student) =>
        student.rollNo === selectedItem || student.name === selectedItem
    );
    console.log('current student', this.selectedStudent);
  }

  getCoreCourses(): void {
    // const sudentRollNo = this.route.snapshot.paramMap.get('rollNo');
    const sudentRollNo = this.selectedStudent?.rollNo;
    console.log('student roll No', sudentRollNo);
    const studentData = StudentCreditsData.infos.find(
      (student) => student.rollNo === sudentRollNo
    );
    if (studentData && studentData.coreCourses) {
      this.coreCourses = studentData.coreCourses.map(
        ({ code, name, credits, slot }) => ({
          code,
          name,
          credits,
          slot,
        })
      );
    } else {
      this.coreCourses = [];
    }
    this.isCollapsedCore = !this.isCollapsedCore;
    console.log('core courses', this.coreCourses);
  }

  getElectives(): void {
    // const sudentRollNo = this.route.snapshot.paramMap.get('rollNo');
    const sudentRollNo = this.selectedStudent?.rollNo;
    console.log('student roll No', sudentRollNo);
    const studentData = StudentCreditsData.infos.find(
      (student) => student.rollNo === sudentRollNo
    );
    if (studentData && studentData.electiveCredits) {
      this.electiveCredits = studentData.electiveCredits.map(
        ({ code, min, max }) => ({ code, min, max })
      );
    } else {
      this.electiveCredits = [];
    }
    this.isCollapseElective = !this.isCollapseElective;
    console.log('electiveCredits', this.electiveCredits);
  }

  autoGrowTextZone(event: Event): void {
    const target = event.target as HTMLTextAreaElement; // Cast the event target to HTMLTextAreaElement
    target.style.height = 'auto'; // Reset height to ensure shrinking on deletion
    target.style.height = target.scrollHeight + 'px'; // Set new height based on content
  }
  approve(): void {
    if (this.selectedStudent) {
      this.selectedStudent.approvalStatus = 1;
      console.log(`Student ${this.selectedStudent.name} approved successfully.`);

      // Generate JSON for the approved student
      this.approvedStudentJson = JSON.stringify(this.selectedStudent, null, 2); 
      console.log('Approved student JSON:', this.approvedStudentJson);
      
      this.studentDataService.setApprovedStudentJson(this.approvedStudentJson);
      // this.router.navigate(['/displayJson']);
    } else {
      console.log(`Operation failed.`);
    }
  }
  reject(remarks: string) {
    if (this.selectedStudent) {
      this.selectedStudent.approvalStatus = 2;
      this.selectedStudent.approvalRemarks = remarks;
      console.log(`Student ${this.selectedStudent.name} rejected successfully.`);
      console.log(`Remarks: ${remarks}`);
    }
    else{
      console.log(`Operation failed.`);
    }
  }
  approveAll() {
    this.students.forEach((student) => {
      if(student.atRisk === false && student.approvalStatus === 0) {
        student.approvalStatus = 1;
      }
    });
    console.log('All students approved successfully.');
  }
  updateStudentCredits(student: Student) {
    const studentJson = JSON.stringify(student);
    console.log('Student JSON:', studentJson);
  }
}
