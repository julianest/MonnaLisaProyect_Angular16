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
    return this.http.post(envaironment.API_BASE_URL + params.url, params.payload);
  }

  serviceGet(params: any) {
    return this.http.get(envaironment.API_BASE_URL + params.url, params.payload);
  }
}