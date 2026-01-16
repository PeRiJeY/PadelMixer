import { Routes } from '@angular/router';

/**
 * Configuración de rutas de la aplicación PadelMixer
 * 
 * Estructura:
 * - Rutas públicas (auth) con noAuthGuard
 * - Rutas protegidas (dashboard, jugadores, etc.) con authGuard
 * - Lazy loading para todos los módulos de features
 */
export const routes: Routes = [
  // Ruta raíz - redirige a dashboard si está autenticado
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  
  // Rutas públicas - Autenticación
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  
  // Rutas protegidas - Dashboard
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
  },
  
  // Rutas protegidas - Jugadores (futuro)
  {
    path: 'jugadores',
    loadChildren: () => import('./features/jugadores/jugadores.routes').then(m => m.JUGADORES_ROUTES)
  },
  
  // Rutas protegidas - Partidos (futuro)
  {
    path: 'partidos',
    loadChildren: () => import('./features/partidos/partidos.routes').then(m => m.PARTIDOS_ROUTES)
  },
  
  // Rutas protegidas - Rankings (futuro)
  {
    path: 'rankings',
    loadChildren: () => import('./features/rankings/rankings.routes').then(m => m.RANKINGS_ROUTES)
  },
  
  // Rutas protegidas - Reservas (futuro)
  {
    path: 'reservas',
    loadChildren: () => import('./features/reservas/reservas.routes').then(m => m.RESERVAS_ROUTES)
  },
  
  // Rutas protegidas - Perfil (futuro)
  {
    path: 'perfil',
    loadChildren: () => import('./features/perfil/perfil.routes').then(m => m.PERFIL_ROUTES)
  },
  
  // Ruta 404 - Not Found
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
