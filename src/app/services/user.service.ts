import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserRanking } from '../interfaces/user.interface';

const userUrl = environment.userUrl

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getRankingUsersBosses(): Observable<UserRanking[]> {
    return this.http.get<UserRanking[]>(`${userUrl}/ranking`);
  }

}
