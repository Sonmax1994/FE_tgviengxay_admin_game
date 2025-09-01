import { Injectable } from '@angular/core';
import { DataService } from './http-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class AuthService {

  private _tokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  private _currentUserSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private dataService: DataService) {
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
    return this.dataService.post("/w/login", params).pipe(
      tap((res) => {
        this._setLoginLocalStogare(res);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem("token");
    this._tokenSubject.next(null);
    this._currentUserSubject.next(null);
  }

  _setLoginLocalStogare(apiRes: any): void {
    localStorage.setItem("token", JSON.stringify(apiRes?.token));
    this._tokenSubject.next(apiRes?.token);
  }
}

