import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  isLoggedIn: boolean = false; 
  isMenuVisible = true;
  isToggleButtonVisible = false;

  constructor(private authService: AuthService, private router: Router) {
    this.checkWindowHeight();
  }

  ngOnInit(): void {
    this.authService.authStatus.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  get backgroundImage(): string {
    return this.isLoggedIn ? 'assets/5slots-menu.png' : 'assets/3slots-menu.png';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkWindowHeight();
  }

  checkWindowHeight() {
    const height = document.documentElement.clientHeight;
    const width = document.documentElement.clientWidth;
    console.log('Altura viewport:', height);
    console.log('Anchura viewport:', width);
    if (height < 710 || width < 600 ) {
      this.isMenuVisible = false;
      this.isToggleButtonVisible = true;
    } else {
      this.isMenuVisible = true;
      this.isToggleButtonVisible = false;
    }
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

   logout(): void {
        this.authService.logout();
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
    }
}
