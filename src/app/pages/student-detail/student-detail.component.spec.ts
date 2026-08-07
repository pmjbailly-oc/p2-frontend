import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDetailComponent } from './student-detail.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../core/service/student.service';
import { StudentMockService } from '../../core/service/student-mock.service';

describe('StudentDetailComponent', () => {
  let component: StudentDetailComponent;
  let fixture: ComponentFixture<StudentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDetailComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }
        },
        { provide: StudentService, useClass: StudentMockService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the student with id 1 on init', () => {
    // WHEN - ngOnInit déclenché
    // THEN - l'étudiant du mock est chargé
    expect(component.student).not.toBeNull();
    expect(component.student!.id).toBe(1);
    expect(component.isLoading).toBe(false);
  });

  it('should render student fields', () => {
    // WHEN
    const table = fixture.nativeElement.querySelector('table');
    // THEN
    expect(table.textContent).toContain('Marie');
    expect(table.textContent).toContain('marie.durand@example.com');
  });
});
