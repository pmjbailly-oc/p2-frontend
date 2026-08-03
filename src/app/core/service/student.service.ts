import { Injectable } from '@angular/core';
import { Student, StudentRequest } from '../models/Student';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private httpClient: HttpClient) { }

  createStudent(student: StudentRequest): Observable<Student> {
    return this.httpClient.post<Student>('/api/students', student);
  }

  getAllStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>('/api/students');
  }

  getStudentById(id: number): Observable<Student> {
    return this.httpClient.get<Student>(`/api/students/${id}`);
  }

  updateStudent(id: number, student: StudentRequest): Observable<Student> {
    return this.httpClient.put<Student>(`/api/students/${id}`, student);
  }

  deleteStudent(id: number): Observable<Object> {
    return this.httpClient.delete(`/api/students/${id}`);
  }
}
