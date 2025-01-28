import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthRequest } from "src/app/models/request/auth-request.model";
import { RegisterRequest } from "src/app/models/request/register-request.model";
import { AuthResponse, ServiceResponse } from "src/app/models/response/auth-response.model";
import { ApiService } from "src/app/services/services.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  login(credentials: AuthRequest): Observable<ServiceResponse> {
    return this.apiService.post<ServiceResponse, AuthRequest>('/login', credentials);
  }

  register(userData: RegisterRequest): Observable<AuthResponse>{
    return this.apiService.post<AuthResponse, RegisterRequest>('/register', userData);
  }
}