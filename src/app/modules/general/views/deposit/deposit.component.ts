import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRequest } from 'src/app/models/request/user-request.model';
import { BankAccount } from 'src/app/models/response/bankAccount-response.model';
import { UserResponse } from 'src/app/models/response/user-response.model';
import { UserService } from 'src/app/modules/general/views/general.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css'],
})
export class DepositComponent {

  bankAccount: BankAccount[] = [];
  accountSelected!: number;
  amount!: number;

  depositForm!: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
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
    const userRequest: UserRequest = { numeroIdetificacion: String(localStorage.getItem('id_user')) };
    this.userService.getBankAccountsById(userRequest).subscribe({
      next: (data: any) => {
        data.response.cuentasBancarias.forEach((element: any) =>{
          this.bankAccount.push(element)
        })
        console.log(this.bankAccount);
      },
      error: (error) => {
        console.error('Error al obtener las cuentas bancarias', error);
      },
    });
  }

  depositMoney() {
    if (this.depositForm.invalid) {
      console.error('Formulario inválido');
      return;
    }

    const payload = {
      numeroCuenta: Number(this.depositForm.value.inputAccount),
      monto: Number(this.depositForm.value.inputDeposit)
    };

    this.userService.depositTransaction(payload).subscribe({
      next: (response) => {
        console.log('Depósito exitoso:', response);
        this.depositForm.reset();
      },
      error: (error) => {
        console.error('Error en el depósito:', error);
      }
    });
  }
}
