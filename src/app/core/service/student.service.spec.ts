import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StudentService } from './student.service';
import { Student, StudentRequest } from '../models/Student';

describe('StudentService', () => {
  let service: StudentService;
  let httpTestingController: HttpTestingController;

  const studentRequest: StudentRequest = {
    firstName: 'Marie',
    lastName: 'Durand',
    email: 'marie.durand@example.com'
  };

  const studentResponse: Student = {
    id: 1,
    firstName: 'Marie',
    lastName: 'Durand',
    email: 'marie.durand@example.com',
    createdAt: '2026-07-31T16:49:28.202277',
    updatedAt: '2026-07-31T16:49:28.202277'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudentService]
    });
    service = TestBed.inject(StudentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createStudent should POST /api/students with the request body', () => {
    // WHEN
    service.createStudent(studentRequest).subscribe(student => {
      // THEN
      expect(student).toEqual(studentResponse);
    });

    // THEN - vérifie la requête envoyée
    const req = httpTestingController.expectOne('/api/students');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(studentRequest);
    req.flush(studentResponse);
  });

  it('getAllStudents should GET /api/students', () => {
    // WHEN
    service.getAllStudents().subscribe(students => {
      // THEN
      expect(students).toEqual([studentResponse]);
    });

    // THEN
    const req = httpTestingController.expectOne('/api/students');
    expect(req.request.method).toBe('GET');
    req.flush([studentResponse]);
  });

  it('getStudentById should GET /api/students/1', () => {
    // WHEN
    service.getStudentById(1).subscribe(student => {
      // THEN
      expect(student).toEqual(studentResponse);
    });

    // THEN
    const req = httpTestingController.expectOne('/api/students/1');
    expect(req.request.method).toBe('GET');
    req.flush(studentResponse);
  });

  it('updateStudent should PUT /api/students/1 with the request body', () => {
    // WHEN
    service.updateStudent(1, studentRequest).subscribe(student => {
      // THEN
      expect(student).toEqual(studentResponse);
    });

    // THEN
    const req = httpTestingController.expectOne('/api/students/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(studentRequest);
    req.flush(studentResponse);
  });

  it('deleteStudent should DELETE /api/students/1', () => {
    // WHEN
    service.deleteStudent(1).subscribe();

    // THEN
    const req = httpTestingController.expectOne('/api/students/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
