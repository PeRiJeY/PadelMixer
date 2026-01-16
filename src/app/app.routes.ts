import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';

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
    canActivate: [noAuthGuard],
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
      }
    ]
  },
  
  // Rutas protegidas con MainLayout
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      // Dashboard
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
      }
      
      // TODO: Descomentar cuando se implementen las siguientes features:
      
      // Jugadores (futuro)
      // {
      //   path: 'jugadores',
      //   loadChildren: () => import('./features/jugadores/jugadores.routes').then(m => m.JUGADORES_ROUTES)
      // },
      
      // Partidos (futuro)
      // {
      //   path: 'partidos',
      //   loadChildren: () => import('./features/partidos/partidos.routes').then(m => m.PARTIDOS_ROUTES)
      // },
      
      // Rankings (futuro)
      // {
      //   path: 'rankings',
      //   loadChildren: () => import('./features/rankings/rankings.routes').then(m => m.RANKINGS_ROUTES)
      // },
      
      // Reservas (futuro)
      // {
      //   path: 'reservas',
      //   loadChildren: () => import('./features/reservas/reservas.routes').then(m => m.RESERVAS_ROUTES)
      // },
      
      // Perfil (futuro)
      // {
      //   path: 'perfil',
      //   loadChildren: () => import('./features/perfil/perfil.routes').then(m => m.PERFIL_ROUTES)
      // }
    ]
  },
  
  // Ruta 404 - Not Found
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
