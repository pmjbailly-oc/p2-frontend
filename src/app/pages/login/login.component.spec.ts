import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { UserService } from '../../core/service/user.service';
import { UserMockService } from '../../core/service/user-mock.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    sessionStorage.clear();
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: UserService, useClass: UserMockService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should store the token in sessionStorage after successful login', () => {
    // GIVEN - formulaire valide
    component.loginForm.setValue({
      login: 'pmj.bailly',
      password: 'pmjbailly13122'
    });
    // WHEN
    component.onSubmit();
    // THEN - le mock renvoie { token: 'mock-token' }
    expect(sessionStorage.getItem('token')).toBe('mock-token');
    expect(component.isAuthenticated).toBe(true);
  });
});
