import { Injectable } from '@angular/core';
import { Register } from '../models/Register';
import { Login } from '../models/Login';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  register(user: Register): Observable<Object> {
    return this.httpClient.post('/api/register', user);
  }

  login(login: Login): Observable<Object> {
    return this.httpClient.post('/api/login', login);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
