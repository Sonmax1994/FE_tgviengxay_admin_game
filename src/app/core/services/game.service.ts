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
    return this.dataService.get("/game/rooms", {}).pipe(
      tap((res) => {}),
    );
  }
  currentSession(roomId: number): Observable<any> {
    return this.dataService.get(`/game/${roomId}/status`, {}).pipe(
      tap((res) => {}),
    );
  }
  createSession(params: sesionObject): Observable<any> {
    return this.dataService.get("/matches/bet/create", params).pipe(
      tap((res) => {}),
    );
  }
  lockSession(params: sesionObject): Observable<any> {
    return this.dataService.get("/matches/bet/locked", params).pipe(
      tap((res) => {}),
    );
  }
  gameResult(params: sesionObject): Observable<any> {
    return this.dataService.get("/matches/bet/result", params).pipe(
      tap((res) => {}),
    );
  }
  finishSession(params: sesionObject): Observable<any> {
    return this.dataService.get("/matches/bet/completed", params).pipe(
      tap((res) => {}),
    );
  }
}

