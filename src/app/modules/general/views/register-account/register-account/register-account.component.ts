import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterAccountRequest } from 'src/app/models/request/registerAccount-request.model';
import { SpinnerService } from 'src/app/services/spinner.service';
import { GeneralService } from '../../general.service';
import { RegisterAccountResponse } from 'src/app/models/response/registerAccount-response.model';
import { Alertas } from 'utils/alerts';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css']
})
export class RegisterAccountComponent {


  registerAccountForm!: FormGroup;

  accountSuccess: boolean = false;
  numberIdentification!: string;
  numberAccount!: number;
  message: string = '';
  balance!: number;

constructor(
    private readonly generalService: GeneralService,
    private readonly formBuilder: FormBuilder,
    private readonly spinnerService: SpinnerService,
    private readonly alert: Alertas
  ) {
    this.registerAccountInitializeForm();
  }


registerAccountInitializeForm() {
    this.registerAccountForm = this.formBuilder.group({
      inputBalance: ['', [Validators.required, Validators.maxLength(8)]],
      inputTypeAccount: ['', [Validators.required]]
    });
  }

  submitAccountinData() {
    if (this.registerAccountForm.invalid) {
      return Object.values(this.registerAccountForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
    } else {
      this.spinnerService.show();

      const accountData: RegisterAccountRequest = {
        saldo: Number(this.registerAccountForm.controls['inputBalance'].value),
        tipoCuenta: this.registerAccountForm.controls['inputTypeAccount'].value,
        numeroIdetificacion: String(localStorage.getItem('identificationNumber')),
      };

      this.generalService.registerAccount(accountData).subscribe({
        next: (data: RegisterAccountResponse) => {
          this.spinnerService.hide();
          if (data.code === 200) {
            this.accountSuccess = true;
            this.message = '¡Cuenta Creada Exitosamente!';
            this.numberAccount = data.response.numeroCuenta;
            this.numberIdentification = accountData.numeroIdetificacion;
            this.balance = accountData.saldo;
          } else {
            this.alert.warning('Advertencia', String(data.message));
          }
        },
        error: () => {
          this.spinnerService.hide();
          this.alert.error('Ocurrió un error', 'No se pudo crear la cuenta');
        }
      });
    }
  }

  resetForm() {
    this.registerAccountForm.reset({
      // Establecemos explícitamente a vacío los campos del formulario
      inputBalance: '',
      inputTypeAccount: ''
    });
  }

  get balanceWrong() {
    return this.registerAccountForm.get('inputBalance')?.invalid && this.registerAccountForm.get('inputBalance')?.touched;
  }

  get typeAccountWrong() {
    return this.registerAccountForm.get('inputTypeAccount')?.invalid && this.registerAccountForm.get('inputTypeAccount')?.touched;
  }

}
