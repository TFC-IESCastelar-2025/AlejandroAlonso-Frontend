import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
})
export class VerifyEmailComponent implements OnInit {
  message: string = '';
  isSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (token) {
      this.http.get<any>(`http://localhost:4242/auth/verify?token=${token}`).subscribe({
        next: res => {
          this.message = res.message || 'Cuenta verificada correctamente.';
          this.isSuccess = true;
        },
        error: err => {
          this.message = err.error?.message || 'Hubo un error al verificar la cuenta.';
          this.isSuccess = false;
        }
      });
    } else {
      this.message = 'Token de verificación no encontrado.';
      this.isSuccess = false;
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
