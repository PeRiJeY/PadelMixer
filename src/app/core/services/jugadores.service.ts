import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, delay, catchError } from 'rxjs/operators';

import { Jugador, JugadorFormData, DeleteRestrictionError } from '../models/jugador.model';
import { JUGADORES_MOCK, generateJugadorId, simulateNetworkDelay } from '../mocks/jugadores.mock';
import { containsIgnoringAccents } from '../../shared/utils/string.utils';

/**
 * Servicio para gestión de jugadores
 * Implementa operaciones CRUD con soporte para datos mock
 */
@Injectable({
  providedIn: 'root'
})
export class JugadoresService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/jugadores';
  
  // Configuración: usar mocks o API real
  private readonly USE_MOCKS = true; // Cambiar a false cuando el backend esté disponible

  // Estado reactivo con Signals
  private jugadoresSignal = signal<Jugador[]>([]);
  public jugadores = this.jugadoresSignal.asReadonly();

  private isLoadingSignal = signal<boolean>(false);
  public isLoading = this.isLoadingSignal.asReadonly();

  private errorSignal = signal<string | null>(null);
  public error = this.errorSignal.asReadonly();

  // Mock data storage (solo para modo mock)
  private mockData: Jugador[] = [...JUGADORES_MOCK];

  /**
   * Carga todos los jugadores
   */
  loadJugadores(): Observable<Jugador[]> {
    this.isLoadingSignal.set(true);
    this.errorSignal.set(null);

    if (this.USE_MOCKS) {
      return of([...this.mockData]).pipe(
        delay(300), // Simula latencia de red
        tap(jugadores => {
          this.jugadoresSignal.set(jugadores);
          this.isLoadingSignal.set(false);
        }),
        catchError(error => {
          this.handleError('Error al cargar jugadores', error);
          return throwError(() => error);
        })
      );
    }

    return this.http.get<Jugador[]>(this.API_URL).pipe(
      tap(jugadores => {
        this.jugadoresSignal.set(jugadores);
        this.isLoadingSignal.set(false);
      }),
      catchError(error => {
        this.handleError('Error al cargar jugadores', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Obtiene un jugador por ID
   */
  getJugadorById(id: number): Observable<Jugador> {
    if (this.USE_MOCKS) {
      const jugador = this.mockData.find(j => j.id === id);
      
      if (!jugador) {
        return throwError(() => new Error('Jugador no encontrado'));
      }

      return of({ ...jugador }).pipe(delay(200));
    }

    return this.http.get<Jugador>(`${this.API_URL}/${id}`).pipe(
      catchError(error => {
        this.handleError(`Error al obtener jugador ${id}`, error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Crea un nuevo jugador
   */
  createJugador(data: JugadorFormData): Observable<Jugador> {
    if (this.USE_MOCKS) {
      const newJugador: Jugador = {
        id: generateJugadorId(),
        ...data,
        fechaAlta: new Date().toISOString(),
        activo: true
      };

      this.mockData.push(newJugador);
      this.jugadoresSignal.set([...this.mockData]);

      return of({ ...newJugador }).pipe(delay(400));
    }

    return this.http.post<Jugador>(this.API_URL, data).pipe(
      tap(jugador => {
        const updated = [...this.jugadores(), jugador];
        this.jugadoresSignal.set(updated);
      }),
      catchError(error => {
        this.handleError('Error al crear jugador', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Actualiza un jugador existente
   */
  updateJugador(id: number, data: Partial<JugadorFormData>): Observable<Jugador> {
    if (this.USE_MOCKS) {
      const index = this.mockData.findIndex(j => j.id === id);
      
      if (index === -1) {
        return throwError(() => new Error('Jugador no encontrado'));
      }

      const updatedJugador: Jugador = {
        ...this.mockData[index],
        ...data
      };

      this.mockData[index] = updatedJugador;
      this.jugadoresSignal.set([...this.mockData]);

      return of({ ...updatedJugador }).pipe(delay(400));
    }

    return this.http.put<Jugador>(`${this.API_URL}/${id}`, data).pipe(
      tap(jugador => {
        const updated = this.jugadores().map(j => j.id === id ? jugador : j);
        this.jugadoresSignal.set(updated);
      }),
      catchError(error => {
        this.handleError(`Error al actualizar jugador ${id}`, error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Elimina un jugador
   * Valida que no tenga dependencias (partidos, torneos, reservas)
   */
  deleteJugador(id: number): Observable<void> {
    if (this.USE_MOCKS) {
      const jugador = this.mockData.find(j => j.id === id);
      
      if (!jugador) {
        return throwError(() => new Error('Jugador no encontrado'));
      }

      // Simulación de validación de restricciones
      // En un caso real, el backend validaría esto
      const hasRestrictions = Math.random() > 0.8; // 20% chance de tener restricciones
      
      if (hasRestrictions) {
        const error: DeleteRestrictionError = {
          code: 'HAS_MATCHES',
          message: 'No se puede eliminar el jugador porque tiene partidos asociados',
          details: {
            matchesCount: Math.floor(Math.random() * 10) + 1
          }
        };
        return throwError(() => error);
      }

      // Eliminar del mock
      this.mockData = this.mockData.filter(j => j.id !== id);
      this.jugadoresSignal.set([...this.mockData]);

      return of(void 0).pipe(delay(300));
    }

    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(() => {
        const updated = this.jugadores().filter(j => j.id !== id);
        this.jugadoresSignal.set(updated);
      }),
      catchError(error => {
        this.handleError(`Error al eliminar jugador ${id}`, error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Busca jugadores por texto (insensible a acentos y mayúsculas)
   * Ejemplos: "lopez" encontrará "López", "garcia" encontrará "García"
   */
  searchJugadores(searchTerm: string): Jugador[] {
    const term = searchTerm.trim();
    
    if (!term) {
      return this.jugadores();
    }

    return this.jugadores().filter(jugador =>
      containsIgnoringAccents(jugador.nombre, term) ||
      containsIgnoringAccents(jugador.apellidos, term) ||
      containsIgnoringAccents(jugador.email, term)
    );
  }

  /**
   * Filtra jugadores por nivel
   */
  filterByNivel(nivel: string | null): Jugador[] {
    if (!nivel) {
      return this.jugadores();
    }

    return this.jugadores().filter(jugador => jugador.nivelJuego === nivel);
  }

  /**
   * Filtra jugadores activos
   */
  getActiveJugadores(): Jugador[] {
    return this.jugadores().filter(jugador => jugador.activo);
  }

  /**
   * Maneja errores y actualiza el estado
   */
  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.errorSignal.set(message);
    this.isLoadingSignal.set(false);
  }

  /**
   * Limpia el error actual
   */
  clearError(): void {
    this.errorSignal.set(null);
  }
}
