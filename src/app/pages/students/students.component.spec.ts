import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsComponent } from './students.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { StudentService } from '../../core/service/student.service';
import { StudentMockService } from '../../core/service/student-mock.service';

describe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;
  let studentService: StudentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: StudentService, useClass: StudentMockService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    studentService = TestBed.inject(StudentService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load students on init', () => {
    // GIVEN - StudentMockService renvoie 1 étudiant
    expect(studentService.getAllStudents).toBeDefined();
    // WHEN - ngOnInit a été déclenché par detectChanges
    // THEN - la liste contient l'étudiant du mock
    expect(component.students.length).toBe(1);
    expect(component.students[0].firstName).toBe('Marie');
    expect(component.isLoading).toBe(false);
  });

  it('should render students in the table', () => {
    // WHEN
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    // THEN
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('Marie');
    expect(rows[0].textContent).toContain('marie.durand@example.com');
  });

  it('should call deleteStudent and reload list', () => {
    // GIVEN
    const deleteSpy = jest.spyOn(studentService, 'deleteStudent');
    const loadSpy = jest.spyOn(component, 'loadStudents');
    // WHEN
    component.deleteStudent(1);
    // THEN
    expect(deleteSpy).toHaveBeenCalledWith(1);
    expect(loadSpy).toHaveBeenCalled();
  });
});
