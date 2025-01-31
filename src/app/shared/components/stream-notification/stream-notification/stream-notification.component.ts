import { Component , Input } from '@angular/core';
import { StreamNotificationService } from 'src/app/services/stream-notification.service';

@Component({
  selector: 'app-stream-notification',
  templateUrl: './stream-notification.component.html',
  styleUrls: ['./stream-notification.component.css']
})
export class StreamNotificationComponent {
  @Input() amount: number = 0;
  @Input() date: string = '';
  @Input() type: string = '';
  transactions: any[] = [];

  constructor(private streamNotificationService: StreamNotificationService){}

  ngOnInit(): void {
    this.streamNotificationService.getStreamTransactionNotifications().subscribe({
      next: (transaction) => {
        if (!transaction) return;
        this.transactions.unshift(transaction);
      //   setTimeout(() => {
      //     this.transactions.pop();
      // }, 5000);
    },
    error: (error) => console.log('Error en el stream', error)
    })
  }



}
