import { Injectable, NgZone } from '@angular/core';
import { environment } from 'env';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StreamNotificationService {

  private eventNotification!: EventSource;
  private notificationSubject = new BehaviorSubject<any>(null);

  constructor(private zone: NgZone,) {
    this.streamTransactionNotification();
  }

  private streamTransactionNotification(): void{
    this.eventNotification = new EventSource(
      `${environment.API_BASE_URL_REACTOR}'auditoria/stream?cuentaId= ${localStorage.getItem('identificationNumber')}`);

    this.eventNotification.onmessage = (event) => {
      const transaction = JSON.parse(event.data);

      this.zone.run(() => {
        this.notificationSubject.next(transaction);
      });
    };

    this.eventNotification.onerror = (error) => {
      console.error('Error en SSE:', error);
      this.eventNotification.close();
    };

  }

  getStreamTransactionNotifications(): Observable<any> {
    return this.notificationSubject.asObservable();
}

}
