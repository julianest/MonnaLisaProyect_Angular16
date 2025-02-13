import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../general.service';
import { Alertas } from 'utils/alerts';
import { BankAccount } from 'src/app/models/response/bankAccount-response.model';
import { TransactionResponse } from 'src/app/models/response/transaction-response.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bankAccount: BankAccount[] = [];
  transactionResponse: TransactionResponse[] = [];
  saldoActual: string = "";
  cuenta: any;

  homeFilterForm!: FormGroup;

  constructor(
    private readonly services: GeneralService,
    private readonly formBuilder: FormBuilder,
    private readonly alert: Alertas
  ) {
    this.filterInitializeForm();
  }

  filterInitializeForm() {
    this.homeFilterForm = this.formBuilder.group({
      inputAccount: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAccountById();
  }

  getAccountById() {
    const url = String(localStorage.getItem('id_user'));
    this.services.getInfoUser(url).subscribe({
      next: (resp: any) => {
        if (resp.code === 200) {
          this.bankAccount.push(...resp.response.cuentasBancarias);

          if (this.bankAccount.length == 1)  {
            this.homeFilterForm.controls['inputAccount'].setValue(this.bankAccount[0].numeroCuenta)

            this.homeFilter();
          }
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

  homeFilter() {
    if (this.homeFilterForm.invalid) {
      return Object.values(this.homeFilterForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
    } else {
      this.alert.loading();

      const url =  Number(this.homeFilterForm.value.inputAccount);

      this.services.filtrerTransaction(url).subscribe({
        next: (resp: any) => {
          if (resp.code === 200) {
            this.transactionResponse.push(...resp.response);
            this.findbalance(url);
            this.alert.cerrar();
          } else {
            this.alert.warning("Ocurrió un problema", "Por favor revisar la información del depósito");
          }
        },
        error: () => {
          this.alert.error("Error desconocido", "Por favor inténtelo más tarde");
        }
      });
    }
  }

  findbalance(url: number) {
    this.services.findBalance(url).subscribe({
      next: (resp: any) => {
        this.saldoActual = String(resp.response.saldo);
      },
      error: (error) => {
        this.alert.warning("Ocurrio un error", error);
      }
    });
  }
}
