import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Boss } from '../interfaces/boss.interface';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class BossService {

  constructor(private http: HttpClient) {}

  getDailyBoss(): Observable<Boss> {
    return this.http.get<Boss>(`${baseUrl}/randomtoday`);
  }

  getRandomBoss(): Observable<Boss> {
    return this.http.get<Boss>(`${baseUrl}/random`);
  }

  getAllBosses(): Observable<Boss[]> {
    return this.http.get<Boss[]>(`${baseUrl}/ver`);
  }
}
