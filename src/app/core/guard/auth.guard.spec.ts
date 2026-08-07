import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { provideRouter } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        provideRouter([]),
      ]
    });
    guard = TestBed.inject(AuthGuard);
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true when a token is present', () => {
    // GIVEN
    sessionStorage.setItem('token', 'fake-token');
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
});
