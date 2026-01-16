/**
 * Componente de formulario de login
 */

import { Component, inject, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

import { LoginCredentials } from '../../../../core/models/auth.model';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  private readonly fb = inject(FormBuilder);

  public readonly form: FormGroup;
  public readonly hidePassword = signal<boolean>(true);
  public readonly isLoading = signal<boolean>(false);
  public readonly errorMessage = signal<string | null>(null);

  // Output events
  public readonly loginSubmit = output<LoginCredentials>();

  constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  /**
   * Toggle visibilidad de la contraseña
   */
  public togglePasswordVisibility(): void {
    this.hidePassword.set(!this.hidePassword());
  }

  /**
   * Submit del formulario
   */
  public onSubmit(): void {
    if (this.form.valid) {
      this.errorMessage.set(null);
      const credentials: LoginCredentials = this.form.value;
      this.loginSubmit.emit(credentials);
    } else {
      this.form.markAllAsTouched();
    }
  }

  /**
   * Establece el estado de loading
   */
  public setLoading(loading: boolean): void {
    this.isLoading.set(loading);
    if (loading) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  /**
   * Establece un mensaje de error
   */
  public setError(message: string): void {
    this.errorMessage.set(message);
  }

  /**
   * Limpia el mensaje de error
   */
  public clearError(): void {
    this.errorMessage.set(null);
  }
}
