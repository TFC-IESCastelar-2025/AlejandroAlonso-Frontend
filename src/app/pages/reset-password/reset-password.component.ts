import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  newPassword = '';
  token: string = '';
  message = '';

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  resetPassword() {
    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: () => this.message = 'Contraseña actualizada',
      error: () => this.message = 'Error al actualizar'
    });
  }

}
