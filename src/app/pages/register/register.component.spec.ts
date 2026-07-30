import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../core/service/user.service';
import { UserMockService } from '../../core/service/user-mock.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: UserService, useClass: UserMockService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit when form is invalid', () => {
    // GIVEN - formulaire vide = invalide
    // WHEN
    component.onSubmit();
    // THEN
    expect(component.submitted).toBe(true);
    expect(component.registerForm.invalid).toBe(true);
  });

  it('should register and navigate to /login', () => {
    // GIVEN - formulaire valide
    component.registerForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      login: 'jdoe',
      password: 'password'
    });
    const navigateSpy = jest.spyOn(router, 'navigate');
    // WHEN
    component.onSubmit();
    // THEN
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
