import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { provideRouter, Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        provideRouter([]),
      ]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true when a token is present', () => {
    // GIVEN
    localStorage.setItem('token', 'fake-token');
    // WHEN
    const result = guard.canActivate();
    // THEN
    expect(result).toBe(true);
  });

  it('should return false when no token', () => {
    // GIVEN - pas de token
    // WHEN
    const result = guard.canActivate();
    // THEN
    expect(result).toBe(false);
  });

  it('should block access to a protected route and redirect to /login when no token', () => {
    // GIVEN - pas de token
    const navigateSpy = jest.spyOn(router, 'navigate');
    // WHEN
    const result = guard.canActivate();
    // THEN
    expect(result).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should redirect a logged-in user away from /login', () => {
    // GIVEN
    localStorage.setItem('token', 'fake-token');
    Object.defineProperty(router, 'url', { value: '/login', configurable: true });
    const navigateSpy = jest.spyOn(router, 'navigate');
    // WHEN
    const result = guard.canActivate();
    // THEN
    expect(result).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/students']);
  });

  it('should redirect a logged-in user away from /register', () => {
    // GIVEN
    localStorage.setItem('token', 'fake-token');
    Object.defineProperty(router, 'url', { value: '/register', configurable: true });
    const navigateSpy = jest.spyOn(router, 'navigate');
    // WHEN
    const result = guard.canActivate();
    // THEN
    expect(result).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/students']);
  });
});
