import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepositComponent } from './deposit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { GeneralService } from 'src/app/modules/general/views/general.service';
import { StreamNotificationService } from 'src/app/services/stream-notification.service';
import { Alertas } from 'utils/alerts';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Componente Depósito', () => {
  let component: DepositComponent;
  let fixture: ComponentFixture<DepositComponent>;
  let generalServiceSpy: jasmine.SpyObj<GeneralService>;
  let streamNotificationSpy: jasmine.SpyObj<StreamNotificationService>;
  let alertSpy: jasmine.SpyObj<Alertas>;

  beforeEach(async () => {
    generalServiceSpy = jasmine.createSpyObj('GeneralService', ['getInfoUser', 'depositTransaction']);
    streamNotificationSpy = jasmine.createSpyObj('StreamNotificationService', ['setTransactionType', 'getStreamTransactionNotifications']);
    alertSpy = jasmine.createSpyObj('Alertas', ['warning', 'error', 'cerrar']);

    // Simulando el retorno de un observable vacío para getStreamTransactionNotifications
    streamNotificationSpy.getStreamTransactionNotifications.and.returnValue(of([]));

    // Simulando el retorno del método getInfoUser
    const mockResponse = { code: 200, response: { cuentasBancarias: [{ numeroCuenta: '12345' }] } };
    generalServiceSpy.getInfoUser.and.returnValue(of(mockResponse));  // Esto simula el comportamiento del servicio.

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [DepositComponent],
      providers: [
        { provide: GeneralService, useValue: generalServiceSpy },
        { provide: StreamNotificationService, useValue: streamNotificationSpy },
        { provide: Alertas, useValue: alertSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario correctamente', () => {
    expect(component.depositForm).toBeDefined();
    expect(component.depositForm.controls['inputAccount']).toBeDefined();
    expect(component.depositForm.controls['inputDeposit']).toBeDefined();
  });
});
