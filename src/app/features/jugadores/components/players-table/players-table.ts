import { Component, Input, Output, EventEmitter, ViewChild, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Jugador } from '../../../../core/models/jugador.model';
import { LevelChipComponent } from '../../../../shared/components/molecules/level-chip/level-chip';

/**
 * Componente organism: Tabla de jugadores con paginación y ordenamiento
 */
@Component({
  selector: 'app-players-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    LevelChipComponent
  ],
  templateUrl: './players-table.html',
  styleUrl: './players-table.css'
})
export class PlayersTableComponent {
  @Input() set jugadores(value: Jugador[]) {
    this.dataSource.data = value;
  }
  
  @Input() isAdmin: boolean = false;
  
  @Output() viewPlayer = new EventEmitter<Jugador>();
  @Output() editPlayer = new EventEmitter<Jugador>();
  @Output() deletePlayer = new EventEmitter<Jugador>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  public dataSource = new MatTableDataSource<Jugador>([]);
  
  public displayedColumns: string[] = [
    'nombre',
    'email',
    'telefono',
    'nivelJuego',
    'fechaAlta',
    'activo',
    'acciones'
  ];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Maneja el click en ver detalle
   */
  onView(jugador: Jugador): void {
    this.viewPlayer.emit(jugador);
  }

  /**
   * Maneja el click en editar (solo admin)
   */
  onEdit(jugador: Jugador): void {
    if (this.isAdmin) {
      this.editPlayer.emit(jugador);
    }
  }

  /**
   * Maneja el click en eliminar (solo admin)
   */
  onDelete(jugador: Jugador): void {
    if (this.isAdmin) {
      this.deletePlayer.emit(jugador);
    }
  }

  /**
   * Formatea la fecha para mostrarla
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  }
}
