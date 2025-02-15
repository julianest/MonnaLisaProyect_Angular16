import { Injectable, NgZone } from '@angular/core';
import { environment } from 'env';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StreamNotificationService {
  private readonly notificationSubject = new BehaviorSubject<any[]>([]);
  private eventController: AbortController | null = null;
  private arrayCompleto: any[] = [];

  constructor(private readonly zone: NgZone) {
    this.streamTransactionNotification();
  }

  private async streamTransactionNotification(): Promise<void> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Error: No hay token de autenticación.');
      return;
    }

    this.eventController = new AbortController();
    const signal = this.eventController.signal;

    try {
      const response = await fetch(
        `${environment.API_BASE_URL_REACTOR}auditoria/stream?cuentaId=${localStorage.getItem('numberAccount')}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal,
        }
      );

      if (!response.ok || !response.body) {
        throw new Error('Error al conectar con el stream.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let partialData = ''; // 🔹 Acumulador para datos incompletos

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        partialData += decoder.decode(value, { stream: true });
        // 🔹 Extraer mensajes JSON completos
        const messages = partialData.split('\n').filter(line => line.startsWith('data:'));

        let newTransactions: any[] = [];

        for (const message of messages) {
          try {
            // 🔹 Extraemos solo la parte JSON eliminando "data: "
            const jsonString = message.replace(/^data:\s*/, '');
            const transaction = JSON.parse(jsonString);

            // 🔹 Filtrar solo las transacciones de tipo "DEPOSITO"
            newTransactions.push(transaction);
          } catch (err) {
            
          }
        }

        if (newTransactions.length > 0) {
          this.arrayCompleto.unshift(...newTransactions);

          this.arrayCompleto.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

          this.arrayCompleto = this.arrayCompleto.slice(0, 1);

          this.zone.run(() => {
            this.notificationSubject.next([...this.arrayCompleto]);
          });
        }

        partialData = partialData.substring(partialData.lastIndexOf('\n') + 1);
      }
    } catch (error) {
      console.log('Error en la conexión SSE:', error);
      this.reconnectStream();
    }
  }

  private reconnectStream(): void {
    console.log('Intentando reconectar en 5 segundos...');
    setTimeout(() => this.streamTransactionNotification(), 3000);
  }

  stopStream(): void {
    if (this.eventController) {
      this.eventController.abort();
      this.eventController = null;
    }
  }

  restartStream(): void {
    console.log('Reiniciando stream...');
    this.stopStream();
    this.streamTransactionNotification();
  }

  getStreamTransactionNotifications(): Observable<any[]> {
    return this.notificationSubject.asObservable();
  }
}
