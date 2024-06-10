import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {  StudentInfoGetRequest } from './content/studentinfo.model';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

 private jsonUrl = './assets/student_info_data.json';

  constructor(private http: HttpClient) {}

    getStudentInfo(): Observable<StudentInfoGetRequest> {
      return this.http.get<StudentInfoGetRequest>(this.jsonUrl).pipe( 
        catchError(this.handleError<StudentInfoGetRequest>('getStudentInfo', {info:[]}))
      );
    }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
  
}
