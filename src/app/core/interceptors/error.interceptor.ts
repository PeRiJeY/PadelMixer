/**
 * Interceptor HTTP para manejo global de errores
 */

import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Interceptor funcional para manejo centralizado de errores HTTP
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ha ocurrido un error';

      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Error del lado del servidor
        switch (error.status) {
          case 401:
            // No autorizado - limpiar sesión y redirigir a login
            errorMessage = 'Sesión expirada. Por favor, inicia sesión nuevamente.';
            authService.logout();
            break;
          case 403:
            errorMessage = 'No tienes permisos para acceder a este recurso.';
            break;
          case 404:
            errorMessage = 'Recurso no encontrado.';
            break;
          case 500:
            errorMessage = 'Error interno del servidor.';
            break;
          default:
            errorMessage = error.error?.message || `Error ${error.status}: ${error.statusText}`;
        }
      }

      console.error('HTTP Error:', errorMessage, error);

      // Re-lanzar el error para que el componente lo maneje
      return throwError(() => new Error(errorMessage));
    })
  );
};
