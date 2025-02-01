import { Injectable, NgZone } from '@angular/core';
import { environment } from 'env';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StreamNotificationService {

  private eventNotification!: EventSource;
  private notificationSubject = new BehaviorSubject<any>(null);

  array: [] = [];

  constructor(private zone: NgZone,) {
    this.streamTransactionNotification();
  }

  private streamTransactionNotification(): void{
    this.eventNotification = new EventSource(
      `${environment.API_BASE_URL_REACTOR}auditoria/stream?cuentaId= ${localStorage.getItem('numberAccount')}`);

    this.eventNotification.onmessage = (event: any) => {
      console.log(event);
      // this.array.push(event);
      
      // event.MessageEvent.forEach((element: any) => {
      //   console.log(this.array);
        // this.notificationSubject.next(event); // En caso de que necesitemos recibir todos los eventos en un array separado, se puede usar esta línea.
        // Pero en este caso solo necesitamos recibir el último evento. Así que se omite esta línea.
      // })
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
