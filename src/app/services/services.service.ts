import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { envaironment } from "env";

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private http: HttpClient) { }
  
  servicePost(params: any) {
    return this.http.post(envaironment.API_BASE_URL + params.url, params.payload, {
      headers: {
        'Content-Type': 'application/json, application/raw; charset=UTF-8',
        'Authorization': 'Bearer'+ localStorage.getItem('token')
      }
    });
  }

  serviceGet(params: any) {
    return this.http.get(envaironment.API_BASE_URL + params.url, params.payload);
  }
}
