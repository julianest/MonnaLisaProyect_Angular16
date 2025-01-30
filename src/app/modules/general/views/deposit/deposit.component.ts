import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRequest } from 'src/app/models/request/user-request.model';
import { BankAccount } from 'src/app/models/response/bankAccount-response.model';
import { GeneralService} from 'src/app/modules/general/views/general.service';
import { Alertas } from 'utils/alerts';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css'],
})
export class DepositComponent {

  bankAccount: BankAccount[] = [];
  accountSelected!: number;
  amount!: number;
  successMessage: string = '';
  errorMessage: string = '';

  depositForm!: FormGroup;

  constructor(
    private services: GeneralService,
    private formBuilder: FormBuilder,
    private alert: Alertas
  ) {
    this.depositInitializeForm();
  }

  ngOnInit(): void {
    this.getAccountById();
  }

  depositInitializeForm() {
    this.depositForm = this.formBuilder.group({
      inputAccount: ['', [Validators.required]],
      inputDeposit: ['', [Validators.required]],
    });
  }

  getAccountById() {
    // const userRequest: UserRequest = { numeroIdetificacion: String(localStorage.getItem('id_user')) };
    // this.services.getBankAccountsById(userRequest).subscribe({
    //   next: (data: any) => {
    //     data.response.cuentasBancarias.forEach((element: any) =>{
    //       this.bankAccount.push(element)
    //     })
    //     console.log(this.bankAccount);
    //   },
    //   error: (error) => {
    //     console.error('Error al obtener las cuentas bancarias', error);
    //   }
    // });

    const url = String(localStorage.getItem('id_user'));
    this.services.getInfoUser(url).subscribe({
      next: (resp: any) => {
        // console.log(resp);
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
      this.errorMessage = 'Formulario inválido. Completa todos los campos.';
      return;
    }

    const payload = {
      numeroCuenta: Number(this.depositForm.value.inputAccount),
      monto: Number(this.depositForm.value.inputDeposit)
    };

    this.services.depositTransaction(payload).subscribe({
      next: (response) => {
        this.successMessage = 'Depósito exitoso';
        this.errorMessage = '';
        this.depositForm.reset();
      },
      error: (error) => {
        this.errorMessage = 'Error en el depósito: ' + (error?.error?.message || 'Inténtalo nuevamente');
        this.successMessage = '';
      }
    });
  }
}
