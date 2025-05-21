import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
// import { JsonService } from './json.service';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Souldle';
  showSessionModal = false;
  showMenuBar = true;
  showModal = false;
  modalConfig = {
    title: 'Sesión expirada',
    message: 'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.',
    buttonText: 'Ir al login'
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  this.checkToken();

  this.router.events.subscribe((event) => {
    if (event instanceof NavigationStart) {
      this.checkToken();
    }
    if (event instanceof NavigationEnd) {
      this.showMenuBar = event.url !== '/';
    }
  });

  this.authService.sessionExpired$.subscribe(() => {
    this.showSessionModal = true;
  });
}

  private checkToken(): void {
    const token = this.authService.getToken();
    if (token && this.authService.isTokenExpired()) {
      this.authService.logout();
      this.authService.notifySessionExpired();
      this.router.navigate(['/login']);
    }
  }

  onSessionModalClose(): void {
    this.showModal = false;
    this.router.navigate(['/login']);
  }
}
