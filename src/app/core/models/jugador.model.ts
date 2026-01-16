/**
 * Niveles de juego disponibles
 */
export type NivelJuego = 'INICIACION' | 'MEDIO' | 'AVANZADO' | 'PROFESIONAL';

/**
 * Entidad principal: Jugador
 */
export interface Jugador {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  telefono?: string;
  fechaNacimiento: string; // ISO 8601: "YYYY-MM-DD"
  nivelJuego: NivelJuego;
  fechaAlta: string; // ISO 8601: "YYYY-MM-DDTHH:mm:ss"
  observaciones?: string;
  activo: boolean;
}

/**
 * Datos del formulario
 */
export interface JugadorFormData {
  nombre: string;
  apellidos: string;
  email: string;
  telefono?: string;
  fechaNacimiento: string;
  nivelJuego: NivelJuego;
  observaciones?: string;
}

/**
 * Configuración visual por nivel
 */
export interface NivelConfig {
  label: string;
  color: string;
  backgroundColor: string;
  textColor: string;
}

/**
 * Mapeo de configuración por nivel
 */
export const NIVEL_CONFIG: Record<NivelJuego, NivelConfig> = {
  INICIACION: {
    label: 'Iniciación',
    color: 'success',
    backgroundColor: '#c8e6c9',
    textColor: '#2e7d32'
  },
  MEDIO: {
    label: 'Medio',
    color: 'primary',
    backgroundColor: '#bbdefb',
    textColor: '#1976d2'
  },
  AVANZADO: {
    label: 'Avanzado',
    color: 'accent',
    backgroundColor: '#ffe0b2',
    textColor: '#f57c00'
  },
  PROFESIONAL: {
    label: 'Profesional',
    color: 'warn',
    backgroundColor: '#ffcdd2',
    textColor: '#c62828'
  }
};

/**
 * Error de restricción de eliminación
 */
export interface DeleteRestrictionError {
  code: 'HAS_MATCHES' | 'HAS_TOURNAMENTS' | 'HAS_RESERVATIONS';
  message: string;
  details?: {
    matchesCount?: number;
    tournamentsCount?: number;
    reservationsCount?: number;
  };
}
