import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StudentInfo } from './models';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'https://example.com/api/students'; // Replace this with your API endpoint

  constructor(private http: HttpClient) {}

  getStudents(): Observable<StudentInfo[]> {
    return this.http.get<StudentInfo[]>(this.apiUrl)
      .pipe(
        map((response: any) => response.data), // Adjust this according to your API response structure
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error); // Log the error to console
    throw error; // You can also throw the error to let the calling code handle it
  }
}
