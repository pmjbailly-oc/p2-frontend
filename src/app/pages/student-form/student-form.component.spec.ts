import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFormComponent } from './student-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../core/service/student.service';
import { StudentMockService } from '../../core/service/student-mock.service';

describe('StudentFormComponent', () => {
  let component: StudentFormComponent;
  let fixture: ComponentFixture<StudentFormComponent>;
  let router: Router;

  describe('in create mode (no id)', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [StudentFormComponent],
        providers: [
          provideHttpClient(),
          provideRouter([]),
          {
            provide: ActivatedRoute,
            useValue: { snapshot: { paramMap: { get: () => null } } }
          },
          { provide: StudentService, useClass: StudentMockService },
        ]
      })
      .compileComponents();

      fixture = TestBed.createComponent(StudentFormComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router);
      fixture.detectChanges();
    });

    it('should create with empty form', () => {
      expect(component).toBeTruthy();
      expect(component.isEditMode).toBe(false);
      expect(component.studentForm.get('firstName')?.value).toBe('');
    });

    it('should not submit when form is invalid', () => {
      // GIVEN - formulaire vide = invalide
      // WHEN
      component.onSubmit();
      // THEN - pas de navigation, formulaire marqué soumis
      expect(component.submitted).toBe(true);
      expect(component.studentForm.invalid).toBe(true);
    });

    it('should create a student and navigate to /students', () => {
      // GIVEN
      component.studentForm.patchValue({
        firstName: 'Claire',
        lastName: 'Petit',
        email: 'claire.petit@example.com'
      });
      const navigateSpy = jest.spyOn(router, 'navigate');
      // WHEN
      component.onSubmit();
      // THEN
      expect(navigateSpy).toHaveBeenCalledWith(['/students']);
    });
  });

  describe('in edit mode (with id)', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [StudentFormComponent],
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

      fixture = TestBed.createComponent(StudentFormComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router);
      fixture.detectChanges();
    });

    it('should prefill the form with the loaded student', () => {
      // WHEN - ngOnInit a chargé l'étudiant du mock
      expect(component.isEditMode).toBe(true);
      expect(component.studentForm.get('firstName')?.value).toBe('Marie');
      expect(component.studentForm.get('email')?.value).toBe('marie.durand@example.com');
      expect(component.isLoading).toBe(false);
    });

    it('should update a student and navigate to /students', () => {
      // GIVEN
      component.studentForm.patchValue({
        firstName: 'Marie-Anne',
        lastName: 'Durand',
        email: 'marie.durand@example.com'
      });
      const navigateSpy = jest.spyOn(router, 'navigate');
      // WHEN
      component.onSubmit();
      // THEN
      expect(navigateSpy).toHaveBeenCalledWith(['/students']);
    });
  });
});
