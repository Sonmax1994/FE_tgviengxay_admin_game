import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
  ) {
    // empty
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError((err) => {
        if (err.status === 401) {
          this.authService.logout();
          location.reload();
        }
        if (err.status === 404) {
          this.toastrService.error("Không tìm thấy nội dung yêu cầu");
        }
        else if (err && err.error) {
          console.log("err", err);
          
          const errorMessage = err.error.message || 'Lỗi không xác định';
          this.toastrService.error(errorMessage);
        }
        return throwError(err.error);
      }));
  }
}
