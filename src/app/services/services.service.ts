import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { envaironment } from 'env';

@Injectable({
  providedIn: 'root',
})
export class Services {
  constructor(private http: HttpClient) {}

  servicePost(params: any) {
    return this.http.post(
      envaironment.API_BASE_URL + params.url,
      params.payload
    );
  }
}
