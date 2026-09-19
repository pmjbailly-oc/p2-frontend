import {Register} from '../models/Register';
import {Login} from '../models/Login';
import {Observable, of} from 'rxjs';
import {BehaviorSubject} from 'rxjs';


export class UserMockService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  register(user: Register): Observable<Object> {
    return of(null);
  }

  login(login: Login): Observable<Object> {
    return of({ token: 'mock-token' });
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }
}
