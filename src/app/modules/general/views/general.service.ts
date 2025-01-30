import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/services.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private apiService: ApiService) {}
  getInfoUser(url: any) {
    return this.apiService.get("usuario/consultar/"+ url);
  }

}