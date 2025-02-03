import { Injectable, NgZone, OnInit } from '@angular/core';
import { environment } from 'env';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StreamNotificationService implements OnInit {

  private eventNotification!: EventSource;
  private notificationSubject = new BehaviorSubject<any>(null);

  arrayCompleto: any[] = [];
  arrayFinals: any[] = [];

  url: string = "";

  constructor(private zone: NgZone,) {
    this.streamTransactionNotification();
  }

  ngOnInit() {
    this.url = String(localStorage.getItem('numberAccount'));
  }

  private streamTransactionNotification(): void{    
    const url = this.url;
    console.log(url);
    
    if (url != null && url != '') {
      this.eventNotification = new EventSource(String(environment.API_BASE_URL_REACTOR) + String('auditoria/stream?cuentaId=' + localStorage.getItem('numberAccount')));
  
      this.eventNotification.onmessage = (event: any) => {
        this.arrayCompleto.push(JSON.parse(event.data));
  
        const transaction = this.arrayCompleto.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());        
        console.log(transaction);        
  
        this.zone.run(() => {
          this.notificationSubject.next(transaction);
        });   
        
        this.eventNotification.onerror = (error) => {
          console.error('Error en SSE:', error);
          this.eventNotification.close();
        };
      };        
    }
  }

  getStreamTransactionNotifications(): Observable<any> {
    this.url = String(localStorage.getItem('numberAccount'));
    return this.notificationSubject.asObservable();
  }

}
