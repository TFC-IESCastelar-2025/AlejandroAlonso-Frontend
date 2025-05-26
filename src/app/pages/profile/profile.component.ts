import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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

  constructor(private userService: AuthService, private fb: FormBuilder) {
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
      return;
    }
    const updateData: Partial<UserProfile & {password?: string}> = {
      username: this.profileForm.value.username,
      email: this.profileForm.value.email,
    };
    if (this.profileForm.value.password) {
      updateData.password = this.profileForm.value.password;
    }

    this.userService.putProfile(updateData).subscribe({
      next: (updated) => {
        this.user = updated;
        this.editMode = false;
        this.profileForm.patchValue({ password: '', confirmPassword: '' });
      }
    });
  }

  get f() {
    return this.profileForm.controls;
  }
}

