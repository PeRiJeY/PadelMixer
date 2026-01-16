import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

/**
 * Rutas del módulo de jugadores
 */
export const JUGADORES_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/jugadores-list/jugadores-list').then(
            (m) => m.JugadoresListComponent
          ),
        title: 'Jugadores - PadelMixer'
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/jugador-detail/jugador-detail').then(
            (m) => m.JugadorDetailComponent
          ),
        title: 'Detalle Jugador - PadelMixer'
      }
    ]
  }
];
