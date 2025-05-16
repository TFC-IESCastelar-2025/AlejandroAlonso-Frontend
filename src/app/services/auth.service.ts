// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import jwt_decode from 'jwt-decode';
import { Boss } from '../interfaces/boss.interface';

const AUTH_API = 'http://localhost:4242/auth/';
const PROFILE_URL = 'http://localhost:4242/profile'

export interface UserProfile {
  id: number,
  username: string,
  email: string,
  password: string,
  bosses: Boss[]
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private sessionExpiredMessage = new BehaviorSubject<string>('');
  sessionExpired$ = this.sessionExpiredMessage.asObservable();

  notifySessionExpired() {
    this.sessionExpiredMessage.next('Sesión expirada. Por favor, inicia sesión nuevamente.');
  }

  private loggedIn = new BehaviorSubject<boolean>(this.getToken() != null);
  authStatus = this.loggedIn.asObservable();

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(AUTH_API + 'login', credentials);
  }

  setLoggedIn(state: boolean): void {
    this.loggedIn.next(state);
  }  

  saveToken(token: string): void {
    localStorage.setItem('auth-token', token);
    this.loggedIn.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem('auth-token');
  }

  saveUser(user: any): void {
    localStorage.setItem('auth-user', JSON.stringify(user));
  }

  getUser(): any {
    const user = localStorage.getItem('auth-user');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.clear();
    this.loggedIn.next(false);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const decoded: any = jwt_decode(token);
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp < now;
    } catch (e) {
      return true; // token inválido
    }
  }

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(PROFILE_URL)
  }

  putProfile(data: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(PROFILE_URL, data)
  }
}
