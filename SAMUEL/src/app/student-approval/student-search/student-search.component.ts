import { Component, Input, ViewChild, AfterViewInit, SimpleChanges } from '@angular/core';
import { Observable, OperatorFunction, Subject, debounceTime, distinctUntilChanged, filter, map, merge } from 'rxjs';
import { StudentInfo } from '../../models';
import { RouterModule } from '@angular/router';
import { StudentInfoFilterPipe } from '../../pipes/student-info-filter.pipe';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-student-search',
  standalone: true,
  imports: [RouterModule, JsonPipe, FormsModule, StudentInfoFilterPipe, NgbTypeahead, NgbTypeaheadModule],
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.css']
})
export class StudentSearchComponent implements AfterViewInit {
  
  model: any;

  @ViewChild('instance', { static: true })
  instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  @Input() studentsInfo: StudentInfo[] = [];
  filteredResults: StudentInfo[] = [];

  ngAfterViewInit() {
    // Ensure instance is correctly initialized
    if (this.instance) {
      this.instance.isPopupOpen = ()=> false;
    }
  }

  search: OperatorFunction<string, readonly StudentInfo[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => this.instance && !this.instance.isPopupOpen));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => term.trim() === '' ? this.studentsInfo : this.filterStudents(term.trim()))
    );
  };

  filterStudents(term: string): StudentInfo[] {
    const lowerTerm = term.toLowerCase();
    return this.studentsInfo.filter(student =>
      student.name.toLowerCase().includes(lowerTerm) ||
      student.rollNo.toLowerCase().includes(lowerTerm)
    );
  }

  formatter = (result: StudentInfo) => result.name;
}


