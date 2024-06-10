import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Student } from '../student';
import { StudentCreditsData } from '../studentCredits';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: [ './student-search.component.css' ],
  imports: [FontAwesomeModule]
})
export class StudentSearchComponent implements OnInit {

  students!: Student[];
  private searchTerms = new Subject<string>();
  constructor() {}

  @Output() studentSelected = new EventEmitter<Student>();


  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
     this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => of(this.searchStudent(term))),
    ).subscribe( data => this.students = data);
  }

  searchStudent(term: string): Student[] {
    if (!term.trim()) {
      return [];
    }
    return StudentCreditsData.infos.filter(student => student.rollNo.includes(term));
  }

  faSearch = faSearch;

  selectStudent(student: Student): void {
    this.studentSelected.emit(student);
  } 

  fetchStudentDetails(searchTerm: string): Student | null {
   
    let foundStudent: Student | undefined;

    // Attempt to search by rollNo if searchTerm is numeric or alphanumeric, otherwise by name
    if (/^\d+$/.test(searchTerm)) {
      foundStudent = StudentCreditsData.infos.find(student => student.rollNo === searchTerm);
    } else {
      foundStudent = StudentCreditsData.infos.find(student => student.name.toLowerCase() === searchTerm.toLowerCase());
    }
  
    // Return the found student or null if not found
    return foundStudent || null;
  }
}