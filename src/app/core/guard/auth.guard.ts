import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  private router = inject(Router);

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('token');

    // Si l'utilisateur est connecté et essaie d'accéder à login/register -> redirect vers students
    if (isLoggedIn) {
      const currentUrl = this.router.url;
      if (currentUrl.includes('login') || currentUrl.includes('register')) {
        this.router.navigate(['/students']);
        return false;
      }
    }

    // Si l'utilisateur n'est pas connecté -> rediriger vers login
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    // Utilisateur connecté et sur une route protégée autorisée
    return true;
  }
}