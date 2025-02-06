import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Alertas } from 'utils/alerts';
import { throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let alertMock: jasmine.SpyObj<Alertas>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['register']);
    alertMock = jasmine.createSpyObj('Alertas', ['loading', 'success', 'error']);
    routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [RegisterComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Alertas, useValue: alertMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the RegisterComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display error when form is invalid', () => {
    component.registerForm.controls['inputIdentificationNumber'].setValue('');
    component.registerForm.controls['inputName'].setValue('');
    component.registerForm.controls['inputLastName'].setValue('');
    component.registerForm.controls['inputPhone'].setValue('');
    component.registerForm.controls['inputEmail'].setValue('');
    component.registerForm.controls['inputPassword'].setValue('');

    component.submitRegisterData();

    expect(component.registerForm.invalid).toBeTrue();
    expect(component.registerForm.controls['inputIdentificationNumber'].touched).toBeTrue();
    expect(component.registerForm.controls['inputName'].touched).toBeTrue();
  });

  it('should handle registration failure', () => {
    component.registerForm.controls['inputIdentificationNumber'].setValue('123456789');
    component.registerForm.controls['inputName'].setValue('John');
    component.registerForm.controls['inputLastName'].setValue('Doe');
    component.registerForm.controls['inputPhone'].setValue('1234567890');
    component.registerForm.controls['inputEmail'].setValue('john.doe@example.com');
    component.registerForm.controls['inputPassword'].setValue('password123');

    authServiceMock.register.and.returnValue(throwError(() => new Error('Registration failed')));

    component.submitRegisterData();

    expect(alertMock.error).toHaveBeenCalledWith('Error desconocido', 'Por favor intentelo más tarde');
  });
});
