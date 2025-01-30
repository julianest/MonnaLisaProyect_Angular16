import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'env';
import { catchError, Observable, of, throwError } from 'rxjs';
import { UserResponse } from '../models/response/user-response.model';
import { GetParams } from '../models/request/user-params-request.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /*post<T, P>(url: string, payload: P): Observable<T> {
    if(url == "/auth/login" || url == "/auth/register") {
      return this.http.post<T>(`${environment.API_BASE_URL_BACK}${url}`, payload)
        .pipe(catchError(this.handleError)
      );
    } else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token') || ''}`,
      });
  
      return this.http.post<T>(`${environment.API_BASE_URL_BACK}${url}`, payload, { headers })
        .pipe(catchError(this.handleError)
      );
    }
  }*/

  /*post<T, P>(url: string, payload: P): Observable<T> {
      let baseUrl = environment.API_BASE_URL_BACK;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
      if (url === "/auth/login" || url === "/auth/register") {
        baseUrl = environment.API_BASE_URL_BACK;
      } else { 
        if (url.startsWith("/transacciones/deposito")) {
        baseUrl = environment.API_BASE_URL_REACTOR;
      }
        
      headers = headers.set('Authorization', `Bearer ${localStorage.getItem('access_token') || ''}`);
      
    
      return this.http.post<T>(`${baseUrl}${url}`, payload, { headers }).pipe(
        catchError(this.handleError)
      );
    }*/

  post<T, P>(url: string, payload: P): Observable<T> {
    let baseUrl = environment.API_BASE_URL_BACK;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (url === '/auth/login' || url === '/auth/register') {
      baseUrl = environment.API_BASE_URL_BACK;
    } else {
      
      if (url.startsWith('/transacciones/deposito')) {
        baseUrl = environment.API_BASE_URL_REACTOR;
      }
      
      headers = headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem('access_token') || ''}`
      );
    }

    return this.http
      .post<T>(`${baseUrl}${url}`, payload, { headers })
      .pipe(catchError(this.handleError));
  }

  get<T>(params: GetParams): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
    });

    return this.http
      .get<T>(`${environment.API_BASE_URL_BACK}${params.url}`, {
        headers,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('HTTP Error:', error);
    return throwError(
      () => new Error(error.message || 'Ocurrió un error en la API.')
    );
  }

  verificarLogin(): Observable<boolean> {
    if (!localStorage.getItem('access_token')) {
      return of(false);
    } else {
      return of(true);
    }
  }
}
