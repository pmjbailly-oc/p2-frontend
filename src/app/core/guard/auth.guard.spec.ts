import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { ActivatedRouteSnapshot, provideRouter, Router, RouterStateSnapshot } from '@angular/router';

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

  function stateFor(url: string): RouterStateSnapshot {
    return { url } as unknown as RouterStateSnapshot;
  }

  function routeSnapshot(): ActivatedRouteSnapshot {
    return {} as unknown as ActivatedRouteSnapshot;
  }

  it('should return true when a token is present', () => {
    // GIVEN
    localStorage.setItem('token', 'fake-token');
    // WHEN
    const result = guard.canActivate(routeSnapshot(), stateFor('/students'));
    // THEN
    expect(result).toBe(true);
  });

  it('should return false when no token', () => {
    // GIVEN - pas de token
    // WHEN
    const result = guard.canActivate(routeSnapshot(), stateFor('/students'));
    // THEN
    expect(result.toString()).toBe('/login');
  });

  it('should block access to a protected route and redirect to /login when no token', () => {
    // GIVEN - pas de token
    // WHEN
    const result = guard.canActivate(routeSnapshot(), stateFor('/students'));
    // THEN
    expect(result.toString()).toBe('/login');
  });

  it('should redirect a logged-in user away from /login', () => {
    // GIVEN
    localStorage.setItem('token', 'fake-token');
    // WHEN
    const result = guard.canActivate(routeSnapshot(), stateFor('/login'));
    // THEN
    expect(result.toString()).toBe('/students');
  });

  it('should redirect a logged-in user away from /register', () => {
    // GIVEN
    localStorage.setItem('token', 'fake-token');
    // WHEN
    const result = guard.canActivate(routeSnapshot(), stateFor('/register'));
    // THEN
    expect(result.toString()).toBe('/students');
  });
});
