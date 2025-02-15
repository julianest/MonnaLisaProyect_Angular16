import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/services.service';
import { Observable } from 'rxjs';
import { DepositRequest } from 'src/app/models/request/deposit-request.model';
import { RegisterAccountRequest } from 'src/app/models/request/registerAccount-request.model';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private readonly apiService: ApiService) {}

  depositTransaction(payload: DepositRequest): Observable<any> {
    return this.apiService.post<any, DepositRequest>('transacciones/deposito', payload);
  }

  filtrerTransaction(url: any): Observable<any> {
    return this.apiService.get('movimiento/movimientos/' + url);
  }

  findBalance(url: any) {
    return this.apiService.get('cuenta-bancaria/mostrar-saldo-actual/' + url);
  }

  withdrawTransaction(payload: DepositRequest): Observable<any> {
    return this.apiService.post<any, DepositRequest>('transacciones/retiro', payload);
  }

  registerAccount(accountData: RegisterAccountRequest): Observable<any>{
    return this.apiService.post('cuenta-bancaria/crear-cuenta', accountData);
  }

  getInfoUser(url: any) {
    return this.apiService.get("usuario/consultar/"+ url);
  }

  getAccouts(identificationNumber: string) {
    return this.apiService.get('cuenta-bancaria/consultar-cuentas/'+ identificationNumber);
  }
}


