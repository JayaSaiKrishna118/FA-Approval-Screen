import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { StudentCreditsData } from '../studentCredits';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Step 2: Import FormsModule
import { Student } from '../student';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [FontAwesomeModule, NgbAccordionModule, FormsModule],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css',
})
export class StudentDetailComponent implements OnInit {
  @Input() student: Student | null = null;
  rejectStudent() {
    throw new Error('Method not implemented.');
  }
  approveStudent() {
    throw new Error('Method not implemented.');
  }
  risk: any;

  isCollapsedCore = false;
  isCollapseElective = false;

  coreCourses: { code: string; name: string }[] = [];
  electiveCredits: { code: string; min: number; max: number }[] = [];

  panelId: any;
  remarks: any;
  constructor(private route: ActivatedRoute) {}
  faPlus = faPlus;
  faMinus = faMinus;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student']) {
      console.log('New student data:', changes['student'].currentValue);
    }
  }
  ngOnInit(): void {
    this.getCoreCourses();
    this.getElectives();
  }
  getCoreCourses(): void {
    // const sudentRollNo = this.route.snapshot.paramMap.get('rollNo');
    const sudentRollNo = StudentCreditsData.infos[0].rollNo;
    console.log('student roll No', sudentRollNo);
    const studentData = StudentCreditsData.infos.find(
      (student) => student.rollNo === sudentRollNo
    );
    if (studentData && studentData.coreCourses) {
      this.coreCourses = studentData.coreCourses.map(({ code, name }) => ({
        code,
        name,
      }));
    } else {
      this.coreCourses = [];
    }
    this.isCollapsedCore = !this.isCollapsedCore;
    console.log('core courses', this.coreCourses);
  }

  getElectives(): void {
    // const sudentRollNo = this.route.snapshot.paramMap.get('rollNo');
    const sudentRollNo = StudentCreditsData.infos[0].rollNo;
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
}
