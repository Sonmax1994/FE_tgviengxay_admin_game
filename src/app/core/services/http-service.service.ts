import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiService } from '../interfaces/api';
import { IHttpClientOptions } from '../interfaces/http-client-options';
const END_POINT_URL = (window as any).END_POINT_URL || 'https://admin-dev.tgviengxay.bet';
@Injectable({
  providedIn: 'root'
})
export class DataService implements IApiService {

  apiURL = END_POINT_URL;

  constructor(
    private httpClient: HttpClient
  ) {}

  get<T>(url: string, params?: any, options?: IHttpClientOptions): Observable<T> {
    return this.httpClient.get<T>(this.apiURL + url, { params });
  }

  post<T>(url: string, body: any, options?: IHttpClientOptions): Observable<T> {
    return this.httpClient.post<T>(this.apiURL + url, body, { ...options });
  }

  put<T>(url: string, body: any, options?: IHttpClientOptions): Observable<T> {
    return this.httpClient.put<T>(this.apiURL + url, body, { ...options });
  }

  patch<T>(url: string, body: any, options?: IHttpClientOptions): Observable<T> {
    return this.httpClient.patch<T>(this.apiURL + url, body, { ...options });
  }

  delete<T>(url: string, options?: IHttpClientOptions): Observable<T> {
    return this.httpClient.delete<T>(this.apiURL + url, { ...options });
  }

}
