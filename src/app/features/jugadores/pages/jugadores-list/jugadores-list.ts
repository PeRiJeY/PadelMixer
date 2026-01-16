import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { JugadoresService } from '../../../../core/services/jugadores.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Jugador, JugadorFormData, NivelJuego } from '../../../../core/models/jugador.model';

import { SearchBarComponent } from '../../../../shared/components/molecules/search-bar/search-bar';
import { LevelFilterComponent } from '../../../../shared/components/molecules/level-filter/level-filter';
import { PlayersTableComponent } from '../../components/players-table/players-table';
import { PlayerFormComponent } from '../../components/player-form/player-form';

/**
 * Página principal: Listado de jugadores
 */
@Component({
  selector: 'app-jugadores-list',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    SearchBarComponent,
    LevelFilterComponent,
    PlayersTableComponent
  ],
  templateUrl: './jugadores-list.html',
  styleUrl: './jugadores-list.css'
})
export class JugadoresListComponent implements OnInit {
  private jugadoresService = inject(JugadoresService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  // Signals para estado local
  private searchTermSignal = signal<string>('');
  private selectedLevelSignal = signal<NivelJuego | null>(null);

  // Signals del servicio
  public jugadores = this.jugadoresService.jugadores;
  public isLoading = this.jugadoresService.isLoading;
  public currentUser = this.authService.currentUser;

  // Computed: si el usuario es admin
  public isAdmin = computed(() => {
    const user = this.currentUser();
    return user?.role === 'ADMIN';
  });

  // Computed: jugadores filtrados
  public filteredJugadores = computed(() => {
    let result = this.jugadores();
    const searchTerm = this.searchTermSignal().toLowerCase();
    const selectedLevel = this.selectedLevelSignal();

    // Filtrar por búsqueda
    if (searchTerm) {
      result = result.filter(j =>
        j.nombre.toLowerCase().includes(searchTerm) ||
        j.apellidos.toLowerCase().includes(searchTerm) ||
        j.email.toLowerCase().includes(searchTerm)
      );
    }

    // Filtrar por nivel
    if (selectedLevel) {
      result = result.filter(j => j.nivelJuego === selectedLevel);
    }

    return result;
  });

  ngOnInit(): void {
    this.loadJugadores();
  }

  /**
   * Carga la lista de jugadores
   */
  loadJugadores(): void {
    this.jugadoresService.loadJugadores().subscribe({
      error: (error) => {
        this.snackBar.open('Error al cargar jugadores', 'Cerrar', { duration: 3000 });
      }
    });
  }

  /**
   * Maneja el cambio en la búsqueda
   */
  onSearchChange(term: string): void {
    this.searchTermSignal.set(term);
  }

  /**
   * Maneja el cambio en el filtro de nivel
   */
  onLevelFilterChange(level: NivelJuego | null): void {
    this.selectedLevelSignal.set(level);
  }

  /**
   * Abre el diálogo para crear nuevo jugador
   */
  onAddPlayer(): void {
    const dialogRef = this.dialog.open(PlayerFormDialogComponent, {
      width: '600px',
      data: { mode: 'create' }
    });

    dialogRef.afterClosed().subscribe((data: JugadorFormData | undefined) => {
      if (data) {
        this.createPlayer(data);
      }
    });
  }

  /**
   * Crea un nuevo jugador
   */
  private createPlayer(data: JugadorFormData): void {
    this.jugadoresService.createJugador(data).subscribe({
      next: () => {
        this.snackBar.open('Jugador creado correctamente', 'Cerrar', { duration: 3000 });
        this.loadJugadores();
      },
      error: () => {
        this.snackBar.open('Error al crear jugador', 'Cerrar', { duration: 3000 });
      }
    });
  }

  /**
   * Navega al detalle del jugador
   */
  onViewPlayer(jugador: Jugador): void {
    this.router.navigate(['/jugadores', jugador.id]);
  }

  /**
   * Abre el diálogo para editar jugador
   */
  onEditPlayer(jugador: Jugador): void {
    const dialogRef = this.dialog.open(PlayerFormDialogComponent, {
      width: '600px',
      data: { mode: 'edit', jugador }
    });

    dialogRef.afterClosed().subscribe((data: JugadorFormData | undefined) => {
      if (data) {
        this.updatePlayer(jugador.id, data);
      }
    });
  }

  /**
   * Actualiza un jugador
   */
  private updatePlayer(id: number, data: JugadorFormData): void {
    this.jugadoresService.updateJugador(id, data).subscribe({
      next: () => {
        this.snackBar.open('Jugador actualizado correctamente', 'Cerrar', { duration: 3000 });
        this.loadJugadores();
      },
      error: () => {
        this.snackBar.open('Error al actualizar jugador', 'Cerrar', { duration: 3000 });
      }
    });
  }

  /**
   * Abre el diálogo de confirmación para eliminar
   */
  onDeletePlayer(jugador: Jugador): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: { jugador }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deletePlayer(jugador.id);
      }
    });
  }

  /**
   * Elimina un jugador
   */
  private deletePlayer(id: number): void {
    this.jugadoresService.deleteJugador(id).subscribe({
      next: () => {
        this.snackBar.open('Jugador eliminado correctamente', 'Cerrar', { duration: 3000 });
        this.loadJugadores();
      },
      error: (error) => {
        const message = error.error?.message || 'Error al eliminar jugador';
        this.snackBar.open(message, 'Cerrar', { duration: 5000 });
      }
    });
  }
}

/**
 * Diálogo para formulario de jugador (crear/editar)
 */
@Component({
  selector: 'app-player-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    PlayerFormComponent
  ],
  template: `
    <h2 mat-dialog-title>{{ data.mode === 'create' ? 'Nuevo Jugador' : 'Editar Jugador' }}</h2>
    <mat-dialog-content>
      <app-player-form
        [jugador]="data.jugador"
        [submitLabel]="data.mode === 'create' ? 'Crear' : 'Actualizar'"
        (formSubmit)="onSubmit($event)"
        (formCancel)="onCancel()">
      </app-player-form>
    </mat-dialog-content>
  `,
  styles: [`
    mat-dialog-content {
      min-height: 400px;
      padding: 0;
    }
  `]
})
export class PlayerFormDialogComponent {
  public data = inject<{ mode: 'create' | 'edit'; jugador?: Jugador }>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<PlayerFormDialogComponent>);

  onSubmit(data: JugadorFormData): void {
    this.dialogRef.close(data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

/**
 * Diálogo de confirmación de eliminación
 */
@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Confirmar Eliminación</h2>
    <mat-dialog-content>
      <p>¿Está seguro de que desea eliminar al jugador <strong>{{ data.jugador.nombre }} {{ data.jugador.apellidos }}</strong>?</p>
      <p class="warning">Esta acción no se puede deshacer.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="warn" (click)="onConfirm()">Eliminar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .warning {
      color: #f44336;
      font-weight: 500;
      margin-top: 16px;
    }
    mat-dialog-content {
      min-width: 300px;
    }
  `]
})
export class ConfirmDeleteDialogComponent {
  public data = inject<{ jugador: Jugador }>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ConfirmDeleteDialogComponent>);

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
