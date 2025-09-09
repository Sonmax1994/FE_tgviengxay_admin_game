import { Injectable } from '@angular/core';
import { DataService } from './http-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })

export class AuthService {

  private _tokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  private _currentUserSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private dataService: DataService,
    private router: Router,
    private _toastr: ToastrService
  ) {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      this._tokenSubject.next(token);
    }
  }

  get token(): string {
    return this._tokenSubject.value;
  }

  set token(token: string) {
    this._tokenSubject.next(token);
  }

  login(params: any): Observable<any> {
    return this.dataService.post("/api/v1/admin/game/login", params).pipe(
      tap((res: any) => {
        if(res?.data?.accessToken) {
          this._setLoginLocalStogare(res.data.accessToken);
        } else {
          this._toastr.error('Lỗi đăng nhập. Vui lòng thử lại');
        }
      }),
    );
  }

  logout(): void {
    localStorage.removeItem("token");
    this._tokenSubject.next(null);
    this._currentUserSubject.next(null);
    this.router.navigate(["login"]);
  }

  _setLoginLocalStogare(accessToken: string): void {
    localStorage.setItem("token", JSON.stringify(accessToken));
    this._tokenSubject.next(accessToken);
  }
  changePassword(params: any): Observable<any> {
    return this.dataService.post("/api/v1/admin/game/change/password", params).pipe(
      tap((res) => {}),
    );
  }
}

