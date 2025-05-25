// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: any = {
    username: '',
    password: '',
  };
  errorMessage = '';
  emptyFieldsError = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.emptyFieldsError = false;

    if (!this.form.username || !this.form.password) {
      this.emptyFieldsError = true;
      return;
    }

    this.authService.login(this.form).subscribe({
      next: (data) => {
        this.authService.saveToken(data.token);
        this.authService.saveUser({
          id: data.id,
          username: data.username,
          email: data.email,
          roles: data.roles
        });

        this.authService.setLoggedIn(true);
        this.router.navigate(['/daily']);
      },
      error: (err) => {
        this.errorMessage = 'Credenciales incorrectas';
      },
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
  
  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

}
