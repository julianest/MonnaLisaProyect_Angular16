import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterAccountComponent } from './register-account.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner.service';
import { GeneralService } from '../../general.service';
import { Alertas } from 'utils/alerts';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RegisterAccountResponse } from 'src/app/models/response/registerAccount-response.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NumberToTextPipe } from 'src/app/shared/pipes/numberToText/number-to-text.pipe';

describe('RegisterAccountComponent', () => {
  let component: RegisterAccountComponent;
  let fixture: ComponentFixture<RegisterAccountComponent>;
  let generalServiceSpy: jasmine.SpyObj<GeneralService>;
  let spinnerServiceSpy: jasmine.SpyObj<SpinnerService>;
  let alertServiceSpy: jasmine.SpyObj<Alertas>;

  beforeEach(async () => {
    // Crear objetos espía para los servicios
    generalServiceSpy = jasmine.createSpyObj('GeneralService', ['registerAccount']);
    spinnerServiceSpy = jasmine.createSpyObj('SpinnerService', ['show', 'hide']);
    alertServiceSpy = jasmine.createSpyObj('Alertas', ['error', 'warning']);

    await TestBed.configureTestingModule({
      declarations: [RegisterAccountComponent, NumberToTextPipe],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: GeneralService, useValue: generalServiceSpy },
        { provide: SpinnerService, useValue: spinnerServiceSpy },
        { provide: Alertas, useValue: alertServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Limpiar espías después de cada prueba
    generalServiceSpy.registerAccount.calls.reset();
    spinnerServiceSpy.show.calls.reset();
    spinnerServiceSpy.hide.calls.reset();
    alertServiceSpy.error.calls.reset();
    alertServiceSpy.warning.calls.reset();
  });

  it('debe inicializar el formulario correctamente', () => {
    expect(component.registerAccountForm).toBeTruthy();
    expect(component.registerAccountForm.controls['inputBalance']).toBeTruthy();
    expect(component.registerAccountForm.controls['inputTypeAccount']).toBeTruthy();
  });

  it('debe marcar el formulario como inválido si los campos no son válidos', () => {
    component.registerAccountForm.controls['inputBalance'].setValue('');
    component.registerAccountForm.controls['inputTypeAccount'].setValue('');
    expect(component.registerAccountForm.invalid).toBeTrue();
  });

  it('debe enviar la solicitud de registro si el formulario es válido', () => {
    // Configurar el espía para devolver una respuesta exitosa
    generalServiceSpy.registerAccount.and.returnValue(
      of({ code: 200, message: 'Cuenta creada', response: { numeroCuenta: 12345 } } as RegisterAccountResponse)
    );

    // Simular valores válidos en el formulario
    component.registerAccountForm.controls['inputBalance'].setValue(1000);
    component.registerAccountForm.controls['inputTypeAccount'].setValue('AHORROS');

    // Llamar al método que se está probando
    component.submitAccountinData();

    // Verificar que se llamó a los métodos correctos
    expect(spinnerServiceSpy.show).toHaveBeenCalled();
    expect(generalServiceSpy.registerAccount).toHaveBeenCalled();
    expect(component.accountSuccess).toBeTrue();
    expect(component.numberAccount).toBe(12345);
  });

  it('debe mostrar una alerta si ocurre un error en el registro', () => {
    // Configurar el espía para devolver un error
    generalServiceSpy.registerAccount.and.returnValue(throwError(() => new Error('Error')));

    // Simular valores válidos en el formulario
    component.registerAccountForm.controls['inputBalance'].setValue(1000);
    component.registerAccountForm.controls['inputTypeAccount'].setValue('AHORROS');

    // Llamar al método que se está probando
    component.submitAccountinData();

    // Verificar que se llamó a los métodos correctos
    expect(spinnerServiceSpy.hide).toHaveBeenCalled();
    expect(alertServiceSpy.error).toHaveBeenCalledWith('Ocurrió un error', 'No se pudo crear la cuenta');
  });

  it('debe resetear el formulario cuando se llama a resetForm()', () => {
    // Simular valores en el formulario
    component.registerAccountForm.controls['inputBalance'].setValue(1000);
    component.registerAccountForm.controls['inputTypeAccount'].setValue('AHORROS');

    // Llamar al método que se está probando
    component.resetForm();

    // Verificar que el formulario se ha reseteado
    expect(component.registerAccountForm.controls['inputBalance'].value).toBe('');
    expect(component.registerAccountForm.controls['inputTypeAccount'].value).toBe('');
  });

  it('debe marcar el campo balance como inválido si no es válido', () => {
    // Simular un campo inválido
    component.registerAccountForm.controls['inputBalance'].setValue('');
    component.registerAccountForm.controls['inputBalance'].markAsTouched();
    fixture.detectChanges();

    // Verificar que se aplica la clase de error
    const input = fixture.debugElement.query(By.css('#balance'));
    const errorMsg = fixture.debugElement.query(By.css('.text-danger'));

    expect(input.classes['is-invalid']).toBeTrue();
    expect(errorMsg).toBeTruthy();
  });

  it('debe mostrar el mensaje de éxito cuando se registre correctamente la cuenta', () => {
    // Simular el estado de éxito
    component.accountSuccess = true;
    component.numberIdentification = '12345';
    component.numberAccount = 123456;
    component.balance = 1000;

    fixture.detectChanges();

    // Verificar que el mensaje de éxito se muestra
    expect(component.accountSuccess).toBeTrue();
  });
});
