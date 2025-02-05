import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { BankAccount } from 'src/app/models/response/bankAccount-response.model';
import { GeneralService} from 'src/app/modules/general/views/general.service';
import { StreamNotificationService } from 'src/app/services/stream-notification.service';
import { Alertas } from 'utils/alerts';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css'],
})
export class DepositComponent {

  balanceToast: number = 0;
  dateToast: string = "";
  statusToast: string = "";
  typeToast: string = "";

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
    this.limpiarLocalStorage();
    this.getAccountById();
  }

  limpiarLocalStorage() {
    localStorage.removeItem('numberAccount');
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
          this.alert.warning("Ocurrió un problema", resp.message);
        }
      },
      error: (error: any) => {
        this.alert.warning("Ocurrió un error", error);
      }
    });
  }

  depositMoney() {
    if (this.depositForm.invalid) {
      return Object.values(this.depositForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
    } else {
      const payload = {
        numeroCuenta: Number(this.depositForm.value.inputAccount),
        monto: Number(this.depositForm.value.inputDeposit)
      };

      this.services.depositTransaction(payload).pipe(
        finalize(() => {
          this.streamNotificationTransaction();
        })
      ).subscribe({
        next: (resp: any) => {
          if (resp.code === 200) {
            localStorage.setItem('numberAccount', String(payload.numeroCuenta));
            this.alert.success("Depósito exitoso", resp.message);
          } else {
            this.alert.warning("Ocurrió un problema", "Por favor revisar la información del depósito");
          }
        },
        error: () => {
          this.alert.error("Error desconocido", "Por favor inténtelo más tarde");
        },
        complete: () => {
          this.depositForm.reset();
        }
      });
    }
  }

  streamNotificationTransaction() {
    this.streamNotificaction.getStreamTransactionNotifications().subscribe({
      next: (transaction: any) => {
        console.log('stream ' +transaction)
        if (!transaction) return;
        console.log(transaction);
        this.arrayNotificaciones = [];
        this.arrayNotificacionesFinal = [];
        transaction.forEach((element: any) => {
          this.arrayNotificaciones.push(element);
        });

        this.arrayNotificacionesFinal = this.arrayNotificaciones.slice(0, 2);
      },
      error: (error) => console.error('Error en el stream:', error)
    });
  }
}
