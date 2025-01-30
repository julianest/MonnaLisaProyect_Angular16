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
    private formBuilder: FormBuilder,
    private services: GeneralService,
    private alert: Alertas
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
        switch (resp.code) {
          case 200:
            resp.response.cuentasBancarias.forEach((element: any) => {
              this.bankAccount.push(element);
            });
            this.alert.cerrar();
            break;
          default:
            this.alert.warning('Ocurrio un problema', resp.message);
            break;
        }
      },
      error: (error: any) => {
        this.alert.warning('Ocurrio un error', error);
      },
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
          switch (resp.code) {
            case 200:
              this.withdrawForm.reset();
              this.alert.success('Retiro exitoso', resp.message);
              break;
            default:
              this.alert.warning(
                'Ocurrio un problema',
                'por favor revisar la información del retiro'
              );
              break;
          }
        },
        error: (error) => {
          this.alert.error(
            'Error desconocido',
            'Por favor intentelo más tarde'
          );
        },
      });
    }
  }
}
