import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NivelJuego, NIVEL_CONFIG } from '../../../../core/models/jugador.model';

/**
 * Componente reutilizable para filtrar por nivel de juego
 */
@Component({
  selector: 'app-level-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './level-filter.html',
  styleUrl: './level-filter.css'
})
export class LevelFilterComponent {
  @Output() filterChange = new EventEmitter<NivelJuego | null>();
  
  public selectedLevel = signal<NivelJuego | null>(null);
  
  // Niveles disponibles para el filtro
  public readonly niveles: { value: NivelJuego; label: string }[] = [
    { value: 'INICIACION', label: NIVEL_CONFIG['INICIACION'].label },
    { value: 'MEDIO', label: NIVEL_CONFIG['MEDIO'].label },
    { value: 'AVANZADO', label: NIVEL_CONFIG['AVANZADO'].label },
    { value: 'PROFESIONAL', label: NIVEL_CONFIG['PROFESIONAL'].label }
  ];

  /**
   * Maneja el cambio en el filtro de nivel
   */
  onFilterChange(value: NivelJuego | null): void {
    this.selectedLevel.set(value);
    this.filterChange.emit(value);
  }

  /**
   * Limpia el filtro
   */
  clearFilter(): void {
    this.selectedLevel.set(null);
    this.filterChange.emit(null);
  }
}
