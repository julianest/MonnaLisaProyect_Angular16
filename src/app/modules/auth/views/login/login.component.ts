import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private servicio: ServicesService, private formBuilder: FormBuilder) {
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

    this.servicio.servicePost(params).subscribe((data) => {
      console.log(data);
    });
  }



}
