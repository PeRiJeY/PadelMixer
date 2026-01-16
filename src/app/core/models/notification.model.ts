/**
 * Modelo de datos para notificaciones del sistema
 */

/**
 * Tipos de notificación disponibles
 */
export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'invite' | 'match';

/**
 * Interface principal de notificación
 */
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
  actionLabel?: string;
  metadata?: Record<string, any>;
}

/**
 * DTO para crear una nueva notificación
 */
export interface CreateNotificationDto {
  type: NotificationType;
  title: string;
  message: string;
  actionUrl?: string;
  actionLabel?: string;
  metadata?: Record<string, any>;
}

/**
 * DTO para actualizar el estado de una notificación
 */
export interface UpdateNotificationDto {
  read?: boolean;
}

/**
 * Estadísticas de notificaciones
 */
export interface NotificationStats {
  total: number;
  unread: number;
  byType: Record<NotificationType, number>;
}
