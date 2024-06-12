import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApprovalStatus, StudentInfo, StudentInfoGetRequest } from '../../models';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentInfoService {

  private jsonURL = 'assets/student_info_data.json';
  private studentsSubject = new BehaviorSubject<StudentInfo[]>([]);
  students$ = this.studentsSubject.asObservable();
  constructor(private http: HttpClient) { 
    this.loadStudents()
  }

 
  
  private loadStudents(): void {
    this.http.get<StudentInfoGetRequest>(this.jsonURL).pipe(
      tap(students => this.studentsSubject.next(students.info))
    ).subscribe();
  }

  getStudents(): Observable<StudentInfo[]> {
    return this.students$;
  }

  getStudent(rollNo: string): Observable<StudentInfo | undefined> {
    return this.students$.pipe(
      map(students => students.find(student => student.rollNo === rollNo))
    );
  }

  updateStudent(updatedStudent: StudentInfo): void {
    const currentStudents = this.studentsSubject.value;
    const updatedStudents = currentStudents.map(student =>
      student.rollNo === updatedStudent.rollNo ? updatedStudent : student
    );
    console.log("UPDATING ", updatedStudent)
    this.studentsSubject.next(updatedStudents);
  }

  approveStudent(student:StudentInfo): void {
    const currentStudents = this.studentsSubject.value.map(std =>
      std.rollNo === student.rollNo
        ? { ...student, approvalStatus: ApprovalStatus.APPROVED }
        : student
    );
    this.studentsSubject.next(currentStudents);
  }
  

  approveAllStudents(studentList: StudentInfo[]): void {
    const currentStudents = this.studentsSubject.value.map(student =>
      studentList.some(s => s.rollNo === student.rollNo)
        ? { ...student, approvalStatus: ApprovalStatus.APPROVED }
        : student
    );
    this.studentsSubject.next(currentStudents);
  }
}
