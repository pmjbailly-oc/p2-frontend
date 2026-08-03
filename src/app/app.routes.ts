import { Routes } from '@angular/router';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {AppComponent} from './app.component';
import {StudentsComponent} from './pages/students/students.component';
import {StudentDetailComponent} from './pages/student-detail/student-detail.component';
import {StudentFormComponent} from './pages/student-form/student-form.component';
import {AuthGuard} from './core/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'students',
    component: StudentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'students/add',
    component: StudentFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'students/:id',
    component: StudentDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'students/:id/edit',
    component: StudentFormComponent,
    canActivate: [AuthGuard]
  }
];
