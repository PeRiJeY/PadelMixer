/**
 * Guard para rutas públicas (como login)
 * Redirige al dashboard si el usuario ya está autenticado
 */

import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard funcional para rutas públicas
 * Redirige a /dashboard si el usuario ya está autenticado
 */
export const noAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticatedSync() && !authService.isTokenExpired()) {
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};
