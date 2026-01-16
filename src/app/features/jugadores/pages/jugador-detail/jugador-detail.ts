import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

import { JugadoresService } from '../../../../core/services/jugadores.service';
import { Jugador, NIVEL_CONFIG } from '../../../../core/models/jugador.model';
import { LevelChipComponent } from '../../../../shared/components/molecules/level-chip/level-chip';

/**
 * Página de detalle de un jugador
 */
@Component({
  selector: 'app-jugador-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatChipsModule,
    LevelChipComponent
  ],
  templateUrl: './jugador-detail.html',
  styleUrl: './jugador-detail.css'
})
export class JugadorDetailComponent implements OnInit {
  private jugadoresService = inject(JugadoresService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public jugador = signal<Jugador | null>(null);
  public isLoading = signal<boolean>(true);
  public error = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadJugador(parseInt(id, 10));
    } else {
      this.error.set('ID de jugador no válido');
      this.isLoading.set(false);
    }
  }

  /**
   * Carga los datos del jugador
   */
  private loadJugador(id: number): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.jugadoresService.getJugadorById(id).subscribe({
      next: (jugador) => {
        this.jugador.set(jugador);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar los datos del jugador');
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Vuelve a la lista de jugadores
   */
  onBack(): void {
    this.router.navigate(['/jugadores']);
  }

  /**
   * Formatea una fecha ISO a formato legible
   */
  formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Calcula la edad a partir de la fecha de nacimiento
   */
  calculateAge(fechaNacimiento: string): number {
    const today = new Date();
    const birthDate = new Date(fechaNacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  /**
   * Obtiene la configuración del nivel
   */
  getNivelConfig(nivel: string) {
    return NIVEL_CONFIG[nivel as keyof typeof NIVEL_CONFIG];
  }
}
