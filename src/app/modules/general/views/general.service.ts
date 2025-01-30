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

   /*getBankAccountsById(userRequest: UserRequest): Observable<UserResponse> {
    const params: GetParams = {
      url: `/usuario/consultar/${userRequest.numeroIdetificacion}`,
    };
    return this.apiService.get<any>(params);
  }*/

  depositTransaction(payload: DepositRequest): Observable<any> {
    return this.apiService.post<any, DepositRequest>('transacciones/deposito', payload);
  }

  registerAccount(accountData: registerAccountRequest): Observable<registerAccountResponse>{
    return this.apiService.post<registerAccountResponse,registerAccountRequest >('cuenta-bancaria/crear-cuenta', accountData);
  }

  getInfoUser(url: any) {
    return this.apiService.get("usuario/consultar/"+ url);
  }
}


