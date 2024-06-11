import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbAccordionModule, NgbModule, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { STUDENT, StudentInfo, StudentInfoGetRequest} from '../models';
import StudentsJson from '../students.json';
import { FormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { Observable,OperatorFunction, Subject, debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs';
import { StudentDetailsComponent } from './student-details/student-details.component';

const id = [
  '22MA30017',
  '22MA30018',
  '22MA30019',
  '22MA30020',
  '22MA30021'
 ];

@Component({
  selector: 'app-student-main',
  standalone: true,
  imports: [NgbAccordionModule,RouterOutlet,CommonModule,NgbModule,FormsModule, JsonPipe, StudentDetailsComponent],
  templateUrl: './student-main.component.html',
  styleUrl: './student-main.component.css'
})

export class StudentMainComponent implements OnInit{
  
  searchTerm: string=''
  students: StudentInfo[] = StudentsJson
  rollNo!: StudentInfo[]
  atRisk!: StudentInfo[]
  notAtRisk!: StudentInfo[]
  infos!: StudentInfoGetRequest[]

  constructor(){
    console.log(this.students);
  }

  @ViewChild('instance', { static: false })
  instance!: NgbTypeahead;

  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>)=>{
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
		const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
		const inputFocus$ = this.focus$;

		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			map((term: string) =>
				(term === '' ? id : id.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
			),
		);
	};

  searchStudent(){
    const filteredStudents = this.students.filter((student: { rollNo: { toString: () => string | any[]; }; name: string; }) =>
          student.rollNo.toString().includes(this.searchTerm)||
          student.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        console.log(filteredStudents);
  }

  ngOnInit(): void {
    this.students = STUDENT.infos;
    this.atRisk = this.students.filter((student: { atRisk: any; }) => student.atRisk);
    this.notAtRisk = this.students.filter((student: { atRisk: any; }) => !student.atRisk);
  }
}


