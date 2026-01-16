/**
 * Datos mock para notificaciones
 */

import { Notification, NotificationType } from '../models/notification.model';

/**
 * Lista de notificaciones mock
 */
export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'invite',
    title: 'Nueva invitación a partido',
    message: 'Juan García te ha invitado a jugar un partido el sábado 20/01',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
    actionUrl: '/partidos/123',
    actionLabel: 'Ver partido'
  },
  {
    id: '2',
    type: 'match',
    title: 'Partido confirmado',
    message: 'Tu partido para el viernes 19/01 a las 18:00 ha sido confirmado',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
    actionUrl: '/partidos/122',
    actionLabel: 'Ver detalles'
  },
  {
    id: '3',
    type: 'success',
    title: 'Reserva completada',
    message: 'Tu reserva de la pista central ha sido procesada exitosamente',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 horas atrás
    actionUrl: '/reservas/45',
    actionLabel: 'Ver reserva'
  },
  {
    id: '4',
    type: 'info',
    title: 'Actualización del sistema',
    message: 'Se ha actualizado la plataforma con nuevas funcionalidades',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 día atrás
  },
  {
    id: '5',
    type: 'warning',
    title: 'Pago pendiente',
    message: 'Tienes un pago pendiente para el partido del domingo',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 horas atrás
    actionUrl: '/pagos/789',
    actionLabel: 'Pagar ahora'
  }
];

/**
 * Obtiene notificaciones por tipo
 */
export function getMockNotificationsByType(type: NotificationType): Notification[] {
  return MOCK_NOTIFICATIONS.filter(n => n.type === type);
}

/**
 * Obtiene notificaciones no leídas
 */
export function getMockUnreadNotifications(): Notification[] {
  return MOCK_NOTIFICATIONS.filter(n => !n.read);
}

/**
 * Obtiene el conteo de notificaciones no leídas
 */
export function getMockUnreadCount(): number {
  return getMockUnreadNotifications().length;
}
