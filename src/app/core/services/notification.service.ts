/**
 * Servicio de gestión de notificaciones
 */

import { Injectable, signal, computed } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Notification, NotificationType } from '../models/notification.model';
import { 
  MOCK_NOTIFICATIONS, 
  getMockUnreadNotifications, 
  getMockUnreadCount 
} from '../mocks/notification.mock';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // Signals para gestión reactiva del estado
  private readonly notificationsSignal = signal<Notification[]>(MOCK_NOTIFICATIONS);
  private readonly loadingSignal = signal<boolean>(false);

  // Computed signals públicos
  public readonly notifications = this.notificationsSignal.asReadonly();
  public readonly loading = this.loadingSignal.asReadonly();
  
  public readonly unreadNotifications = computed(() => 
    this.notificationsSignal().filter(n => !n.read)
  );
  
  public readonly unreadCount = computed(() => 
    this.unreadNotifications().length
  );

  /**
   * Carga todas las notificaciones
   */
  public loadNotifications(): Observable<Notification[]> {
    this.loadingSignal.set(true);
    
    return of(MOCK_NOTIFICATIONS).pipe(
      delay(300),
      tap(notifications => {
        this.notificationsSignal.set(notifications);
        this.loadingSignal.set(false);
      })
    );
  }

  /**
   * Marca una notificación como leída
   */
  public markAsRead(notificationId: string): Observable<void> {
    return of(void 0).pipe(
      delay(200),
      tap(() => {
        const notifications = this.notificationsSignal();
        const updated = notifications.map(n => 
          n.id === notificationId ? { ...n, read: true } : n
        );
        this.notificationsSignal.set(updated);
      })
    );
  }

  /**
   * Marca todas las notificaciones como leídas
   */
  public markAllAsRead(): Observable<void> {
    return of(void 0).pipe(
      delay(200),
      tap(() => {
        const notifications = this.notificationsSignal();
        const updated = notifications.map(n => ({ ...n, read: true }));
        this.notificationsSignal.set(updated);
      })
    );
  }

  /**
   * Elimina una notificación
   */
  public deleteNotification(notificationId: string): Observable<void> {
    return of(void 0).pipe(
      delay(200),
      tap(() => {
        const notifications = this.notificationsSignal();
        const filtered = notifications.filter(n => n.id !== notificationId);
        this.notificationsSignal.set(filtered);
      })
    );
  }

  /**
   * Obtiene notificaciones por tipo
   */
  public getNotificationsByType(type: NotificationType): Notification[] {
    return this.notificationsSignal().filter(n => n.type === type);
  }
}

// Helper para usar tap
function tap<T>(fn: (value: T) => void) {
  return (source: Observable<T>) => 
    new Observable<T>(subscriber => {
      return source.subscribe({
        next(value) {
          fn(value);
          subscriber.next(value);
        },
        error(err) {
          subscriber.error(err);
        },
        complete() {
          subscriber.complete();
        }
      });
    });
}
