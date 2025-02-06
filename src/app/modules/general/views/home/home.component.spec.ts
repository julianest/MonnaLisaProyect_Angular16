import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { GeneralService } from '../general.service';
import { Alertas } from 'utils/alerts';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let generalServiceMock: jasmine.SpyObj<GeneralService>;
  let alertMock: jasmine.SpyObj<Alertas>;

  beforeEach(() => {
    const generalServiceSpy = jasmine.createSpyObj('GeneralService', ['getInfoUser', 'filtrerTransaction', 'findBalance']);
    const alertSpy = jasmine.createSpyObj('Alertas', ['cerrar', 'warning', 'loading', 'error']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [HomeComponent],
      providers: [
        FormBuilder,
        { provide: GeneralService, useValue: generalServiceSpy },
        { provide: Alertas, useValue: alertSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    generalServiceMock = TestBed.inject(GeneralService) as jasmine.SpyObj<GeneralService>;
    alertMock = TestBed.inject(Alertas) as jasmine.SpyObj<Alertas>;
  });


  it('debería ejecutar homeFilter y manejar la respuesta correctamente', () => {
    const account = 123;
    component.homeFilterForm.controls['inputAccount'].setValue(account);

    generalServiceMock.filtrerTransaction.and.returnValue(of({
      code: 200,
      response: [{ tipoMovimiento: 'Depósito', fechaMovimiento: '2025-02-05', monto: 100 }]
    }));
    generalServiceMock.findBalance.and.returnValue(of({ response: { saldo: 1000 } }));

    component.homeFilter();

    expect(alertMock.loading).toHaveBeenCalled();
    expect(generalServiceMock.filtrerTransaction).toHaveBeenCalledWith(account);
    expect(generalServiceMock.findBalance).toHaveBeenCalledWith(account);
    expect(component.transactionResponse.length).toBeGreaterThan(0);
    expect(component.saldoActual).toBe('1000');
    expect(alertMock.cerrar).toHaveBeenCalled();
  });

  it('debería manejar un error en homeFilter correctamente', () => {
    const account = 123;
    component.homeFilterForm.controls['inputAccount'].setValue(account);

    generalServiceMock.filtrerTransaction.and.returnValue(throwError(() => new Error('Error de red')));

    component.homeFilter();

    expect(alertMock.error).toHaveBeenCalledWith('Error desconocido', 'Por favor inténtelo más tarde');
  });
});
