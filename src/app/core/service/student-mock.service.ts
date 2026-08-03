import { Student, StudentRequest } from '../models/Student';
import { Observable, of } from 'rxjs';

const mockStudents: Student[] = [
  {
    id: 1,
    firstName: 'Marie',
    lastName: 'Durand',
    email: 'marie.durand@example.com',
    createdAt: '2026-07-31T16:49:28.202277',
    updatedAt: '2026-07-31T16:49:28.202277'
  }
];

export class StudentMockService {

  createStudent(student: StudentRequest): Observable<Student> {
    return of({
      id: mockStudents.length + 1,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }

  getAllStudents(): Observable<Student[]> {
    return of(mockStudents);
  }

  getStudentById(id: number): Observable<Student> {
    return of(mockStudents.find(student => student.id === id)!);
  }

  updateStudent(id: number, student: StudentRequest): Observable<Student> {
    return of({
      id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }

  deleteStudent(id: number): Observable<Object> {
    return of(null);
  }
}
