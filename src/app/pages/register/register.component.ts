import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup;

  showModal = false;
  modalConfig = {
    title: '',
    message: '',
    buttonText: 'Aceptar'
  };

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup): null | { mismatch: boolean } {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onRegister(): void {
      if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched(); 
      return;
    }
    const data = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      role: ['user']
    };

    this.http.post<any>('http://localhost:4242/auth/register', data).subscribe({
      next: (response) => {
        this.modalConfig = {
          title: 'Registro exitoso',
          message: response.message,
          buttonText: 'Ir a login'
        };
        this.showModal = true;
        console.log('Modal abierto');
      },
      error: (err) => {
        const msg = err.error?.message || 'Error en el registro.';
        this.modalConfig = {
          title: 'Error',
          message: msg,
          buttonText: 'Cerrar'
        };
        this.showModal = true;
        console.log('Modal abierto');
      }
    });
  }

  onModalClose(): void {
    this.showModal = false;
  
    if (this.modalConfig.title === 'Registro exitoso') {
      this.router.navigate(['/login']);
    }
  }
  
}
