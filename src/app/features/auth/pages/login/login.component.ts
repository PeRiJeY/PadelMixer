/**
 * Página de login
 */

import { Component, inject, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { LoginCredentials } from '../../../../core/models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    LoginFormComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  // Referencia al formulario hijo
  private readonly loginForm = viewChild(LoginFormComponent);

  /**
   * Maneja el evento de login desde el formulario
   */
  public onLogin(credentials: LoginCredentials): void {
    const form = this.loginForm();
    if (!form) return;

    form.setLoading(true);
    form.clearError();

    this.authService.login(credentials).subscribe({
      next: () => {
        // Obtener la URL de retorno o ir al dashboard
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.router.navigateByUrl(returnUrl);
      },
      error: (error) => {
        form.setLoading(false);
        form.setError(error.message || 'Error al iniciar sesión');
      }
    });
  }
}
