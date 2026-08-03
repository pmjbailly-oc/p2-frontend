import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { StudentService } from '../../core/service/student.service';
import { Student } from '../../core/models/Student';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-students',
  imports: [CommonModule, MaterialModule, RouterLink],
  templateUrl: './students.component.html',
  standalone: true,
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  private studentService = inject(StudentService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  students: Student[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.studentService.getAllStudents()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (students) => {
          this.isLoading = false;
          this.students = students;
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err?.error?.message
            ?? 'Une erreur est survenue lors du chargement des étudiants.';
        }
      });
  }

  deleteStudent(id: number): void {
    this.errorMessage = null;
    this.studentService.deleteStudent(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loadStudents();
        },
        error: (err) => {
          this.errorMessage = err?.error?.message
            ?? 'Une erreur est survenue lors de la suppression de l\'étudiant.';
        }
      });
  }
}
