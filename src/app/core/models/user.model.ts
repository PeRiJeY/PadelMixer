/**
 * Modelo de datos para usuarios del sistema PadelMixer
 */

/**
 * Roles disponibles en el sistema
 */
export type UserRole = 'admin' | 'player' | 'organizer';

/**
 * Niveles de juego para jugadores de pádel
 */
export type PlayerLevel = 'beginner' | 'intermediate' | 'advanced' | 'professional';

/**
 * Interface principal de usuario
 */
export interface User {
  id: string;
  email: string;
  nombre: string;
  apellidos: string;
  role: UserRole;
  avatar?: string;
  activo: boolean;
  fechaRegistro: Date;
  ultimoAcceso?: Date;
}

/**
 * Perfil extendido de usuario con información adicional
 */
export interface UserProfile extends User {
  telefono?: string;
  nivel?: PlayerLevel;
  piePreferido?: 'derecho' | 'izquierdo' | 'ambos';
  posicionPreferida?: 'drive' | 'reves' | 'ambas';
  ubicacion?: string;
  biografia?: string;
  redesSociales?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
}

/**
 * DTO para actualización de perfil de usuario
 */
export interface UpdateUserProfileDto {
  nombre?: string;
  apellidos?: string;
  telefono?: string;
  nivel?: PlayerLevel;
  piePreferido?: 'derecho' | 'izquierdo' | 'ambos';
  posicionPreferida?: 'drive' | 'reves' | 'ambas';
  ubicacion?: string;
  biografia?: string;
  avatar?: string;
}

/**
 * Usuario simplificado para listados
 */
export interface UserSummary {
  id: string;
  nombre: string;
  apellidos: string;
  avatar?: string;
  nivel?: PlayerLevel;
}
