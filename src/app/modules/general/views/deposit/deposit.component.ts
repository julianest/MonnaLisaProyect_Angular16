import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { UserRequest } from 'src/app/models/request/user-request.model';
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
    private services: GeneralService,
    private formBuilder: FormBuilder,
    private alert: Alertas,
    private streamNotificaction: StreamNotificationService
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
        switch(resp.code) {
          case 200:
            resp.response.cuentasBancarias.forEach((element: any) =>{
              this.bankAccount.push(element)
            })
            this.alert.cerrar();
            break;
          default:
            this.alert.warning("Ocurrio un problema", resp.message);
            break;
        }
      },
      error: (error: any) => {
        this.alert.warning("Ocurrio un error", error);
      }
    });
  }

  depositMoney() {
    if (this.depositForm.invalid) {
      return Object.values(this.depositForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
    } else {
      // this.alert.loading();

      const payload = {
        numeroCuenta: Number(this.depositForm.value.inputAccount),
        monto: Number(this.depositForm.value.inputDeposit)
      };

      this.services.depositTransaction(payload).pipe(finalize(() => {
        this.streamNotificationTransaction();
      })).subscribe({
        next: (resp: any) => {
          switch(resp.code) {
            case 200:
              localStorage.setItem('numberAccount', String(payload.numeroCuenta));
              this.alert.success("Depósito exitoso", resp.message);
              break;
            default:
              this.alert.warning("Ocurrio un problema", "por favor revisar la información del deposito");
              break;
          }
        },
        error: (error) => {
          this.alert.error("Error desconocido", "Por favor intentelo más tarde");
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
        // this.currentBalance = transaction.finalBalance;
        transaction.forEach((element: any) => {
          this.arrayNotificaciones.push(element);
        });

        this.arrayNotificacionesFinal = this.arrayNotificaciones.slice(0, 2);

        // localStorage.removeItem('numberAccount');
      },
      error: (error) => console.error('Error en el stream:', error)
    });
  }
}
