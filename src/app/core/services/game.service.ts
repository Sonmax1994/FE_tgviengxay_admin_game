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
    return this.dataService.get("/api/v1/game/rooms", {}).pipe(
      tap((res) => {}),
    );
  }
  listMatch(roomId: number): Observable<any> {
    return this.dataService.get(`/api/v1/game/${roomId}/matches/list`, {}).pipe(
      tap((res) => {}),
    );
  }
  createSession(params: sesionObject): Observable<any> {
    return this.dataService.get("/api/v1/matches/bet/create", params).pipe(
      tap((res) => {}),
    );
  }
  lockSession(params: sesionObject): Observable<any> {
    return this.dataService.get("/api/v1/matches/bet/locked", params).pipe(
      tap((res) => {}),
    );
  }
  gameResult(params: sesionObject): Observable<any> {
    return this.dataService.get("/api/v1/matches/bet/result", params).pipe(
      tap((res) => {}),
    );
  }
  finishSession(params: sesionObject): Observable<any> {
    return this.dataService.get("/api/v1/matches/bet/completed", params).pipe(
      tap((res) => {}),
    );
  }
}

