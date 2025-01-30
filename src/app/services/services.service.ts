import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { envaironment } from "env";
import { catchError, Observable, of, throwError } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }

  post<T, P>(url: string, payload: P): Observable<T> {



    if(url == "/login" || url == "/register") {
      return this.http.post<T>(`${envaironment.API_BASE_URL}${url}`, payload)
        .pipe(catchError(this.handleError)
      );
    } else if(url == "/cuenta-bancaria/crear-cuenta") {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token') || ''}`,
      });
      console.log(envaironment.API_BASE_URL2+url)
      console.log(headers.get('Content-Type'))
      console.log(headers.get('Authorization'))
      console.log(payload)
      return this.http.post<T>(`${envaironment.API_BASE_URL2}${url}`, payload, { headers })
      .pipe(catchError(this.handleError)
    );
    } else {
      return this.http.post<T>(`${envaironment.API_BASE_URL}${url}`, payload)
        .pipe(catchError(this.handleError)
      );
    }
  }

  get(params: any) {
    return this.http.get(envaironment.API_BASE_URL + params.url, params.payload);
  }


  private handleError(error: any): Observable<never> {
    console.error('HTTP Error:', error);
    return throwError(() => new Error(error.message || 'Ocurrió un error en la API.'));
  }

  verificarLogin(): Observable<boolean> {
    if (!localStorage.getItem("access_token")) {
      return of(false);
    } else {
      return of(true);
    }
  }
}
