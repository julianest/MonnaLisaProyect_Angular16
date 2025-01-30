import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'env';
import { catchError, Observable, of, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApiService {

  baseUrl: string = "";

  constructor(private http: HttpClient) {}
  
  post<T, P>(url: string, payload: P): Observable<T> {
    
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (url === 'auth/login' || url === 'auth/register') {
      this.baseUrl = environment.API_BASE_URL_BACK;
    } else {
      if (url.startsWith('transacciones/deposito')) {
        this.baseUrl = environment.API_BASE_URL_REACTOR;
      } else {
        this.baseUrl = environment.API_BASE_URL_BACK;
      }
      
      headers = headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem('access_token') || ''}`
      );
    }

    return this.http
      .post<T>(`${this.baseUrl}${url}`, payload, { headers })
      .pipe(catchError(this.handleError));
  }


  get(params: any) {
    const headers = new HttpHeaders({
      'Content-Type':
        'application/json, application/x-www-form-urlencoded; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
    });

    const url = environment.API_BASE_URL_BACK + params;

    return this.http.get(url, {
      headers,
    });
  }

  private handleError(error: any): Observable<never> {
    
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
