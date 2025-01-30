import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { registerAccountRequest } from 'src/app/models/request/registerAccount-request.model';
import { SpinnerService } from 'src/app/services/spinner.service';
import { GeneralService } from '../../general.service';
import { registerAccountResponse } from 'src/app/models/response/registerAccount-response.model';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css']
})
export class RegisterAccountComponent {


  registerAccountForm!: FormGroup;
  accountTypes: string[] = ['AHORROS', 'CORRIENTE'];

  accountSuccess: boolean = false;
  numberIdentification!: String;
  numberAccount!: number;
  message: String = '';
  balance!: number;

constructor(
    private generalService: GeneralService,
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
  ) {
    this.registerAccountInitializeForm();
  }


registerAccountInitializeForm() {
    this.registerAccountForm = this.formBuilder.group({
      inputBalance: ['', [Validators.required, Validators.maxLength(8)]],
      inputTypeAccount: ['', [Validators.required]],
      inputNumberIdentification: ['', [Validators.required, Validators.maxLength(8)]],
    });
  }

  submitAccountinData() {
    if (this.registerAccountForm.invalid) {
      console.log('Valor de tipoCuenta:', this.registerAccountForm.controls['inputTypeAccount'].value);

      return Object.values(this.registerAccountForm.controls).forEach(control => {
        control.markAllAsTouched();
        control.updateValueAndValidity();
      });
    } else {
      this.spinnerService.show();

      const accountData: registerAccountRequest = {
        saldo: this.registerAccountForm.controls['inputBalance'].value,
        tipoCuenta: this.registerAccountForm.controls['inputTypeAccount'].value,
        numeroIdetificacion: this.registerAccountForm.controls['inputNumberIdentification'].value,
      };

      this.generalService.registerAccount(accountData).subscribe({
        next: (data: registerAccountResponse) => {
          switch (data.code) {
            case 200:
              this.accountSuccess = true;
              this.message = data.message;
              this.numberAccount = data.response.numeroCuenta;
              this.numberIdentification = localStorage.getItem('identificationNumber') || '';
              this.balance = accountData.saldo;
              break;
            default:
              console.log('Error en el login');
              break;
          }
          console.log('Login exitoso: ', data);
        },
        error: (error) => {
          this.spinnerService.hide(1000);
          console.error('Error en el login: ', error);
        },
        complete: () => {
          this.spinnerService.hide(1000);
        }
      });
    }
  }

  get balanceWrong() {
    const control =this.registerAccountForm.get('inputBalance');
    return control?.invalid && control?.touched;
  }

  get typeAccountWrong() {
    const control = this.registerAccountForm.get('inputTypeAccount');
    return control?.invalid && (control?.touched|| control?.dirty);
  }

}
