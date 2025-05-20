import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserRanking, UserRankingStreak } from '../interfaces/user.interface';

const userUrl = environment.userUrl

const profileUrl = environment.profileUrl

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getRankingUsersBosses(): Observable<UserRanking[]> {
    return this.http.get<UserRanking[]>(`${userUrl}/ranking`);
  }

  getRankingUsersStreak(): Observable<UserRankingStreak[]> {
    return this.http.get<UserRankingStreak[]>(`${userUrl}/ranking-streak`);
  }

  getUserStreak(): Observable<number> {
    return this.http.get<number>(`${profileUrl}/streak`);
  }

  addUserStreak(): Observable<number> {
    return this.http.get<number>(`${profileUrl}/add-streak`);
  }

}
