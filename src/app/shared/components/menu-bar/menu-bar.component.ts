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
  hoveredLabel: string | null = null;
  showLogoutModal: boolean = false; 

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
    if (height < 710 || width < 670 ) {
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

  confirmLogout(): void {
    this.showLogoutModal = true;
  }

  handleLogoutModalClose(shouldLogout: boolean): void {
    this.showLogoutModal = false;
    if (shouldLogout) {
      this.authService.logout();
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    }
  }

  setHoveredLabel(label: string | null) {
    this.hoveredLabel = label;
  }
}
