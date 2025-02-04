import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/services.service';
import { Observable } from 'rxjs';
import { UserResponse } from '../../../models/response/user-response.model';
import { UserRequest } from '../../../models/request/user-request.model';
import { GetParams } from '../../../models/request/user-params-request.model';
import { DepositComponent } from './deposit/deposit.component';
import { DepositRequest } from 'src/app/models/request/deposit-request.model';
import { registerAccountRequest } from 'src/app/models/request/registerAccount-request.model';
import { registerAccountResponse } from 'src/app/models/response/registerAccount-response.model';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private apiService: ApiService) {}

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

  registerAccount(accountData: registerAccountRequest): Observable<any>{
    return this.apiService.post('cuenta-bancaria/crear-cuenta', accountData);
  }

  getInfoUser(url: any) {
    return this.apiService.get("usuario/consultar/"+ url);
  }
} 


