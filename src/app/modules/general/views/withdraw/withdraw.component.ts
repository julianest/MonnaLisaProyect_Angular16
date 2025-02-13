import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../general.service';
import { Alertas } from 'utils/alerts';
import { BankAccount } from 'src/app/models/response/bankAccount-response.model';
import { StreamNotificationService } from 'src/app/services/stream-notification.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css'],
})
export class WithdrawComponent implements OnInit {
  arrayNotificaciones: any[] = [];
  arrayNotificacionesFinal: any[] = [];
  bankAccount: BankAccount[] = [];
  withdrawForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly services: GeneralService,
    private readonly alert: Alertas,
    private readonly streamNotificaction: StreamNotificationService
  ) {
    this.withdrawInitializeForm();
  }

  ngOnInit(): void {
    this.getAccountById();
  }

  searchWithdraw() {
    setTimeout(() => {
      this.streamNotificaction.setTransactionType('RETIRO');
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
    }, 3000);
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
      localStorage.setItem('numberAccount', String(this.withdrawForm.value.inputAccount));

      const payload = {
        numeroCuenta: Number(this.withdrawForm.value.inputAccount),
        monto: Number(this.withdrawForm.value.inputWithdraw),
      };

      this.services.withdrawTransaction(payload).subscribe({
        next: (resp: any) => {
          if (resp.code == 200) {
            localStorage.setItem('numberAccount', String(this.withdrawForm.value.inputAccount));            
            this.searchWithdraw();
          } else {
            this.alert.warning('Ocurrió un problema', 'Por favor revisar la información del retiro');
          }
        },
        error: () => {
          this.alert.error('Error desconocido', 'Por favor inténtelo más tarde');
        },
        complete: () => {
          this.withdrawForm.reset();
        },
      });
    }
  }
}
