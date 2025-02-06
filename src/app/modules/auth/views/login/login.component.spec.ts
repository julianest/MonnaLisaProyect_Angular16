import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Alertas } from 'utils/alerts';
import { throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let alertMock: jasmine.SpyObj<Alertas>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['login']);
    alertMock = jasmine.createSpyObj('Alertas', ['loading', 'success', 'error']);
    routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Alertas, useValue: alertMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle password visibility when viewPassword() is called', () => {
    expect(component.show).toBeFalse();
    component.viewPassword();
    expect(component.show).toBeTrue();
    component.viewPassword();
    expect(component.show).toBeFalse();
  });

  it('should display error when form is invalid', () => {
    component.loginForm.controls['inputEmail'].setValue('');
    component.loginForm.controls['inputPassword'].setValue('');

    component.submitLoginData();

    expect(component.loginForm.invalid).toBeTrue();
    expect(component.loginForm.controls['inputEmail'].touched).toBeTrue();
    expect(component.loginForm.controls['inputPassword'].touched).toBeTrue();
  });

  it('should handle login failure', () => {
    component.loginForm.controls['inputEmail'].setValue('test@example.com');
    component.loginForm.controls['inputPassword'].setValue('password123');

    authServiceMock.login.and.returnValue(throwError(() => new Error('Login failed')));

    component.submitLoginData();

    expect(alertMock.error).toHaveBeenCalledWith('Error desconocido', 'Por favor intentelo más tarde');
  });

  it('should reset the form when resetForm() is called', () => {
    component.loginForm.controls['inputEmail'].setValue('test@example.com');
    component.loginForm.controls['inputPassword'].setValue('password123');

    component.resetForm();

    expect(component.loginForm.controls['inputEmail'].value).toBe('');
    expect(component.loginForm.controls['inputPassword'].value).toBe('');
  });
});
