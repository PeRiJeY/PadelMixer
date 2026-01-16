/**
 * Guard para proteger rutas que requieren autenticación
 */

import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard funcional para rutas protegidas
 * Redirige a /auth/login si el usuario no está autenticado
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticatedSync() && !authService.isTokenExpired()) {
    return true;
  }

  // Guardar la URL intentada para redirigir después del login
  return router.createUrlTree(['/auth/login'], {
    queryParams: { returnUrl: state.url }
  });
};
