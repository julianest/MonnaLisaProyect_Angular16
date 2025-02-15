import { Component , Input } from '@angular/core';
import { StreamNotificationService } from 'src/app/services/stream-notification.service';

@Component({
  selector: 'app-stream-notification',
  templateUrl: './stream-notification.component.html',
  styleUrls: ['./stream-notification.component.css']
})
export class StreamNotificationComponent {
  @Input() arrayNotificaciones: any[] = [];

  constructor(private readonly streamNotificationService: StreamNotificationService){}

  ngOnInit(): void {
    this.arrayNotificaciones = [];

    this.streamNotificationService.getStreamTransactionNotifications().subscribe({
      next: (transaction) => {
        if (!transaction) return;

        transaction.forEach((element: any) => {
          this.arrayNotificaciones.push(element);
        });
        setTimeout(() => {
          this.arrayNotificaciones = [];
        }, 3000);
      },
      error: (error) => {
        console.log('Error en el stream', error);
      }
    });
  }



}
