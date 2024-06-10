import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentInfo, StudentInfoGetRequest } from '../../models';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentInfoService {

  private jsonURL = 'assets/student_info_data.json';

  constructor(private http: HttpClient) { }


  getStudentsInfo(): Observable<StudentInfoGetRequest> {
    return this.http.get<StudentInfoGetRequest>(this.jsonURL).pipe(
      catchError(this.handleError<StudentInfoGetRequest>('getStudentsInfo', { info: [] }))
    );
  }

  getStudentInfo(rollNo: string): Observable<StudentInfo | undefined> {
    return this.getStudentsInfo().pipe(
      map(data => data.info.find(student => student.rollNo === rollNo)),
      catchError(this.handleError<StudentInfo>('getStudentInfo'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
