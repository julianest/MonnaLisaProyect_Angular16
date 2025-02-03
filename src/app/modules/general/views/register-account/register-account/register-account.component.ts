import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { registerAccountRequest } from 'src/app/models/request/registerAccount-request.model';
import { SpinnerService } from 'src/app/services/spinner.service';
import { GeneralService } from '../../general.service';
import { registerAccountResponse } from 'src/app/models/response/registerAccount-response.model';
import { Alertas } from 'utils/alerts';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css']
})
export class RegisterAccountComponent {


  registerAccountForm!: FormGroup;

  accountSuccess: boolean = false;
  numberIdentification!: String;
  numberAccount!: number;
  message: String = '';
  balance!: number;

constructor(
    private generalService: GeneralService,
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    private alert: Alertas
  ) {
    this.registerAccountInitializeForm();
  }


registerAccountInitializeForm() {
    this.registerAccountForm = this.formBuilder.group({
      inputBalance: ['', [Validators.required, Validators.maxLength(8)]],
      inputTypeAccount: ['', [Validators.required, Validators.maxLength(8)]]
    });
  }

  submitAccountinData() {
    if (this.registerAccountForm.invalid) {
      return Object.values(this.registerAccountForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
    } else {
      this.spinnerService.show();

      const accountData: registerAccountRequest = {
        saldo: Number(this.registerAccountForm.controls['inputBalance'].value),
        tipoCuenta: this.registerAccountForm.controls['inputTypeAccount'].value,
        numeroIdetificacion: String(localStorage.getItem('identificationNumber')),
      };

      this.generalService.registerAccount(accountData).subscribe({
        next: (data: registerAccountResponse) => {
          switch (data.code) {
            case 200:
              this.spinnerService.hide();

              this.accountSuccess = true;
              this.message = data.message;
              this.numberAccount = data.response.numeroCuenta;
              this.numberIdentification = accountData.numeroIdetificacion;
              this.balance = accountData.saldo;
              break;
            default:
              this.spinnerService.hide();
              this.alert.warning('Advertencia', String(data.message));
              break;
          }
        },
        error: () => {
          this.spinnerService.hide();
          this.alert.error('Ocurrio un error', 'No se pudo crear la cuenta');
        }
      });
    }
  }

  resetForm() {
    this.registerAccountForm.reset();
  }

  get balanceWrong() {
    return this.registerAccountForm.get('inputBalance')?.invalid && this.registerAccountForm.get('inputBalance')?.touched;
  }

  get typeAccountWrong() {
    return this.registerAccountForm.get('inputTypeAccount')?.invalid && this.registerAccountForm.get('inputTypeAccount')?.touched;
  }

}
