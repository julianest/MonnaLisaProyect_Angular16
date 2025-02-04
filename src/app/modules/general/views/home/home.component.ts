import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../general.service';
import { Alertas } from 'utils/alerts';
import { BankAccount } from 'src/app/models/response/bankAccount-response.model';
import { transactionResponse } from 'src/app/models/response/transaction-response.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bankAccount: BankAccount[] = [];
  transactionResponse: transactionResponse[] = [];
  saldoActual: string = "";

  homeFilterForm!: FormGroup;

  constructor(
    private services: GeneralService,
    private formBuilder: FormBuilder,
    private alert: Alertas
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
          // console.log(resp);          
          switch(resp.code) {
            case 200:
              resp.response.forEach((elemnt: any) => {
                this.transactionResponse.push(elemnt);
              });

              this.findbalance(url);
              this.alert.cerrar();
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

  findbalance(url: number) {
    this.services.findBalance(url).subscribe({
      next: (resp: any) => {
        // console.log(resp);
        // this.transactionResponse.push(resp.response);
        this.saldoActual = String(resp.response.saldo);
      },
      error: (error) => {
        this.alert.warning("Ocurrio un error", error);
      }
    });
  }
}
