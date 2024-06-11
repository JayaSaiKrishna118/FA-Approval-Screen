import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgbAccordionModule, NgbAlertModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, debounceTime, distinctUntilChanged, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentDetailsComponent } from "./student-details/student-details.component";
import { StudentInfo } from '../models';
import { STUDENTS_DATA } from '../student-details-data';

@Component({
    selector: 'app-approval-main',
    standalone: true,
    templateUrl: './approval-main.component.html',
    styleUrl: './approval-main.component.css',
    imports: [RouterModule, NgbAccordionModule, RouterOutlet, NgbAlertModule, NgbTypeaheadModule, FormsModule, JsonPipe, CommonModule, StudentDetailsComponent]
})

export class ApprovalMainComponent implements OnInit{
  selectedStudent: StudentInfo[] | undefined;
students: StudentInfo[] = []
atRisk: StudentInfo[] = []
notAtRisk: StudentInfo[] = []
click$= new Subject<string>()
focus$= new Subject<string>()
model: StudentInfo = {} as StudentInfo;
  searchControl = new FormControl()
  searchResults: StudentInfo[] = []
  http: any;

ngOnInit(): void {
  this.students = STUDENTS_DATA.infos
  this.atRisk = this.students.filter(student => student.atRisk)
  this.notAtRisk = this.students.filter(student => !student.atRisk)
  
}

constructor() {
  this.searchControl.valueChanges
    .pipe(
      debounceTime(200),
      distinctUntilChanged()
    )
    .subscribe((value: string) => {
      this.searchResults = this.students.filter(student =>
        student.name.toLowerCase().includes(value.toLowerCase())
      );
    });
}

sendData() {
  this.http.post('http://your-api-url.com', this.model).subscribe(
    (response: any) => console.log(response),
    (error: any) => console.log(error)
  );
}


search = (text$: Observable<string>) : Observable<any[]> =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map((term: string) => term.length < 2 ? []
      : this.students.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      .map((student: StudentInfo) => `${student.name} (${student.rollNo})`))
  );
  // ).subscribe(results => this.searchResults = results);

  onSearch(term: string): StudentInfo[] | void {
      this.search(of(term)).subscribe(results => this.searchResults = results);
      this.sendData();
this.selectedStudent= this.searchResults
      if(this.selectedStudent === this.searchResults ) {
        return this.searchResults
      }

  // formatter = (result: StudentInfo) => result.name;

  // formatter = (x: { name: string }) => x.name;
};
}