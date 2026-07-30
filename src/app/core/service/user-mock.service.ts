import {Register} from '../models/Register';
import {Login} from '../models/Login';
import {Observable, of} from 'rxjs';


export class UserMockService {

  register(user: Register): Observable<Object> {
    return of(null);
  }

  login(login: Login): Observable<Object> {
    return of({ token: 'mock-token' });
  }
}
