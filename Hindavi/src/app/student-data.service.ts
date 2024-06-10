import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {
  static setApprovedStudentJson(approvedStudentJson: string) {
    throw new Error('Method not implemented.');
  }
  private approvedStudentJson: string;

  constructor() {
    this.approvedStudentJson = '';
  }
  setApprovedStudentJson(json: string) {
    this.approvedStudentJson = json;
  }
  getApprovedStudentJson(): string {
    return this.approvedStudentJson;
  }
}