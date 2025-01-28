import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RegisterRequest } from 'src/app/models/request/register-request.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.registerInitializeForm();
  }

  registerInitializeForm() {
    this.registerForm = this.formBuilder.group({
      inputIdentificationNumber: ['', [Validators.required]],
      inputName: ['', [Validators.required, Validators.minLength(2)]],
      inputLastName: ['', [Validators.required, Validators.minLength(2)]],
      inputPhone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      inputEmail: ['', [Validators.required, Validators.email]],
      inputPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submitRegisterData() {
    if (this.registerForm.invalid) {
      console.error('Registro inválido');
      return;
    }

    const userData: RegisterRequest = {
      numeroIdetificacion:
        this.registerForm.controls['inputIdentificationNumber'].value,
      nombre: this.registerForm.controls['inputName'].value,
      apellido: this.registerForm.controls['inputLastName'].value,
      telefono: this.registerForm.controls['inputPhone'].value,
      correo: this.registerForm.controls['inputEmail'].value,
      contrasena: this.registerForm.controls['inputPassword'].value,
    };

    this.authService.register(userData).subscribe({
      next(response) {
        console.log('Registro exitoso', response);
      },
      error: (error) => {
        console.error('Error en el registro: ', error);
      },
    });
  }
}
