import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Jugador, JugadorFormData, NivelJuego, NIVEL_CONFIG } from '../../../../core/models/jugador.model';

/**
 * Componente organism: Formulario de jugador (crear/editar)
 */
@Component({
  selector: 'app-player-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './player-form.html',
  styleUrl: './player-form.css'
})
export class PlayerFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input() jugador?: Jugador;
  @Input() submitLabel: string = 'Guardar';
  
  @Output() formSubmit = new EventEmitter<JugadorFormData>();
  @Output() formCancel = new EventEmitter<void>();

  public form!: FormGroup;
  public niveles: Array<{ value: NivelJuego; label: string }> = [];
  public maxDate = new Date();

  ngOnInit(): void {
    this.initializeNiveles();
    this.createForm();
    
    if (this.jugador) {
      this.patchForm();
    }
  }

  /**
   * Inicializa el array de niveles
   */
  private initializeNiveles(): void {
    this.niveles = (Object.keys(NIVEL_CONFIG) as NivelJuego[]).map(key => ({
      value: key,
      label: NIVEL_CONFIG[key].label
    }));
  }

  /**
   * Crea el formulario reactivo
   */
  private createForm(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      apellidos: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.pattern(/^[0-9]{9}$/)]],
      fechaNacimiento: ['', Validators.required],
      nivelJuego: ['INICIACION' as NivelJuego, Validators.required],
      observaciones: ['', Validators.maxLength(500)]
    });
  }

  /**
   * Rellena el formulario con datos del jugador (modo edición)
   */
  private patchForm(): void {
    if (!this.jugador) return;

    this.form.patchValue({
      nombre: this.jugador.nombre,
      apellidos: this.jugador.apellidos,
      email: this.jugador.email,
      telefono: this.jugador.telefono || '',
      fechaNacimiento: new Date(this.jugador.fechaNacimiento),
      nivelJuego: this.jugador.nivelJuego,
      observaciones: this.jugador.observaciones || ''
    });
  }

  /**
   * Maneja el envío del formulario
   */
  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const fechaNacimiento = formValue.fechaNacimiento as Date;
      
      const data: JugadorFormData = {
        nombre: formValue.nombre,
        apellidos: formValue.apellidos,
        email: formValue.email,
        telefono: formValue.telefono || undefined,
        fechaNacimiento: fechaNacimiento.toISOString().split('T')[0],
        nivelJuego: formValue.nivelJuego,
        observaciones: formValue.observaciones || undefined
      };

      this.formSubmit.emit(data);
    } else {
      this.form.markAllAsTouched();
    }
  }

  /**
   * Maneja la cancelación
   */
  onCancel(): void {
    this.formCancel.emit();
  }

  /**
   * Obtiene el mensaje de error para un campo
   */
  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (!field || !field.errors || !field.touched) return '';

    if (field.errors['required']) return 'Este campo es obligatorio';
    if (field.errors['email']) return 'Email inválido';
    if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
    if (field.errors['maxlength']) return `Máximo ${field.errors['maxlength'].requiredLength} caracteres`;
    if (field.errors['pattern']) return 'Formato inválido (debe ser 9 dígitos)';

    return '';
  }
}
