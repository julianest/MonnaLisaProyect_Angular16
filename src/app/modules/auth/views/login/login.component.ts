import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthRequest } from 'src/app/models/request/auth-request.model';
import { AuthService } from '../auth.service';
import { ServiceResponse } from 'src/app/models/response/auth-response.model';
import { Router } from '@angular/router';
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
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly alert: Alertas
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
          if (resp.code === 200) {
            localStorage.setItem('access_token', resp.response.access_token);
            localStorage.setItem('id_user', String(resp.response.id_user));

            this.alert.success("Usuario registrado", resp.message);

            this.loginForm.reset();

            setTimeout(() => {
              this.router.navigateByUrl('dashboard/home');
            }, 2000);
          } else {
            this.alert.error("No se pudo iniciar sesión", "Usuario no encontrado, por favor revisar las credenciales");
          }
        },
        error: () => {
          this.alert.error("Error desconocido", "Por favor intentelo más tarde");
        }
      });
    }
  }

  resetForm() {
    this.loginForm.reset({
      // Establecemos explícitamente a vacío los campos del formulario
      inputEmail: '',
      inputPassword: ''
    });
  }

  get emailErroneo() {
    return this.loginForm.get('inputEmail')?.invalid && this.loginForm.get('inputEmail')?.touched;
  }

  get passwordErroneo() {
    return this.loginForm.get('inputPassword')?.invalid && this.loginForm.get('inputPassword')?.touched;
  }
}
