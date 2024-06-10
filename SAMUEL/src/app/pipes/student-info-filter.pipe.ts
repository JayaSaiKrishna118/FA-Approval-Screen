import { Pipe, PipeTransform } from '@angular/core';
import { StudentInfo } from '../models';

@Pipe({
  name: 'studentInfoFilter',
  standalone: true
})
export class StudentInfoFilterPipe implements PipeTransform {
  transform(students: StudentInfo[], searchTerm: string): StudentInfo[] {
    searchTerm = searchTerm.trim()
    if (!students || !searchTerm) {
      return students;
    }
    return students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}
