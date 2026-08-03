import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { StudentService } from '../../core/service/student.service';
import { StudentRequest } from '../../core/models/Student';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-student-form',
  imports: [CommonModule, MaterialModule],
  templateUrl: './student-form.component.html',
  standalone: true,
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit {
  private studentService = inject(StudentService);
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  studentForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  isLoading: boolean = false;
  isEditMode: boolean = false;
  errorMessage: string | null = null;
  private studentId: number | null = null;

  ngOnInit() {
    this.studentForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      },
    );

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.studentId = Number(idParam);
      this.isLoading = true;
      this.studentService.getStudentById(this.studentId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (student) => {
            this.isLoading = false;
            this.studentForm.patchValue({
              firstName: student.firstName,
              lastName: student.lastName,
              email: student.email
            });
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = err?.error?.message
              ?? 'Une erreur est survenue lors du chargement de l\'étudiant.';
          }
        });
    }
  }

  get form() {
    return this.studentForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = null;
    if (this.studentForm.invalid) {
      return;
    }
    const studentRequest: StudentRequest = {
      firstName: this.studentForm.get('firstName')?.value,
      lastName: this.studentForm.get('lastName')?.value,
      email: this.studentForm.get('email')?.value
    };
    this.isLoading = true;
    const request$ = this.isEditMode && this.studentId
      ? this.studentService.updateStudent(this.studentId, studentRequest)
      : this.studentService.createStudent(studentRequest);
    request$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/students']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err?.error?.message
            ?? 'Une erreur est survenue lors de l\'enregistrement de l\'étudiant.';
        }
      });
  }

  onReset(): void {
    this.submitted = false;
    this.errorMessage = null;
    this.studentForm.reset();
  }
}
