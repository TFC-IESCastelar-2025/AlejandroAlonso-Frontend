import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    standalone: false,
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit{

    isLoggedIn = false;
    username = '';

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.authService.authStatus.subscribe((loggedIn) => {
          this.isLoggedIn = loggedIn;
          if (loggedIn) {
            const user = this.authService.getUser();
            this.username = user.username;
          } else {
            this.username = '';
          }
        });
      }
      

    logout(): void {
        this.authService.logout();
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
    }
}
