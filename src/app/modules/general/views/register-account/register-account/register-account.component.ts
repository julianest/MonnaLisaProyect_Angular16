import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css']
})
export class RegisterAccountComponent {


  registerAccountForm!: FormGroup;

constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private spinnerService: SpinnerService,
  ) {
    this.registerAccountInitializeForm();
  }


registerAccountInitializeForm() {
    this.registerAccountForm = this.formBuilder.group({
      inputNumberAccount: ['', [Validators.required, Validators.maxLength(8)]],
      inputBalance: ['', [Validators.required, Validators.maxLength(8)]],
      inputTypeAccount: ['', [Validators.required, Validators.maxLength(8)]],
      inputNumberIdentification: ['', [Validators.required, Validators.maxLength(8)]],
    });
  }

  submitAccountinData() {
    if (this.registerAccountForm.invalid) {
      return Object.values(this.registerAccountForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
    } else {
      this.spinnerService.show();

      // const credentials: AuthRequest = {
      //   email: this.registerAccountForm.controls['inputEmail'].value,
      //   password: this.registerAccountForm.controls['inputPassword'].value,
      // };

      // this.authService.login(credentials).subscribe({
      //   next: (data: ServiceResponse) => {
      //     switch (data.code) {
      //       case 200:
      //         localStorage.setItem('access_token', data.response.access_token);
      //         localStorage.setItem('id_user', String(data.response.id_user));
      //         this.router.navigateByUrl('dashboard/home');
      //         break;
      //       default:
      //         console.log('Error en el login');
      //         break;
      //     }
      //     console.log('Login exitoso: ', data);
      //   },
      //   error: (error) => {
      //     this.spinnerService.hide(2000);
      //     console.error('Error en el login: ', error);
      //   },
      //   complete: () => {
      //     this.spinnerService.hide(2000);
      //   }
      // });
    }
  }

  get numberAccountWrong() {
    return this.registerAccountForm.get('inputEmail')?.invalid && this.registerAccountForm.get('inputEmail')?.touched;
  }

  get balanceWrong() {
    return this.registerAccountForm.get('inputBalance')?.invalid && this.registerAccountForm.get('inputBalance')?.touched;
  }

  get typeAccountWrong() {
    return this.registerAccountForm.get('inputTypeAccount')?.invalid && this.registerAccountForm.get('inputTypeAccount')?.touched;
  }

  get numberIdentificationWrong() {
    return this.registerAccountForm.get('inputNumberIdentification')?.invalid && this.registerAccountForm.get('inputNumberIdentification')?.touched;
  }
}
