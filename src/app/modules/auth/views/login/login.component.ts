import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthRequest } from 'src/app/models/request/auth-request.model';
import { AuthService } from '../auth.service';
import { ServiceResponse } from 'src/app/models/response/auth-response.model';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Alertas } from 'utils/alerts';

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
    private alert: Alertas
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
      this.alert.loading();
  
      const credentials: AuthRequest = {
        email: this.loginForm.controls['inputEmail'].value,
        password: this.loginForm.controls['inputPassword'].value,
      };
  
      this.authService.login(credentials).subscribe({
        next: (resp: ServiceResponse) => {
          switch (resp.code) {
            case 200:
              localStorage.setItem('access_token', resp.response.access_token);
              localStorage.setItem('id_user', String(resp.response.id_user));

              this.alert.success("Usuario registrado", resp.message);
              
              this.loginForm.reset();
              
              setTimeout(() => {
                this.router.navigateByUrl('dashboard/home');
              }, 2000);
              break;
            case 400:
              this.alert.warning("Advertencia", resp.message);
              break;
            default:
              this.alert.error("Error desconocido", "Por favor intentelo más tarde");
              break;
          }
        },
        error: (error: any) => {
          this.alert.error("Error desconocido", "Por favor intentelo más tarde, ERROR: " + error);
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
