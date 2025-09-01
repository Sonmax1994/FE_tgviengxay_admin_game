
import { Observable } from 'rxjs';
import { IHttpClientOptions } from './http-client-options';

export interface IApiService {
  get<T>(url: string, params?: any, options?: IHttpClientOptions): Observable<T>;
  post<T>(url: string, body: any, options?: IHttpClientOptions): Observable<T>;
  put<T>(url: string, body: any, options?: IHttpClientOptions): Observable<T>;
  patch<T>(url: string, body: any, options?: IHttpClientOptions): Observable<T>;
  delete<T>(url: string, options?: IHttpClientOptions): Observable<T>;
}
