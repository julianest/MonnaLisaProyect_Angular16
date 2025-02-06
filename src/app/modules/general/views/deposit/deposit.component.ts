import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankAccount } from 'src/app/models/response/bankAccount-response.model';
import { GeneralService } from 'src/app/modules/general/views/general.service';
import { StreamNotificationService } from 'src/app/services/stream-notification.service';
import { Alertas } from 'utils/alerts';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css'],
})
export class DepositComponent {
  balanceToast: number = 0;
  dateToast: string = '';
  statusToast: string = '';
  typeToast: string = '';
  

  arrayNotificaciones: any[] = [];
  arrayNotificacionesFinal: any[] = [];
  bankAccount: BankAccount[] = [];
  depositForm!: FormGroup;

  constructor(
    private readonly services: GeneralService,
    private readonly formBuilder: FormBuilder,
    private readonly alert: Alertas,
    private readonly streamNotificaction: StreamNotificationService
  ) {
    this.depositInitializeForm();
  }

  ngOnInit(): void {
    this.getAccountById();
    this.streamNotificaction.setTransactionType('DEPOSITO');
    this.streamNotificaction.getStreamTransactionNotifications().subscribe({
      next: (transactions: any) => {
        if (transactions) {
          this.arrayNotificaciones = transactions;
        }
      },
      error: (error) => {
        console.error('Error al recibir transacciones', error);
      }
    });
  }

  depositInitializeForm() {
    this.depositForm = this.formBuilder.group({
      inputAccount: ['', [Validators.required]],
      inputDeposit: ['', [Validators.required]],
    });
  }

  getAccountById() {
    const url = String(localStorage.getItem('id_user'));
    this.services.getInfoUser(url).subscribe({
      next: (resp: any) => {
        if (resp.code === 200) {
          this.bankAccount.push(...resp.response.cuentasBancarias);
          this.alert.cerrar();
        } else {
          this.alert.warning('Ocurrió un problema', resp.message);
        }
      },
      error: (error: any) => {
        this.alert.warning('Ocurrió un error', error);
      },
    });
  }

  depositMoney() {
    if (this.depositForm.invalid) {
      return Object.values(this.depositForm.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    } else {
      const payload = {
        numeroCuenta: Number(this.depositForm.value.inputAccount),
        monto: Number(this.depositForm.value.inputDeposit),
      };

      this.services.depositTransaction(payload).subscribe({
        next: (resp: any) => {
          if (resp.code == 200) {
            localStorage.setItem('numberAccount', String(payload.numeroCuenta));
          } else {
            this.alert.warning(
              'Ocurrió un problema',
              'Por favor revisar la información del depósito'
            );
          }
        },
        error: () => {
          this.alert.error(
            'Error desconocido',
            'Por favor inténtelo más tarde'
          );
        },
        complete: () => {
          this.depositForm.reset();
        },
      });
    }
  }
}
