import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email = '';
  message = '';
  
  constructor( private authService: AuthService ) {}

  ngOnInit(): void {
  }


  sendResetEmail() {
    this.authService.sendResetEmail(this.email).subscribe({
      next: (res) => this.message = 'Revisa tu correo electrónico',
      error: (err) => this.message = 'No se pudo enviar el correo'
    });
  }

}
