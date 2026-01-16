/**
 * Modelo de datos para autenticación y autorización
 */

/**
 * Credenciales de login
 */
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Respuesta de autenticación del backend
 */
export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: {
    id: string;
    email: string;
    nombre: string;
    apellidos: string;
    role: string;
    avatar?: string;
  };
  expiresIn?: number;
}

/**
 * Token JWT decodificado
 */
export interface DecodedToken {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

/**
 * Estado de la sesión
 */
export interface SessionState {
  isAuthenticated: boolean;
  token: string | null;
  user: AuthResponse['user'] | null;
  expiresAt: number | null;
}

/**
 * DTO para registro de nuevo usuario
 */
export interface RegisterDto {
  email: string;
  password: string;
  nombre: string;
  apellidos: string;
  telefono?: string;
}

/**
 * DTO para cambio de contraseña
 */
export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * DTO para recuperación de contraseña
 */
export interface ForgotPasswordDto {
  email: string;
}

/**
 * DTO para reset de contraseña
 */
export interface ResetPasswordDto {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
