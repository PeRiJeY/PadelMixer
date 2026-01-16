/**
 * Datos mock para autenticación
 */

import { AuthResponse, LoginCredentials } from '../models/auth.model';

/**
 * Usuario mock para desarrollo
 */
export const MOCK_USER: AuthResponse = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJhZG1pbkBwYWRlbG1peGVyLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNTQzMDQwMCwiZXhwIjoxNzA1NTE2ODAwfQ.dummytoken',
  refreshToken: 'refresh_token_mock_12345',
  user: {
    id: '1',
    email: 'admin@padelmixer.com',
    nombre: 'Admin',
    apellidos: 'PadelMixer',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin+PadelMixer&background=3f51b5&color=fff'
  },
  expiresIn: 86400
};

/**
 * Credenciales válidas para testing
 */
export const VALID_CREDENTIALS: LoginCredentials[] = [
  {
    email: 'admin@padelmixer.com',
    password: 'admin123'
  },
  {
    email: 'player@padelmixer.com',
    password: 'player123'
  },
  {
    email: 'organizer@padelmixer.com',
    password: 'organizer123'
  }
];

/**
 * Respuestas mock según credenciales
 */
export const MOCK_AUTH_RESPONSES: Record<string, AuthResponse> = {
  'admin@padelmixer.com': {
    token: 'mock_token_admin',
    user: {
      id: '1',
      email: 'admin@padelmixer.com',
      nombre: 'Admin',
      apellidos: 'PadelMixer',
      role: 'admin',
      avatar: 'https://ui-avatars.com/api/?name=Admin+PadelMixer&background=3f51b5&color=fff'
    },
    expiresIn: 86400
  },
  'player@padelmixer.com': {
    token: 'mock_token_player',
    user: {
      id: '2',
      email: 'player@padelmixer.com',
      nombre: 'Juan',
      apellidos: 'García',
      role: 'player',
      avatar: 'https://ui-avatars.com/api/?name=Juan+Garcia&background=4caf50&color=fff'
    },
    expiresIn: 86400
  },
  'organizer@padelmixer.com': {
    token: 'mock_token_organizer',
    user: {
      id: '3',
      email: 'organizer@padelmixer.com',
      nombre: 'María',
      apellidos: 'López',
      role: 'organizer',
      avatar: 'https://ui-avatars.com/api/?name=Maria+Lopez&background=ff9800&color=fff'
    },
    expiresIn: 86400
  }
};

/**
 * Simula un delay de red
 */
export function mockDelay(ms: number = 500): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
