import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const targetUrl = state.url;
    const isLoggedIn = !!localStorage.getItem('token');

    // Si l'utilisateur est connecté et essaie d'accéder à login/register -> redirect vers students
    if (isLoggedIn && (targetUrl.includes('login') || targetUrl.includes('register'))) {
      return this.router.parseUrl('/students');
    }

    // Si l'utilisateur n'est pas connecté -> rediriger vers login
    if (!isLoggedIn) {
      return this.router.parseUrl('/login');
    }

    // Utilisateur connecté et sur une route protégée autorisée
    return true;
  }
}