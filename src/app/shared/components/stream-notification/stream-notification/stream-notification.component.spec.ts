import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { StreamNotificationComponent } from './stream-notification.component';
import { StreamNotificationService } from 'src/app/services/stream-notification.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('StreamNotificationComponent', () => {
  let component: StreamNotificationComponent;
  let fixture: ComponentFixture<StreamNotificationComponent>;
  let streamNotificationServiceMock: jasmine.SpyObj<StreamNotificationService>;

  beforeEach(() => {
    streamNotificationServiceMock = jasmine.createSpyObj('StreamNotificationService', ['getStreamTransactionNotifications']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StreamNotificationComponent],
      providers: [{ provide: StreamNotificationService, useValue: streamNotificationServiceMock }],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(StreamNotificationComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to StreamNotificationService on init', () => {
    const mockTransactions = [
      { estado: 'Aprobado', fecha: '2025-02-06', tipo: 'Depósito', monto: 100 },
      { estado: 'Pendiente', fecha: '2025-02-06', tipo: 'Retiro', monto: 50 }
    ];
    streamNotificationServiceMock.getStreamTransactionNotifications.and.returnValue(of(mockTransactions));

    fixture.detectChanges(); // Dispara ngOnInit

    expect(component.arrayNotificaciones.length).toBe(2);
    expect(component.arrayNotificaciones[0].estado).toBe('Aprobado');
    expect(component.arrayNotificaciones[1].estado).toBe('Pendiente');
  });

  it('should clear notifications after 3 seconds', fakeAsync(() => {
    const mockTransactions = [
      { estado: 'Aprobado', fecha: '2025-02-06', tipo: 'Depósito', monto: 100 }
    ];
    streamNotificationServiceMock.getStreamTransactionNotifications.and.returnValue(of(mockTransactions));

    fixture.detectChanges();
    expect(component.arrayNotificaciones.length).toBe(1);

    tick(3000); // Simula el paso del tiempo
    fixture.detectChanges();

    expect(component.arrayNotificaciones.length).toBe(0);
  }));

  it('should handle stream errors gracefully', () => {
    spyOn(console, 'log');
    streamNotificationServiceMock.getStreamTransactionNotifications.and.returnValue(throwError(() => new Error('Error en el stream')));

    fixture.detectChanges();

    expect(console.log).toHaveBeenCalledWith('Error en el stream', new Error('Error en el stream'));
  });

});
