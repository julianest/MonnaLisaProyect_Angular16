import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { envaironment } from 'env';
import { AuthRequest } from 'src/app/models/request/auth-request.model';
import { AuthResponse } from 'src/app/models/response/auth-response.model';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_BASE_URL = envaironment.API_BASE_URL;

  constructor(private http: HttpClient) {}

  authLogin(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_BASE_URL}/login`, credentials);
  }
}
