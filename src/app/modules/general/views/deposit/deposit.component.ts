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
      return Object.values(this.depositForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
    } else {
      this.alert.loading();
      
      const payload = {
        numeroCuenta: Number(this.depositForm.value.inputAccount),
        monto: Number(this.depositForm.value.inputDeposit)
      };
  
      this.services.depositTransaction(payload).subscribe({
        next: (resp: any) => {
          switch(resp.code) {
            case 200:
              this.depositForm.reset();
              this.alert.success("Depósito exitoso", resp.message);
              break;
            default:
              this.alert.warning("Ocurrio un problema", "por favor revisar la información del deposito");
              break;
          }         
        },
        error: (error) => {
          this.alert.error("Error desconocido", "Por favor intentelo más tarde");
        }
      });
    }

  }
}
