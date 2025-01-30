import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/services.service';
import { Observable } from 'rxjs';
import { UserResponse } from '../../../models/response/user-response.model';
import { UserRequest } from '../../../models/request/user-request.model';
import { GetParams } from '../../../models/request/user-params-request.model';
import { DepositComponent } from './deposit/deposit.component';
import { DepositRequest } from 'src/app/models/request/deposit-request.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

   getBankAccountsById(userRequest: UserRequest): Observable<UserResponse> {
    const params: GetParams = {
      url: `/usuario/consultar/${userRequest.numeroIdetificacion}`,
    };
    return this.apiService.get<UserResponse>(params);
  }

  depositTransaction(payload: DepositRequest): Observable<any> {
    return this.apiService.post<any, DepositRequest>('/transacciones/deposito', payload);
  }
}


