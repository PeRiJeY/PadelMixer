import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { NivelJuego, NIVEL_CONFIG } from '../../../../core/models/jugador.model';

/**
 * Componente reutilizable para mostrar el nivel de juego
 * con un chip coloreado según el nivel
 */
@Component({
  selector: 'app-level-chip',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './level-chip.html',
  styleUrl: './level-chip.css'
})
export class LevelChipComponent {
  @Input({ required: true }) nivel!: NivelJuego;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Obtiene la configuración visual del nivel
   */
  get config() {
    return NIVEL_CONFIG[this.nivel];
  }

  /**
   * Clases CSS según el tamaño
   */
  get sizeClass(): string {
    return `chip-${this.size}`;
  }
}
