import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface IHttpClientOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: any; // 'body' | 'events' | 'response'
  responseType?: any; //| 'arraybuffer'|'blob'|'json'|'text'
  params?: HttpParams | {
    [param: string]: string | string[];
  };
}
