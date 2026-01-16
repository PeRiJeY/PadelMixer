import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/**
 * Componente reutilizable de barra de búsqueda
 */
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBarComponent {
  @Output() searchChange = new EventEmitter<string>();
  
  public searchTerm = signal<string>('');

  /**
   * Maneja el cambio en el input de búsqueda
   */
  onSearchChange(value: string): void {
    this.searchTerm.set(value);
    this.searchChange.emit(value);
  }

  /**
   * Limpia el campo de búsqueda
   */
  clearSearch(): void {
    this.searchTerm.set('');
    this.searchChange.emit('');
  }
}
