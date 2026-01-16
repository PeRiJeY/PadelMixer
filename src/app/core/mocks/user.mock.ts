/**
 * Datos mock para usuarios
 */

import { User, UserProfile } from '../models/user.model';

/**
 * Lista de usuarios mock
 */
export const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@padelmixer.com',
    nombre: 'Admin',
    apellidos: 'PadelMixer',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin+PadelMixer&background=3f51b5&color=fff',
    activo: true,
    fechaRegistro: new Date('2024-01-15'),
    ultimoAcceso: new Date()
  },
  {
    id: '2',
    email: 'player@padelmixer.com',
    nombre: 'Juan',
    apellidos: 'García',
    role: 'player',
    avatar: 'https://ui-avatars.com/api/?name=Juan+Garcia&background=4caf50&color=fff',
    activo: true,
    fechaRegistro: new Date('2024-02-01'),
    ultimoAcceso: new Date()
  },
  {
    id: '3',
    email: 'organizer@padelmixer.com',
    nombre: 'María',
    apellidos: 'López',
    role: 'organizer',
    avatar: 'https://ui-avatars.com/api/?name=Maria+Lopez&background=ff9800&color=fff',
    activo: true,
    fechaRegistro: new Date('2024-01-20'),
    ultimoAcceso: new Date()
  }
];

/**
 * Perfiles completos de usuarios mock
 */
export const MOCK_USER_PROFILES: UserProfile[] = [
  {
    ...MOCK_USERS[0],
    telefono: '+34 600 000 001',
    ubicacion: 'Madrid, España',
    biografia: 'Administrador del sistema PadelMixer'
  },
  {
    ...MOCK_USERS[1],
    telefono: '+34 600 000 002',
    nivel: 'intermediate',
    piePreferido: 'derecho',
    posicionPreferida: 'drive',
    ubicacion: 'Barcelona, España',
    biografia: 'Jugador apasionado del pádel',
    redesSociales: {
      instagram: '@juangarcia_padel'
    }
  },
  {
    ...MOCK_USERS[2],
    telefono: '+34 600 000 003',
    nivel: 'advanced',
    piePreferido: 'izquierdo',
    posicionPreferida: 'reves',
    ubicacion: 'Valencia, España',
    biografia: 'Organizadora de torneos de pádel'
  }
];

/**
 * Obtiene un usuario por ID
 */
export function getMockUserById(id: string): User | undefined {
  return MOCK_USERS.find(user => user.id === id);
}

/**
 * Obtiene un perfil de usuario por ID
 */
export function getMockUserProfileById(id: string): UserProfile | undefined {
  return MOCK_USER_PROFILES.find(profile => profile.id === id);
}
