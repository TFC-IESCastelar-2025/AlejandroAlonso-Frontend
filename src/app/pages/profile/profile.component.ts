import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UserProfile } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserProfile | null = null;
  editMode = false;
  form: Partial<UserProfile> = {};
  confirmPassword: string = '';
  profileForm: FormGroup;
  showModal = false;
  isLoading = false;
  modalConfig = {
    title: '',
    message: '',
    buttonText: 'Aceptar'
  };


  constructor(private userService: AuthService, private fb: FormBuilder, private router: Router) {
    this.profileForm = this.fb.group({
      username: [''],
      email: ['', [Validators.email]],
      password: [''],
      confirmPassword: [''],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.user = res;
        this.form = { email: res.email, username: res.username, password: res.password};
      }
    });
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    if (password || confirm) {
      return password === confirm ? null : { mismatch: true };
    }
    return null;
  }

  saveChanges() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      this.modalConfig = {
        title: 'Error',
        message: 'Hay campos inválidos. Por favor revisa el formulario.',
        buttonText: 'Cerrar'
      };
      this.showModal = true;
      return;
    }

    const updateData: Partial<UserProfile & { password?: string }> = {};
    const formUsername = this.profileForm.value.username?.trim();
    const formEmail = this.profileForm.value.email?.trim();
    
    if (formUsername && formUsername !== this.user?.username) {
      updateData.username = formUsername;
    }

    if (formEmail && formEmail !== this.user?.email) {
      updateData.email = formEmail;
    }

    if (this.profileForm.value.password) {
      updateData.password = this.profileForm.value.password;
    }

    if (Object.keys(updateData).length === 0) {
      this.modalConfig = {
        title: 'Sin cambios',
        message: 'No se detectaron cambios para guardar.',
        buttonText: 'Cerrar'
      };
      this.showModal = true;
      return;
    }

    this.isLoading = true; 

    this.userService.putProfile(updateData).subscribe({
      next: (updated) => {
        this.modalConfig = {
          title: 'Perfil actualizado',
          message: 'Tu perfil se ha actualizado correctamente. Por seguridad, debes volver a iniciar sesión.',
          buttonText: 'Aceptar'
        };
        this.showModal = true;
        this.profileForm.patchValue({ password: '', confirmPassword: '' });
        this.isLoading = false; 
      },
      error: (err) => {
        const msg = err.error?.message || 'Error al actualizar el perfil.';
        this.modalConfig = {
          title: 'Error',
          message: msg,
          buttonText: 'Cerrar'
        };
        this.showModal = true;
        this.isLoading = false; 
      }
    });
  }


  onModalClose(): void {
    this.showModal = false;

    if (this.modalConfig.title === 'Perfil actualizado') {
      this.userService.logout(); // Asegúrate de que este método exista
      this.router.navigate(['/login']);
    }
  }


  get f() {
    return this.profileForm.controls;
  }
}

