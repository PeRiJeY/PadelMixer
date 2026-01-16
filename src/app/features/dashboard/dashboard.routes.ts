/**
 * Rutas del módulo dashboard
 */

import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/welcome/welcome.component').then(m => m.WelcomeComponent),
        title: 'Dashboard - PadelMixer'
      }
    ]
  }
];
