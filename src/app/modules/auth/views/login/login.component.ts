import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthRequest } from 'src/app/models/request/auth-request.model';
import { AuthService } from '../auth.service';
import { ServiceResponse } from 'src/app/models/response/auth-response.model';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  show: boolean = false;

  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private spinnerService: SpinnerService,
  ) {
    this.loginInitializeForm();
  }

  viewPassword() {
    this.show = !this.show;
  }

  loginInitializeForm() {
    this.loginForm = this.formBuilder.group({
      inputEmail: ['', [Validators.required, Validators.email]],
      inputPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submitLoginData() {
    if (this.loginForm.invalid) {
      return Object.values(this.loginForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
    } else {
      this.spinnerService.show();

      const credentials: AuthRequest = {
        email: this.loginForm.controls['inputEmail'].value,
        password: this.loginForm.controls['inputPassword'].value,
      };

      this.authService.login(credentials).subscribe({
        next: (data: ServiceResponse) => {
          switch (data.code) {
            case 200:
              localStorage.setItem('access_token', data.response.access_token);
              localStorage.setItem('id_user', String(data.response.id_user));
              this.router.navigateByUrl('dashboard/home');
              break;
            default:
              console.log('Error en el login');
              break;
          }
          console.log('Login exitoso: ', data);
        },
        error: (error) => {
          this.spinnerService.hide(2000);
          console.error('Error en el login: ', error);
        },
        complete: () => {
          this.spinnerService.hide(2000);
        }
      });
    }
  }

  get emailErroneo() {
    return this.loginForm.get('inputEmail')?.invalid && this.loginForm.get('inputEmail')?.touched;
  }

  get passwordErroneo() {
    return this.loginForm.get('inputPassword')?.invalid && this.loginForm.get('inputPassword')?.touched;
  }
}
