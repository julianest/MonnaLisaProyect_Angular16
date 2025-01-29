import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RegisterRequest } from 'src/app/models/request/register-request.model';
import { SpinnerService } from'src/app/services/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  show: boolean = false;

  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    private router: Router
  ) {
    this.registerInitializeForm();
  }

  viewPassword() {
    this.show = !this.show;
  }

  registerInitializeForm() {
    this.registerForm = this.formBuilder.group({
      inputIdentificationNumber: ['', [Validators.required]],
      inputName: ['', [Validators.required, Validators.minLength(2)]],
      inputLastName: ['', [Validators.required, Validators.minLength(2)]],
      inputPhone: ['', [ Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      inputEmail: ['', [Validators.required, Validators.email]],
      inputPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submitRegisterData() {
    if (this.registerForm.invalid) {
      return Object.values(this.registerForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
    } else {
      this.spinnerService.show();
  
      const userData: RegisterRequest = {
        numeroIdetificacion: this.registerForm.controls['inputIdentificationNumber'].value,
        nombre: this.registerForm.controls['inputName'].value,
        apellido: this.registerForm.controls['inputLastName'].value,
        telefono: this.registerForm.controls['inputPhone'].value,
        correo: this.registerForm.controls['inputEmail'].value,
        contrasena: this.registerForm.controls['inputPassword'].value,
      };
  
      this.authService.register(userData).subscribe({
        next: (response: any) => {
          this.registerForm.reset();
          this.router.navigateByUrl('/login');
          console.log('Registro exitoso', response);
        },
        error: (error) => {
          this.spinnerService.hide(3000);
          console.error('Error en el registro: ', error);
        },
        complete: () => {
          this.spinnerService.hide(2000);
        }
      });
    }
  }

  get identificacionErronea() {
    return this.registerForm.get('inputIdentificationNumber')?.invalid && this.registerForm.get('inputIdentificationNumber')?.touched;
  }

  get nombreErroneo() {
    return this.registerForm.get('inputName')?.invalid && this.registerForm.get('inputName')?.touched;
  }

  get apellidoErroneo() {
    return this.registerForm.get('inputLastName')?.invalid && this.registerForm.get('inputLastName')?.touched;
  }

  get telefonoErroneo() {
    return this.registerForm.get('inputPhone')?.invalid && this.registerForm.get('inputPhone')?.touched;
  }

  get emailErroneo() {
    return this.registerForm.get('inputEmail')?.invalid && this.registerForm.get('inputEmail')?.touched;
  }

  get passwordErroneo() {
    return this.registerForm.get('inputPassword')?.invalid && this.registerForm.get('inputPassword')?.touched;
  }
}
