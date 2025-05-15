// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: any = {
    username: '',
    password: '',
  };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.form).subscribe({
      next: (data) => {
       this.authService.saveToken(data.token);
        this.authService.saveUser({
          id: data.id,
          username: data.username,
          email: data.email,
          roles: data.roles
        });
        console.log('Usuario logeado:', this.authService.getUser());
  
        this.authService.setLoggedIn(true);
  
        this.router.navigate(['/daily']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Error al iniciar sesión';
      },
    });
  }
  
}
