import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ApiService } from 'src/app/services/services.service';
import { registerAccountRequest } from'src/app/models/request/registerAccount-request.model';
import { registerAccountResponse } from 'src/app/models/response/registerAccount-response.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private apiService: ApiService) {}

  registerAccount(accountData: registerAccountRequest): Observable<registerAccountResponse>{
    return this.apiService.post<registerAccountResponse,registerAccountRequest >('/cuenta-bancaria/crear-cuenta', accountData);
  }

}
