/**
 * Servicio de autenticación y gestión de sesiones
 */

import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { tap, delay, map, catchError } from 'rxjs/operators';

import { LoginCredentials, AuthResponse, SessionState } from '../models/auth.model';
import { MOCK_AUTH_RESPONSES, mockDelay } from '../mocks/auth.mock';

/**
 * Clave para almacenar el token en localStorage
 */
const TOKEN_KEY = 'padelmixer_token';
const USER_KEY = 'padelmixer_user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  // Signals para gestión reactiva del estado
  private readonly tokenSignal = signal<string | null>(this.getStoredToken());
  private readonly userSignal = signal<AuthResponse['user'] | null>(this.getStoredUser());
  private readonly loadingSignal = signal<boolean>(false);

  // Computed signals públicos
  public readonly token = this.tokenSignal.asReadonly();
  public readonly currentUser = this.userSignal.asReadonly();
  public readonly loading = this.loadingSignal.asReadonly();
  public readonly isAuthenticated = computed(() => !!this.tokenSignal());

  /**
   * Login de usuario
   */
  public login(credentials: LoginCredentials): Observable<AuthResponse> {
    this.loadingSignal.set(true);

    // Simulación con mocks
    return this.mockLogin(credentials).pipe(
      tap(response => {
        this.setSession(response);
        this.loadingSignal.set(false);
      }),
      catchError(error => {
        this.loadingSignal.set(false);
        return throwError(() => error);
      })
    );
  }

  /**
   * Logout de usuario
   */
  public logout(): void {
    this.clearSession();
    this.router.navigate(['/auth/login']);
  }

  /**
   * Verifica si el usuario está autenticado
   */
  public isAuthenticatedSync(): boolean {
    return !!this.tokenSignal();
  }

  /**
   * Obtiene el token actual
   */
  public getToken(): string | null {
    return this.tokenSignal();
  }

  /**
   * Verifica si el token ha expirado
   */
  public isTokenExpired(): boolean {
    const token = this.tokenSignal();
    if (!token) return true;

    // En producción, decodificar el JWT y verificar exp
    // Por ahora, retornamos false para el mock
    return false;
  }

  /**
   * Refresca el token
   */
  public refreshToken(): Observable<AuthResponse> {
    // TODO: Implementar cuando el backend esté disponible
    return throwError(() => new Error('Not implemented'));
  }

  /**
   * Establece la sesión del usuario
   */
  private setSession(authResponse: AuthResponse): void {
    this.tokenSignal.set(authResponse.token);
    this.userSignal.set(authResponse.user);
    
    localStorage.setItem(TOKEN_KEY, authResponse.token);
    localStorage.setItem(USER_KEY, JSON.stringify(authResponse.user));
  }

  /**
   * Limpia la sesión del usuario
   */
  private clearSession(): void {
    this.tokenSignal.set(null);
    this.userSignal.set(null);
    
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  /**
   * Obtiene el token almacenado
   */
  private getStoredToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Obtiene el usuario almacenado
   */
  private getStoredUser(): AuthResponse['user'] | null {
    const userJson = localStorage.getItem(USER_KEY);
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  }

  /**
   * Mock de login para desarrollo
   */
  private mockLogin(credentials: LoginCredentials): Observable<AuthResponse> {
    return of(null).pipe(
      delay(800), // Simula latencia de red
      map(() => {
        const response = MOCK_AUTH_RESPONSES[credentials.email];
        
        if (!response) {
          throw new Error('Credenciales inválidas');
        }

        // Verificar password (solo para mock)
        const validPasswords: Record<string, string> = {
          'admin@padelmixer.com': 'admin123',
          'player@padelmixer.com': 'player123',
          'organizer@padelmixer.com': 'organizer123'
        };

        if (validPasswords[credentials.email] !== credentials.password) {
          throw new Error('Credenciales inválidas');
        }

        return response;
      })
    );
  }
}
