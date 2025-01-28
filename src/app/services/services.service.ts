import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { envaironment } from "env";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  constructor(private http: HttpClient) { }
  
  servicePost(params: any): Observable<any> {
    if (params.url == "/login" || params.url == "/register") {
      return this.http.post(envaironment.API_BASE_URL + params.url, params.payload);      
    } else {
      return this.http.post(envaironment.API_BASE_URL + params.url, params.payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
    }
  }

  serviceGet(params: any) {
    return this.http.get(envaironment.API_BASE_URL + params.url, params.payload);
  }
}