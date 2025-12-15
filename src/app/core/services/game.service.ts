import { Injectable } from '@angular/core';
import { DataService } from './http-service.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
interface sesionObject {
  roomId: any,
  matchId: any,
  winner?: any
}
@Injectable({ providedIn: 'root' })

export class GameService {
  constructor(private dataService: DataService) {}

  listGame(): Observable<any> {
    return this.dataService.get("/api/v1/admin/game/rooms", {}).pipe(
      tap((res) => {}),
    );
  }
  listMatch(roomId: number): Observable<any> {
    return this.dataService.get(`/api/v1/game/${roomId}/matches/list`, {}).pipe(
      tap((res) => {}),
    );
  }
  createSession(params: any): Observable<any> {
    return this.dataService.post("/api/v1/chicken/matches/bet/create", params).pipe(
      tap((res) => {}),
    );
  }
  updateSession(params: any): Observable<any> {
    return this.dataService.post("/api/v1/chicken/matches/bet/edit", params).pipe(
      tap((res) => {}),
    );
  }
  lockSession(params: sesionObject): Observable<any> {
    return this.dataService.post("/api/v1/chicken/matches/bet/locked", params).pipe(
      tap((res) => {}),
    );
  }
  gameResult(params: sesionObject): Observable<any> {
    return this.dataService.post("/api/v1/chicken/matches/bet/result", params).pipe(
      tap((res) => {}),
    );
  }
  finishSession(params: sesionObject): Observable<any> {
    return this.dataService.post("/api/v1/chicken/matches/bet/completed", params).pipe(
      tap((res) => {}),
    );
  }
  reopenSession(params: sesionObject): Observable<any> {
    return this.dataService.post("/api/v1/chicken/matches/bet/reopen", params).pipe(
      tap((res) => {}),
    );
  }
  currentXD(): Observable<any> {
    return this.dataService.get("/api/v1/admin/xocdia/match/status", {}).pipe(
      tap((res) => {}),
    );
  }
  createMatchXD(params: any): Observable<any> {
    return this.dataService.post("/api/v1/admin/xocdia/match/create", params).pipe(
      tap((res) => {}),
    );
  }
  updateXD(params: any): Observable<any> {
    return this.dataService.post("/api/v1/admin/xocdia/match/edit", params).pipe(
      tap((res) => {}),
    );
  }
  finishXD(): Observable<any> {
    return this.dataService.post("/api/v1/admin/xocdia/match/completed", {}).pipe(
      tap((res) => {}),
    );
  }
  finishSessionXD(): Observable<any> {
    return this.dataService.post("/api/v1/admin/xocdia/match/session/completed", {}).pipe(
      tap((res) => {}),
    );
  }
  createSessionXD(): Observable<any> {
    return this.dataService.post("/api/v1/admin/xocdia/match/session/start", {}).pipe(
      tap((res) => {}),
    );
  }
  lockSessionXD(): Observable<any> {
    return this.dataService.post("/api/v1/admin/xocdia/match/session/locked", {}).pipe(
      tap((res) => {}),
    );
  }
  gameResultXD(params: any): Observable<any> {
     return this.dataService.post("/api/v1/admin/xocdia/match/session/setup/result", params).pipe(
      tap((res) => {}),
    );
  }
}
