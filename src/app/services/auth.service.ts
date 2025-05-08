// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

const AUTH_API = 'http://localhost:4242/auth/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

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
}
