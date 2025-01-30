import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { envaironment } from 'env';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  post<T, P>(url: string, payload: P): Observable<T> {
    if (url == 'auth/login' || url == 'auth/register') {
      return this.http.post<T>(`${envaironment.API_BASE_URL_BACK}${url}`, payload)
      .pipe(catchError(this.handleError));
    } else {
      const urlC = String(envaironment.API_BASE_URL_BACK + url);

      console.log(urlC);
      console.log(payload);

      return this.http.post<T>(urlC, payload, {
        headers: {
          'Content-Type':
            'application/json, application/x-www-form-urlencoded; charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
        },
      });
    }
  }

  get(params: any) {
    const headers = new HttpHeaders({
      'Content-Type':
        'application/json, application/x-www-form-urlencoded; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
    });

    const url = envaironment.API_BASE_URL_BACK + params;
  
    return this.http.get(url, {
      headers,
    });
  }

  private handleError(error: any): Observable<never> {
    // console.error('HTTP Error:', error);
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
