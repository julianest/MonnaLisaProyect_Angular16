import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceResponse } from 'src/app/models/response/auth-response.model';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private servicio: ServicesService, private formBuilder: FormBuilder, private router: Router) {
    this.armarFormulario();
  }

  armarFormulario() {
    this.loginForm = this.formBuilder.group({
      inputEmail: ['', [Validators.required, Validators.email]],
      inputPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  pruebaLogin() {

    const params = {
      url: '/login',
      payload: {
        email: String(this.loginForm.controls['inputEmail'].value),
        password: String(this.loginForm.controls['inputPassword'].value)
      }
    }

    this.servicio.servicePost(params)
      .subscribe({
        next: (data: ServiceResponse) => {
          console.log(data);
          switch (data.code) {
            case 200:
              localStorage.setItem('access_token', data.response.access_token);
              localStorage.setItem('id_user', String(data.response.id_user));
              this.router.navigateByUrl('/home');
              break;
            default:
              console.log('Error en el login');
              break;
          }
        },
        error: (error: any) => {
          console.log(error);          
        },
        complete: () => {}
      });
  }
}
