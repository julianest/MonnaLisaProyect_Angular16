import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WithdrawComponent } from './withdraw.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { GeneralService } from '../general.service';
import { Alertas } from 'utils/alerts';
import { StreamNotificationService } from 'src/app/services/stream-notification.service';
import { throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('WithdrawComponent', () => {
  let component: WithdrawComponent;
  let fixture: ComponentFixture<WithdrawComponent>;
  let generalServiceMock: jasmine.SpyObj<GeneralService>;
  let alertMock: jasmine.SpyObj<Alertas>;

  beforeEach(() => {
    const generalServiceSpy = jasmine.createSpyObj('GeneralService', ['getInfoUser', 'withdrawTransaction']);
    const alertSpy = jasmine.createSpyObj('Alertas', ['cerrar', 'warning', 'loading', 'error']);
    const streamNotificationSpy = jasmine.createSpyObj('StreamNotificationService', ['getStreamTransactionNotifications', 'setTransactionType']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [WithdrawComponent],
      providers: [
        FormBuilder,
        { provide: GeneralService, useValue: generalServiceSpy },
        { provide: Alertas, useValue: alertSpy },
        { provide: StreamNotificationService, useValue: streamNotificationSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(WithdrawComponent);
    component = fixture.componentInstance;
    generalServiceMock = TestBed.inject(GeneralService) as jasmine.SpyObj<GeneralService>;
    alertMock = TestBed.inject(Alertas) as jasmine.SpyObj<Alertas>;
  });

it('debería manejar un error en withdrawMoney correctamente', () => {
    const account = 123;
    const amount = 100;
    component.withdrawForm.controls['inputAccount'].setValue(account);
    component.withdrawForm.controls['inputWithdraw'].setValue(amount);

    generalServiceMock.withdrawTransaction.and.returnValue(throwError(() => new Error('Error al realizar el retiro')));

    component.withdrawMoney();

    expect(alertMock.error).toHaveBeenCalledWith('Error desconocido', 'Por favor inténtelo más tarde');
  });

  it('debería manejar un error en withdrawMoney correctamente', () => {
    const account = 123;
    const amount = 100;
    component.withdrawForm.controls['inputAccount'].setValue(account);
    component.withdrawForm.controls['inputWithdraw'].setValue(amount);

    generalServiceMock.withdrawTransaction.and.returnValue(throwError(() => new Error('Error al realizar el retiro')));

    component.withdrawMoney();

    expect(alertMock.error).toHaveBeenCalledWith('Error desconocido', 'Por favor inténtelo más tarde');
  });
});
