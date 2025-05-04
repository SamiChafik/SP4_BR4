import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private builder = inject(FormBuilder);
  private service = inject(AuthService);
  private router = inject(Router);

  result: any;

  loginform = this.builder.group({
    password: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });

  proceedlogin() {
    if (this.loginform.valid) {
      const { email, password } = this.loginform.value;
      this.service.LoginUser(email!, password!).subscribe({
        next: (user) => {
          sessionStorage.setItem('userId', user.id);
          sessionStorage.setItem('username', user.username);
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.loginform.setErrors({ invalidCredentials: true });
        }
      });
    } else {
      this.loginform.markAllAsTouched();
    }
  }

  GoToRegister() {
    this.router.navigate(['register']);
  }
  
}