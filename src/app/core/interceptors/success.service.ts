import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';


@Injectable()
export class SuccessInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      filter((evt: HttpEvent<any>) => evt instanceof HttpResponse),
      map((evt: HttpResponse<any>) => {
        // if (request.url.startsWith(environment.baseURL)) {
        //   const { data } = evt.body;
        //   const evtClone = evt.clone({ body: data });
        //   return evtClone;
        // }
        console.log(evt);

        return evt;
      }),
    );
  }
}
