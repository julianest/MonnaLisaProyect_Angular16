import { Injectable, NgZone } from '@angular/core';
import { environment } from 'env';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StreamNotificationService {
  private eventNotification!: EventSource;
  private readonly notificationSubject = new BehaviorSubject<any>(null);

  arrayCompleto: any[] = [];
  arrayFinals: any[] = [];

  url: string = '';

  constructor(private readonly zone: NgZone) {
    this.streamTransactionNotification();
    this.getStreamTransactionNotifications();
  }

  private streamTransactionNotification(): void {
    this.eventNotification = new EventSource(
      `${
        environment.API_BASE_URL_REACTOR
      }auditoria/stream?cuentaId=${localStorage.getItem('numberAccount')}`
    );

    this.eventNotification.onmessage = (event: any) => {
      const newTransaction = JSON.parse(event.data);

      this.arrayCompleto.unshift(newTransaction);
      this.arrayCompleto = this.arrayCompleto.slice(0, 2);

      this.zone.run(() => {
        this.notificationSubject.next([...this.arrayCompleto]);
      });

      this.eventNotification.onerror = (error) => {
        console.error('Error en SSE:', error);
        this.eventNotification.close();
      };
    };
  }

  setTransactionType(type: string): void {
    this.notificationSubject.next(
      this.arrayCompleto.filter((transaction: any) => transaction.type === type)
    );
  }


  getStreamTransactionNotifications(): Observable<any> {
    return this.notificationSubject.asObservable();
  }
}
