import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../general.service';
import { Alertas } from 'utils/alerts';
import { BankAccount } from 'src/app/models/response/bankAccount-response.model';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css'],
})
export class WithdrawComponent implements OnInit {
  bankAccount: BankAccount[] = [];

  withdrawForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly services: GeneralService,
    private readonly alert: Alertas
  ) {
    this.withdrawInitializeForm();
  }

  ngOnInit(): void {
    this.getAccountById();
  }

  withdrawInitializeForm() {
    this.withdrawForm = this.formBuilder.group({
      inputAccount: ['', [Validators.required]],
      inputWithdraw: ['', [Validators.required]],
    });
  }

  getAccountById() {
    const url = String(localStorage.getItem('id_user'));
    this.services.getInfoUser(url).subscribe({
      next: (resp: any) => {
        console.log(resp);

        if (resp.code === 200) {
          this.bankAccount.push(...resp.response.cuentasBancarias);
          this.alert.cerrar();
        } else {
          this.alert.warning('Ocurrió un problema', resp.message);
        }
      },
      error: (error: any) => {
        this.alert.warning('Ocurrió un error', error);
      }
    });
  }

  withdrawMoney() {
    if (this.withdrawForm.invalid) {
      return Object.values(this.withdrawForm.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    } else {
      this.alert.loading();

      const payload = {
        numeroCuenta: Number(this.withdrawForm.value.inputAccount),
        monto: Number(this.withdrawForm.value.inputWithdraw),
      };

      this.services.withdrawTransaction(payload).subscribe({
        next: (resp: any) => {
          if (resp.code === 200) {
            this.withdrawForm.reset();
            localStorage.setItem('numberAccount', String(payload.numeroCuenta));
            this.alert.success('Retiro exitoso', resp.message);
          } else {
            this.alert.warning('Ocurrió un problema', 'Por favor revisar la información del retiro');
          }
        },
        error: () => {
          this.alert.error('Error desconocido', 'Por favor inténtelo más tarde');
        }
      });
    }
  }
}
