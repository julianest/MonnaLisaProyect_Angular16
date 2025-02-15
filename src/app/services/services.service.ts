import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'env';
import { catchError, Observable, of, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  baseUrl: string = "";

  constructor(private readonly http: HttpClient) {}

  post<T, P>(url: string, payload: P): Observable<T> {
    if (url === 'auth/login' || url === 'auth/register') {
      this.baseUrl = environment.API_BASE_URL_AUTH;
    } else {
      if (url.startsWith('transacciones/deposito') || url.startsWith('transacciones/retiro')) {
        this.baseUrl = environment.API_BASE_URL_REACTOR;
      } else {
        this.baseUrl = environment.API_BASE_URL_BACK;
      }

      this.headers = this.headers.set(
        'Authorization',
        String('Bearer '+localStorage.getItem('access_token')),
      );
    }

    return this.http
      .post<T>(`${this.baseUrl}${url}`, payload, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }


  get(params: any) {
    const headers = new HttpHeaders({
      'Content-Type':
        'application/json, application/x-www-form-urlencoded; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('access_token') ?? ''}`,
    });

    const url = environment.API_BASE_URL_AUTH + params;

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
